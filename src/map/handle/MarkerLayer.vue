<script>
  import BMap from 'BMap'
  import RequestHandle from '@/request'
  import Coordtransform from 'coordtransform'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'MarkerLayer',
    render(){
    },
    data () {
      return {
        markers: [],
        lsLabels: [],
        hasVisible: true,
        checkedName: 'AQI',
        mouseLabel: new BMap.Label(''),
        data: [],
        historyData:[],
        hasHistory:false,
        infoWindowConfig: {
          width: 250,     // 信息窗口宽度
          height: 240,     // 信息窗口高度
          title: '信息', // 信息窗口标题
          enableMessage: false//设置允许信息窗发送短息
        }
      };
    },
    props: ['charUrl'],
    created(){
    },
    mounted(){
      this.ready();
    },
    methods: {
      //页面初始化
      ready(){
        bus.$on('setMarkerVisible', this.markerLayerToggle);
        bus.$on('markerTarget', this.pollutionTarget);
        bus.$once('loadMarker', this.loadMarkerLayer);
        bus.$on('loadChart', this.refreshLoadChart);
        bus.$on('refreshMarker', this.refreshLayer);
        bus.$on('historySenseMarker', this.historyMarker);
      },

      //加载marker数据
      loadMarkerLayer(map, data){
//        console.log(this.hasVisible);
//        this.map = map;
//        if (!this.data.length) {
//          this.data = data;
//          bus.$emit('loadMarkerData', this.data,this.checkedName);
//        }
//        let t = this;
//        let lsMarkers = this.getPollutionByType(this.checkedName);
//        for (let i = 0, length = lsMarkers.length; i < length; i++) {
//          let value = lsMarkers[i];
//          let pt = new BMap.Point(value.lng, value.lat);
//          let v = value.count;
//          let marker = t.getMarker(pt, v);
//          marker && ((t.hasVisible ? marker.show() : marker.hide()), t.map.addOverlay(marker), t.markers.push(marker), marker.addEventListener('click', function (e) {
//            let tg = e.target;
//            let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
//            t.markerClick(value.stationid, point);
//          }));
        this.markers && this.clearMarker();
        this.map = map;
        this.map && this.map.addOverlay(this.mouseLabel);
        this.mouseLabel.setStyle({
          color: 'black',
          background: 'rgba(255,255,255,0.8)',
          fontSize: '12px',
          border: '1px solid #999',
          width: 'auto',
          textAlign: 'center',
          height: '18px',
          lineHeight: '18px'
        });
        if (!this.data.length) {
          this.data = data;
          bus.$emit('loadMarkerData', this.data, this.checkedName);
        }
        let t = this;
        let lsMarkers = this.getPollutionByType(this.checkedName, data);
        for (let i = 0, length = lsMarkers.length; i < length; i++) {
          let value = lsMarkers[i];
          let pt = new BMap.Point(value.lng || value.longitude, value.lat || value.latitude);
          let v = value.count;
          let marker = t.getMarker(pt, v);

          let label = new BMap.Label(value.count);
          label.setStyle({
            border: 'none',
            color: '#333',
            background: 'none',
            fontSize: '14px',
            fontFamily: 'Microsoft YaHei',
            textShadow: '0 0 2px #fff'
          });
          let offsetLength = ('' + value.count).length >= 4 ? (('' + value.count).length === 5 ? -2 : 2) : (('' + value.count).length > 1 ? 8 : 12);
          label.setOffset(new BMap.Size(offsetLength, -2));

          t.setLabels(pt, value, 'stationname');

          marker && ((t.hasVisible ? marker.show() : marker.hide()), marker.setLabel(label), marker.attributes = value, t.map.addOverlay(marker), t.markers.push(marker), marker.addEventListener('click', function (e) {
            let tg = e.target;
            let attributes = tg.attributes;
            let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
            t.markerClick(attributes, point);
          }), marker.addEventListener('mouseover', function (e) {
//            let tg = e.target;
//            let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
//            let stationName = tg.attributes.stationname;
//            t.mouseLabel.setContent(stationName);
//            stationName && t.mouseLabel.setOffset(new BMap.Size(-stationName.length * 6, -5));
//            t.mouseLabel.setPosition(point);
//            t.mouseLabel.show()
          }), marker.addEventListener('mouseout', function (e) {
            t.mouseLabel.hide();
          }));
        }
      },

      //指标切换响应事件
      pollutionTarget(type){
        this.checkedName = type;
        let dt = this.hasHistory ? this.historyData : this.data;//this.getPollutionByType(type,this.hasHistory ? this.historyData : this.data);
        if (dt.length) {
          this.refreshMarker(dt,!this.hasHistory);
        }
      },

      //刷新数据
      refreshMarker(data, hasHistory = true){
        if (this.markers.length) {
          hasHistory && (this.data = data);
          this.clearMarker();
          this.loadMarkerLayer(this.map, data);
        }
      },

      //历史数据
      historyMarker(time = undefined, hasReset){
        let t = this;
        if (time) {
          t.hasHistory = true;
          let urlHistoryLCS = RequestHandle.getRequestUrl('SENSEPOLLUTIONHISTORY');
          let url = urlHistoryLCS + '?RecordTime=' + time;
          RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
            if (result.status === 1) {
              let data = result.obj;
              t.historyData = data;
              t.refreshMarker(data, false);
            }
          }, function (ex) {
            console.log(ex);
          })
        }
        else {
          t.hasHistory = false;
          (hasReset && t.data.length) && (t.refreshMarker(t.data));
        }
      },

      //刷新Chart数据
      refreshLoadChart(lng, lat, code){
        let point = new BMap.Point(lng, lat);
        let transPoint = this.wgsPointToBd(point);
        this.markerClick(code, transPoint);
      },

      getPollutionLeave(value){
        let index = 0;
        switch (this.checkedName) {
          case 'AQI':
            index = getAQILevelIndex(value);
            break;
          case 'PM25':
            index = getPM25LevelIndex(value);
            break;
          case 'PM10':
            index = getPM10LevelIndex(value);
            break;
          case 'SO2':
            index = getSO2LevelIndex(value);
            break;
          case 'NO2':
            index = getNO2LevelIndex(value);
            break;
          case 'O3':
            index = getO3LevelIndex(value);
            break;
          case 'CO':
            index = getCOLevelIndex(value);
            break;
        }
        return index;
      },

      //根据类型获取指标数据
      getPollutionByType(type, data){
        let rtValue = [];
        if (this.data) {
          for (let i = 0, length = data.length; i < length; i++) {
            let item = data[i];
            let obj = {'dataType': (item.hasOwnProperty('dataType') ? item['dataType'] : undefined), 'stationid': item.stationid, 'stationname': item.stationname, 'lng': item.longitude, 'lat': item.latitude, 'count': item[type.toLowerCase()]};
            rtValue.push(obj);
          }
        }
        return rtValue;
      },

      //图标点击事件
      markerClick(attributes, point){
        let t = this;
        let code = attributes.stationid;
        let charUrl = attributes.hasOwnProperty('dataType') ? ((attributes['dataType'] && attributes['dataType'].toUpperCase() === 'XH1') ? RequestHandle.getRequestUrl('XHPOLLUTIONCHAR') : RequestHandle.getRequestUrl('SENSECHART')) : RequestHandle.getRequestUrl('SENSECHART');
        let url = charUrl + '?stationid=' + code + '&pollute=' + this.checkedName;


        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
          //if (result.status === 0) {
          let data = result.obj;
          let res = t.setInfoWindow(data);

          let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
            title: '<sapn style="font-size:16px"><b>' + data.stationname + '</b>' + '</span>',             //标题
            width: 320,
            height: 200,
            enableAutoPan: true,
            searchTypes: []
          });
          searchInfoWindow.open(point);
          setTimeout(function () {
            let title = '最近24小时' + t.checkedName + '变化趋势';
            t.loadChar(code, t.checkedName, t.getHourData(data.hourdatas), title);
          }, 100);
          //}
        }, function (ex) {
          console.error(ex);
        });
      },

      setLabels(pt, value, displayField){
        if (pt && value) {
          let stationName = value[displayField];
          let label = new BMap.Label(stationName);
          let transPoint = this.wgsPointToBd(pt);
          label.setStyle({
            color: 'black',
            background: 'rgba(255,255,255,0.8)',
            fontSize: '12px',
            border: '1px solid #999',
            width: 'auto',
            textAlign: 'center',
            height: '18px',
            lineHeight: '18px'
          });
          stationName && label.setOffset(new BMap.Size(-stationName.length * 6, -5));
          label.setPosition(transPoint);
          this.map.addOverlay(label);
          this.lsLabels.push(label);
        }
      },

      //获取图标对象
      getMarker(pt, value){
        let marker = undefined;
        if (pt && value) {
          let transPoint = this.wgsPointToBd(pt);
          let imgUrl = this.getImgUrl(value);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(36, 25));
          marker = new BMap.Marker(transPoint, {icon: icon, offset: new BMap.Size(0, -16)});
        }
        return marker;
      },
      wgsPointToBd: function (pt) {
        let transPoint = this.transformFun([pt.lng, pt.lat]);
        let bdPoint = new BMap.Point(transPoint[0], transPoint[1]);

        return bdPoint;
      },
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      },

      //获取图标地址，根据指标参考值
      getImgUrl(value){
        let imgPath = undefined;
        let level = this.getPollutionLeave(value);
        level > 0 && (level -= 1);
        if (level === 0) {
          imgPath = '/static/imgs/sense/sg1.png';
        }
        else if (level === 2) {
          imgPath = '/static/imgs/sense/so1.png';
        }
        else if (level === 1) {
          imgPath = '/static/imgs/sense/sy1.png';
        }
        else if (level === 5) {
          imgPath = '/static/imgs/sense/sm1.png';
        }
        else if (level === 4) {
          imgPath = '/static/imgs/sense/sv1.png';
        }
        else if (level === 3) {
          imgPath = '/static/imgs/sense/sr1.png';
        }
        return imgPath;
      },

      //获取图标地址，根据指标参考值
      getIconUrl(value){
        let imgPath = undefined;
        if (value > 0 && value <= 10) {
          imgPath = '/static/imgs/sense/gv1.png';
        }
        else if (value > 10 && value <= 20) {
          imgPath = '/static/imgs/sense/ov1.png';
        }
        else if (value > 20 && value <= 40) {
          imgPath = '/static/imgs/sense/yv1.png';
        }
        else if (value > 40 && value <= 60) {
          imgPath = '/static/imgs/sense/mv1.png';
        }
        else if (value > 60 && value <= 80) {
          imgPath = '/static/imgs/sense/vv1.png';
        }
        else if (value > 80) {
          imgPath = '/static/imgs/sense/rv1.png';
        }
        return imgPath;
      },

      //设置弹出框信息
      setInfoWindow(data){
        return '<table width=\'100%\'><tr><td style=\'font-size:12px\' valign=\'top\'>'
          + '<table width=\'100%\' class=\'fitem\'>'
          + '<tr><th>AQI</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getAQILevelIndex(data.aqi)) + ';color:#fff\'>' + (data.aqi || '--')
          + '</td></tr><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + (parseInt(data.pm25) || '--')
          + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + (parseInt(data.pm10) || '--')
          + '</td><th>CO</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + ';color:#fff\'>' + (data.co || '--') /*parseFloat(data.co).toFixed(1)*/
          + '</td></tr><tr><th>NO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + ';color:#fff\'>' + (parseInt(data.no2) || '--')
          + '</td><th>SO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + ';color:#fff\'>' + (parseInt(data.so2) || '--')
          + '</td><th>O3</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + ';color:#fff\'>' + (parseInt(data.o3) || '--')
          + '</td></tr></table>'
          + '</td>'
          + '<td valign=\'top\' align=\'right\'><td>'
          + '</tr></table><div id=\'citychart_' + data.stationid + '\' style=\'width:100%;height:110px\'>';
      },

      //设置Chart展示数据
      getHourData(data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let obj = {
            x: converTimeFormat(item.recordtime.replace('T', ' ')).getTime(),
            y: parseInt(item.value),
            color: getColorByIndex(this.getPollutionLeave(parseInt(item.value)))
          };
          rtValue.push(obj);
        }
        return rtValue;
      },

      //加载Chart数据
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

      //清除当前Marker图层
      clearMarker(){
        for (let i = 0, length = this.markers.length; i < length; i++) {
          this.map.removeOverlay(this.markers[i]);
        }
        for (let i = 0, length = this.lsLabels.length; i < length; i++) {
          this.map.removeOverlay(this.lsLabels[i]);
        }
        this.markers = [];
        this.lsLabels = [];
      },

      //设置图层显隐性
      markerLayerToggle(hasVisible){
        this.hasVisible = hasVisible;
        if (this.markers.length) {
          for (let i = 0, length = this.markers.length; i < length; i++) {
            let value = this.markers[i];
            hasVisible ? value.show() : value.hide();
          }
        }
      }
      ,
    }
  }
  ;
</script>
<style scoped>
  .fitem {
    border: 1px solid #ddd;
    margin-right: 10px;
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
    text-align: left;
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
