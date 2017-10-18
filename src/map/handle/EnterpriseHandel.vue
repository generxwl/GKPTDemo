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
            label.setOffset(new BMap.Size(-(displayValue.length * 14 / 2), 18));
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
            level = level ? (data[field] ? 1 : 2) : 0;
            break;
          case 'SMOKE':
            field = 'SmokeStatus';
            level = level ? (data[field] ? 1 : 2) : 0;
            break;
          case 'SO2':
            field = 'So2Status';
            level = level ? (data[field] ? 1 : 2) : 0;
            break;
          case 'COUNT':
            level  = data['isOnline'] ? 1 : 0;
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
        let infoWidth = 390;
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
        let url = charUrl + '?pscode=' + attributes.pscode;
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
        let headerElements = '<tr><td rowspan="2">名称</td><td colspan="2">氮氧化物</td><td colspan="2">二氧化硫</td><td colspan="2">烟尘</td><td rowspan="2">总排放量</td></tr><tr><td>实测</td><td>折算</td><td>实测</td><td>折算</td><td>实测</td><td>折算</td></tr>';
        let els = '';
        for (let i = 0, length = dts.length; i < length; i++) {
          let item = dts[i];
          els += '<tr><td>' + (i === (dts.length - 1) ? '总计' : item.outputname) + '</td><td>' +
            (item.nox || '--') + '</td><td>' +
            (item.nox_convert || '--') + '</td><td>' +
            (item.so2 || '--') + '</td><td>' +
            (item.so2_convert || '--') + '</td><td>' +
            (item.smoke || '--') + '</td><td>' +
            (item.smoke_convert || '--') + '</td><td>' +
            (item.gasoutputflow || '--') + '</td></tr>';
        }
        els += '<tr><td>时间</td><td colspan="7">' + ((data.length ? data[0].time : '--') || '--') + '</td></tr>';

        return '<table style="min-width:390px;" class="fitem" cellpadding="0" cellspacing="0">' + headerElements + els + '</table><div id=\'citychart_' + (data.length && data[0].pscode) + '\' style=\'width:100%;height:110px;\'>';
      },
      setQYChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let value = item['smoke'] || 0;
          let obj = {
            x: converTimeFormat(item.time && item.time.replace('T', ' ')).getTime(),
            y: parseInt(value),
            color: value['SmokeStatus'] ? '#ff0000' : '#00ff00'//getColorByIndex(getPM25LevelIndex(parseInt(value)))
          };
          rtValue.push(obj);
        }
        let title = '最近24小时烟尘变化趋势';
        this.loadChar(code, '烟尘', rtValue, title);
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
</style>
