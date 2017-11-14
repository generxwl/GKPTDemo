<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import Coordtransform from 'coordtransform'
  import RequestHandle from '@/request'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'EnterpriseHandle',
    render () {
    },
    data () {
      return {
        checkedField: 'NOX',
        searchInfoWindow: undefined,
        lsMarkers: []
      }
    },
    props: ['pollutionUrl', 'charUrl'],
    created () {
    },
    mounted () {
      this.ready()
    },
    methods: {
      ready () {
        bus.$on('switchEnterpriseRender', this.switchRender);
        bus.$once('setEnterpriseMap', this.resetData);
        bus.$on('refreshEnterpriseLayer', this.refreshLayer);
        bus.$on('showEnterpriseInfoWindow', this.showEnterpriseInfoWindow);
      },
      resetData (map) {
        if (!this.hasLoaded) {
          this.hasLoaded = true;
          this.map = map;
          this.setPollutionByType(this.item);
        }
      },
      setPollutionByType (type) {
        if (!this.map.getBounds()) {
          return false;
        }
        let t = this;
        let qs = require('qs');
        let mapLevel = this.map.getZoom();
        let bs = this.map.getBounds();
//        //let url = this.pollutionUrl;
        let url = RequestHandle.getRequestUrl('ENTERPRISE');
        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
          if (result.status === 0) {
            t.data = result.obj;
            t.render(result.obj);
//            bus.$emit('refreshDustRanking', result.obj, type);
          }
        }, function (ex) {
          console.error(ex);
        });
      },
      getPointByType(type){
        let rtValue = [];
        let dt = this.data;
        if (dt) {
          for (let i = 0, length = dt.length; i < length; i++) {
            let item = dt[i];
            if (item.type === type) {
              rtValue.push(dt[i]);
            }
          }
        }
        return rtValue;
      },
      switchRender (type) {
        if (this.data) {
          this.checkedField = type;
          this.render(this.data);
        }
      },
      refreshLayer(data){
        if (data) {
          this.data = data;
          this.render(this.data, this.checkedField);
        }
      },
      showEnterpriseInfoWindow(lng, lat, code){
        let point = new BMap.Point(lng, lat);
        this.showCityPointChart(code, point);
      },
      render (data, type) {
        if (data) {
          let t = this;
          t.lsMarkers && t.clearMarker();
          let displayName = 'psname';
          for (let i = 0, length = data.length; i < length; i++) {
            let value = data[i];
            let pt = new BMap.Point(value.lng || value.Longitude || value.longitude, value.lat || value.Latitude || value.latitude);
            let marker = t.getMarker(pt, value);
            let displayValue = value[displayName];
            let label = new BMap.Label(displayValue || '');
            label.setStyle({
              border: 'none',
              color: '#333',
              background: '#fff',
              fontSize: '14px',
              fontFamily: 'Microsoft YaHei'
            });
            label.setOffset(new BMap.Size(-(displayValue.length * 14 / 2), 24));
            marker.setLabel(label);
            marker && (t.map.addOverlay(marker), marker.attributes = value, t.lsMarkers.push(marker), marker.addEventListener('click', function (e) {
              let tg = e.target;
              let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
              t.markerClick(tg.attributes, point);
            }));
          }
        }
      },
      getMarker(pt, data){
        let level = this.getMarkerState(data);
        let imgUrl = this.getMarkerIcon(level);
        let conPoint = this.wgsPointToBd(pt);
        let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
        return new BMap.Marker(conPoint, {
          icon: icon,
          offset: new BMap.Size(0, 0)
        });
      },
      getMarkerState(data){
        let field = 'NoxStatus';
        let level = data['isOnline'] ? 1 : 0;
        switch (this.checkedField.toUpperCase()) {
          case 'NOX':
            field = 'NoxStatus';
            level = level ? (data[field] ? 2 : 1) : 0;
            break;
          case 'SMOKE':
            field = 'SmokeStatus';
            level = level ? (data[field] ? 2 : 1) : 0;
            break;
          case 'SO2':
            field = 'So2Status';
            level = level ? (data[field] ? 2 : 1) : 0;
            break;
          case 'GASOUTPUTFLOW':
            level = data['isOnline'] ? 1 : 0;
            break;
        }
        return level;
      },
      getMarkerIcon(level){
        let iconUrl = undefined;
        switch (parseInt(level)) {
          case 0:
            iconUrl = 'static/imgs/enterprise/e_ng.png';
            break;
          case 1:
            iconUrl = 'static/imgs/enterprise/e_g.png';
            break;
          case 2:
            iconUrl = 'static/imgs/enterprise/e_r.png';
            break;
        }
        return iconUrl;
      },
      markerClick(attributes, point){
        let t = this;
        let displayName = 'psname';
        let infoWidth = 588;
        let res = t.getInfoWindowContent(attributes);
        this.searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res || '无数据', {
          title: '<sapn style="font-size:16px" ><b title="' + (attributes[displayName] || '') + '">' + (attributes[displayName] || '') + '</b>' + '</span>',             //标题
          width: infoWidth,
          height: "auto",
          enableAutoPan: true,
          enableSendToPhone: false,
          searchTypes: []
        });
        this.searchInfoWindow.open(point);
        let charUrl = RequestHandle.getRequestUrl('ENTERPRISECHAR');
        let url = charUrl + '?pscode=' + attributes.pscode + '&type=' + (this.checkedField.toLowerCase() || 'nox');
        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
          let data = result.obj;
          if (data) {
            let content = t.getInfoWindowContent(data);
            t.searchInfoWindow.setContent(content);
            t.setQYChart(attributes.pscode, result.history);
          }
        }, function (ex) {
          console.error(ex);
        });
      },
      getInfoWindowContent(data){
        let dts = data || [];
        let gridAttr = dts[dts.length - 1] || {};
        let gridName = (gridAttr.firstGridName || '') + '-' + (gridAttr.secodGridName || '') + '-' + (gridAttr.threeGridName || '');
        let tel = gridAttr.Contact || gridAttr.contact || '';
        let memberName = gridAttr.memberName || '';
        let headerElements = '<tr class="qyTable"><td rowspan="2" style="width:138px;height:44px">名称</td><td colspan="2" style="width:86px">氮氧化物</td><td colspan="2" style="width:86px">二氧化硫</td><td colspan="2" style="width:86px">烟尘</td><td colspan="2" style="width:86px">含氧量</td><td rowspan="2" style="width:78px">总排放量</td></tr><tr class="qyTable"><td>实测</td><td>折算</td><td>实测</td><td>折算</td><td>实测</td><td>折算</td><td>实测</td><td>折算</td></tr>';
        let els = '';
        for (let i = 0, length = dts.length; i < length; i++) {
          let item = dts[i];
          els += '<tr style="height:22px" class="qyNumber"><td class="qyTable">' + item.outputname + '</td><td style="color:' + (item.noxStatus ? '#ff0000' : '') + '">' +
            (item.nox || '--') + '</td><td>' +
            (item.nox_convert || '--') + '</td><td style="color:' + (item.so2Status ? '#ff0000' : '') + '">' +
            (item.so2 || '--') + '</td><td>' +
            (item.so2_convert || '--') + '</td><td style="color:' + (item.smokeStatus ? '#ff0000' : '') + '">' +
            (item.smoke || '--') + '</td><td>' +
            (item.smoke_convert || '--') + '</td><td>--</td><td>--</td><td>' +
            (item.gasoutputflow || '--') + '</td></tr>';
          if (i === (dts.length - 1)) {
            els += '<tr class="qyNumber" style="height:22px"><td class="qyTable">排放限值(mg/m3)</td><td colspan="2">' + (item.NoxLimit || ' --') + '</td><td colspan="2">' + (item.So2Limit || ' --') + '</td><td colspan="2">' + (item.SmokeLimit || ' --') + '</td><td colspan="2"></td><td>--</td></tr>'
          }
        }

        return '<div class="qyLine"><div class="line"></div><div class="qyPollution" style="margin:0"><img class="qyImg" src="../static/imgs/main/qy-g.png" alt=""><div class="type">企业污染源监测</div><div class="date">' + ((data.length ? data[0].time : '--') || '--') + '</div></div><table style="min-width:390px;margin-bottom:10px" class="fitem" cellpadding="0" cellspacing="0">' + headerElements + els + '</table><div id=\'citychart_' + (data.length && data[0].pscode) + '\' style=\'width:100%;height:110px;\'></div>' +
          '<div class="Introduce"><div class="Net">所属网络：' + gridName + '</div><div class="Person">网络员代表：' + memberName + '</div><div>联系方式：' + tel + '</div></div>';


        /*let headerElements = '<tr class="qyTable"><td rowspan="2" style="width:138px;height:44px">名称</td><td colspan="2" style="width:86px">氮氧化物</td><td colspan="2" style="width:86px">二氧化硫</td><td colspan="2" style="width:86px">烟尘</td><td colspan="2" style="width:86px">含氧量</td><td rowspan="2" style="width:78px">总排放量</td></tr><tr class="qyTable"><td>实测</td><td>折算</td><td>实测</td><td>折算</td><td>实测</td><td>折算</td><td>实测</td><td>折算</td></tr>';
         let els = '';
         for (let i = 0, length = dts.length; i < length; i++) {
         let item = dts[i];
         els += '<tr style="height:22px" class="qyNumber"><td class="qyTable">' + item.outputname + '</td><td style="color:' + (item.noxStatus ? '#ff0000' : '') + '">' +
         (item.nox || '--') + '</td><td>' +
         (item.nox_convert || '--') + '</td><td style="color:' + (item.so2Status ? '#ff0000' : '') + '">' +
         (item.so2 || '--') + '</td><td>' +
         (item.so2_convert || '--') + '</td><td style="color:' + (item.smokeStatus ? '#ff0000' : '') + '">' +
         (item.smoke || '--') + '</td><td>' +
         (item.smoke_convert || '--') + '</td><td>--</td><td>--</td><td>' +
         (item.gasoutputflow || '--') + '</td></tr>';
         if (i === (dts.length - 1)) {
         els += '<tr class="qyNumber" style="height:22px"><td  class="qyTable">排放限值(mg/m3)</td><td colspan="2">' + (item.NoxLimit || ' --') + '</td><td colspan="2">' + (item.So2Limit || ' --') + '</td><td colspan="2">' + (item.SmokeLimit || ' --') + '</td><td colspan="2"></td><td>--</td></tr>'
         }
         }
         /!* els += '<tr><td>时间</td><td colspan="7">' + ((data.length ? data[0].time : '--') || '--') + '</td></tr>';*!/

         return '<div class="qyLine"><div class="line"></div></div><div class="qyPollution"><img class="qyImg" src="../static/imgs/main/qy-g.png" alt=""><div class="type">企业污染源监测</div><div class="date">'+data[0].time+'</div></div><table style="min-width:390px;margin-bottom:10px;" class="fitem" cellpadding="0" cellspacing="0">' + headerElements + els + '</table><div id=\'citychart_' + (data.length && data[0].pscode) + '\' style=\'width:100%;height:110px;\'></div>' +
         '<div class="Introduce"><div class="Net">所属网络：开发区-耀华道办事处</div><div class="Person">梨花村一区网络员：张三</div><div>联系方式：13693297681</div></div>';*/
      },
      setQYChart(code, data){
        let rtValue = [];
        let pollutionName = '氮氧化物';
        let valueField = 'value';
        let stateField = 'status';
        switch (this.checkedField.toUpperCase()) {
          case 'NOX':
            pollutionName = '氮氧化物';
            break;
          case 'SO2':
            pollutionName = '二氧化硫';
            break;
          case 'SMOKE':
            pollutionName = '烟尘';
            break;
          case 'GASOUTPUTFLOW':
            pollutionName = '总排放量';
            break;
        }
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let value = item[valueField] || 0;
          let obj = {
            x: converTimeFormat(item.time && item.time.replace('T', ' ')).getTime(),
            y: parseInt(value),
            color: value[stateField] ? '#ff0000' : '#00ff00'//getColorByIndex(getPM25LevelIndex(parseInt(value)))
          };
          rtValue.push(obj);
        }

        let title = '最近24小时' + pollutionName + '变化趋势';
        this.loadChar(code, pollutionName, rtValue, title);
      },//加载Chart数据
      loadChar(container, name, data, title){
        let dateTypeFormat = '%Y-%m-%d %H:%M';
        let markerShowFlag = false;
        let chart = new Highcharts.Chart('citychart_' + container, {
          chart: {
            type: 'column',
            zoomType: 'x',
            spacingLeft: 0,
            spacingRight: 0
          },
          title: {
            text: title,
            style: {
              fontSize: '12px'
            }
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%Y-%m',
              year: '%Y'
            }
          },
          yAxis: {
            title: {
              text: ''
            },
            min: 0
          },
          tooltip: {
            enabled: true,
            formatter: function () {
              let tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) + '<br/>' +
                this.series.name + ': <b>' + this.y + '</b>';//+ unit;
              return tip;
            }
          },
          plotOptions: {
            series: {
              marker: {
                enabled: markerShowFlag,
                radius: 5
              },
              enableMouseTracking: true,
              turboThreshold: 0
            }
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: [{
            name: name,
            data: data
          }]
        });
        Highcharts.setOptions({global: {useUTC: false}});
      },
      getMarkerLabel(){
      },
      clearMarker(){
        for (let i = 0, length = this.lsMarkers.length; i < length; i++) {
          this.map.removeOverlay(this.lsMarkers[i]);
        }
        this.lsMarkers = [];
      }, wgsPointToBd: function (pt) {
        let transPoint = this.transformFun([pt.lng, pt.lat]);
        let bdPoint = new BMap.Point(transPoint[0], transPoint[1]);

        return bdPoint;
      },
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      }
    },
    components: {}
  }
</script>
<style scope>
  .fitem {
    border: 1px solid #ddd;
    margin: 2px auto;
    line-height: 18px;
  }

  .fitem th {
    width: 65px;
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    border: 1px solid #ddd;
  }

  .fitem td {
    font-size: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }

  .BMapLib_SearchInfoWindow .BMapLib_bubble_title {
    background-color: #1080cc;
    color: #fff;
  }

  .BMapLib_SearchInfoWindow .BMapLib_bubble_tools div {
    background-color: rgba(0, 0, 0, 0);
  }

  .BMapLib_SearchInfoWindow .BMapLib_sendToPhone {
    background: none;
  }

  .line {
    height: 1px;
    width: 100%;
    background: #DDDDDD;
    margin-bottom: 12px;
  }

  .date {
    font-size: 10px;
    color: #666666;
    line-height: 10px;
  }

  .type {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    display: inline-block;
  }

  .qyPollution div {
    display: inline-block;
  }

  .qyPollution {
    background: #EBEBEB;
    padding: 5px;
    margin: 0 12px;
  }

  .qyPollution .date {
    margin-left: 10px;
  }

  .qyTable {
    background: #EBEBEB;
    color: #666666;
  }

  .qyNumber {
    color: #333333;
  }

  .qyImg {
    margin-right: 10px;
  }

  .qyLine {
    padding: 0 12px;
  }

  .Introduce {
    font-size: 12px;
    color: #999999;
    padding: 0 15px 15px;
  }

  .Net, .Person {
    display: inline-block;
  }

  .Net {
    margin-right: 10px;
  }
</style>
