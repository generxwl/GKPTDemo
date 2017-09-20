<script>
  import BMap from 'BMap'
  import RequestHandle from '@/request/'
  import {bus} from '@/js/bus'
  export default {
    name: 'MainHandle',
    render(){
    },
    data () {
      return {
        lsMarkers: [],
        searchInfoWindow: undefined
      };
    },
    created(){
      bus.$once('setMainMap', this.setMap);
      bus.$on('targetMainLayer', this.targetClick);
    },
    mounted(){
    },
    methods: {
      setMap(map){
        this.map = map;
      },
      targetClick(type, hasVisible){
        //请求接口触发
        hasVisible ? this.requestData(type) : this.removeMarkerByList(this.getMarkerByType(type), type);
      },
      requestData(type){
        let t = this;
        let url = undefined;
        let fieldName = undefined;
        switch (type.toUpperCase()) {
          case 'LAYER_SP':
            url = RequestHandle.getRequestUrl('VIDEOTAEGET');
            break;
          case 'LAYER_CG':
            url = RequestHandle.getRequestUrl('SENSEPOLLUTION');
            fieldName = 'aqi';
            break;
          case 'LAYER_GS':
            url = RequestHandle.getRequestUrl('MONPOLLUTION');
            fieldName = 'aqi';
            break;
          case 'LAYER_GD':
            url = RequestHandle.getRequestUrl('DUSTPOLLUTION');
            fieldName = 'pm25';
            break;
        }
        let params = {url: url, type: 'GET', pms: null};
        RequestHandle.request(params, function (result) {
//          if (result.status) {
          t.loadMarker(result.obj, type, fieldName);
//          }
        }, function (e) {
          console.error(e);
        });
      },
      loadMarker(data, type, fieldName){
        this.lsMarkers.length && this.removeMarkerByList(this.getMarkerByType(type), type);
        let t = this;
        for (let i = 0, length = data.length; i < length; i++) {
          let value = data[i];
          value['ptType'] = type;
          let labelName = '';//value.CamName || '';
          let pt = new BMap.Point(value.lng || value.Longitude || value.longitude, value.lat || value.Latitude || value.latitude);
          let marker = t.getMarker(pt, t.getMarkerState(value, type, fieldName));
          let label = new BMap.Label(labelName || '');
          label.setStyle({
            border: 'none',
            color: '#fff',
            background: 'none',
            fontSize: '14px',
            fontFamily: 'Microsoft YaHei'
          });
          label.setOffset(new BMap.Size(-(labelName.length * 4), 15));
          marker && (t.map.addOverlay(marker), marker.attributes = value, marker.setLabel(label), t.lsMarkers.push({marker: marker, type: type}), marker.addEventListener('click', function (e) {
            let tg = e.target;
            let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
            t.markerClick(tg.attributes, point);
          }));
        }
      },
      getMarkerState(data, ptType, fieldName){
        let value = data[fieldName] || 0;
        let level = getAQILevelIndex(value) || 1;
        let iconName = this.getIconName(ptType, level-1);
        return iconName.toUpperCase();
      },
      getIconName(ptType, level){
        let iconName = undefined;
        switch (ptType.toUpperCase()) {
          case 'LAYER_CG':
            iconName = 'cgq-';
            break;
          case 'LAYER_GS':
            iconName = 'gs-';
            break;
          case 'LAYER_GD':
            iconName = 'gd-';
            break;
          case 'LAYER_QY':
            iconName = 'qy-';
            break;
          case 'LAYER_SP':
            iconName = 'sp-';
            break;
          case 'LAYER_LK':
            iconName = 'lk-';
            break;
          case 'LAYER_ZT':
            iconName = 'ztc-';
            break;
          case 'LAYER_HW':
            iconName = 'hwc-';
            break;
          case 'LAYER_JY':
            iconName = 'jyz-';
            break;
        }
        switch (level) {
          case 0:
            iconName += 'g';
            break;
          case 1:
            iconName += 'o';
            break;
          case 2:
            iconName += 'y';
            break;
          case 3:
            iconName += 'm';
            break;
          case 4:
            iconName += 'v';
            break;
          case 5:
            iconName += 'r';
            break;
        }
        return iconName;
      },
      //图标点击事件
      markerClick(attributes, point){
        let t = this;
        if (attributes.hasOwnProperty('ptType') && attributes.ptType.toUpperCase() === 'LAYER_SP') {
          let res = t.setCameraWindow(attributes);
          this.searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
            title: '<sapn style="font-size:16px"><b>' + attributes['CamName'] + '</b>' + '</span>',             //标题
            width: 520,
            height: 350,
            enableAutoPan: true,
            enableSendToPhone: false,
            searchTypes: []
          });
          this.searchInfoWindow.open(point);
        }
        else {
          let res = undefined;
          let charUrl = undefined;
          let pms = undefined;
          let displayName = undefined;
          let ptType = attributes.ptType;
          switch (ptType.toUpperCase()) {
            case 'LAYER_CG':
              res = t.setCGInfoWindow(attributes);
              charUrl = RequestHandle.getRequestUrl('SENSECHART');
              pms = {stationid: attributes.stationid, pollute: 'AQI'};
              displayName = 'stationname';
              break;
            case 'LAYER_GS':
              res = t.setGSInfoWindow(attributes);
              charUrl = RequestHandle.getRequestUrl('MONCHART');
              pms = {id: attributes.citygid};
              displayName = 'pointname';
              break;
            case 'LAYER_GD':
              res = t.setGDInfoWindow(attributes);
              charUrl = RequestHandle.getRequestUrl('DUSTCHART');
              pms = {deviceid: attributes.deviceid, ptype: 'pm25'};
              displayName = 'devicename';
              break;
          }
          this.searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res || '无数据', {
            title: '<sapn style="font-size:16px"><b>' + (attributes[displayName] || '') + '</b>' + '</span>',             //标题
            width: 320,
            height: 240,
            enableAutoPan: true,
            enableSendToPhone: false,
            searchTypes: []
          });
          this.searchInfoWindow.open(point);
          let requestPms = undefined;
          for (let key in pms) {
            if (!requestPms) {
              requestPms = key + '=' + pms[key];
            } else {
              requestPms += '&' + key + '=' + pms[key];
            }
          }
          let url = charUrl + '?' + (requestPms || '');

          RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
            let data = result.obj;
            switch (ptType.toUpperCase()) {
              case 'LAYER_CG':
                t.setCGChart(attributes.stationid, data.hourdatas);
                break;
              case 'LAYER_GS':
                t.setGSChart(attributes.citygid, data);
                break;
              case 'LAYER_GD':
                t.setGDChart(attributes.deviceid, data[0].valuelist || []);
                break;
            }
          }, function (ex) {
            console.error(ex);
          });
        }
      },
      //国省控点
      setGSInfoWindow(data){
        let aqi = data.aqi;
        return '<table width=\'100%\'><tr><td style=\'font-size:12px\' valign=\'top\'>'
          + '<table width=\'100%\' class=\'fitem\'>'
          + '</td></tr><tr><th>类型</th><td style=\'width:70px;text-align:center;\'>' + data.type
          + '</td><th></th><td style=\'width:70px;text-align:center;\'>' + ''
          + '</td><th></th><td  style=\'width:70px;text-align:center;\'>' + ''
          + '</td></tr></tr><th>AQI</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getAQILevelIndex(aqi)) + ';color:#fff\'>' + aqi
          + '</td><th>综指</th><td  style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getComplexIndex(data.complexindex)) + ';color:#fff\'>' + parseFloat(data.complexindex).toFixed(3)
          + '</td></tr><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + parseInt(data.pm25)
          + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + parseInt(data.pm10)
          + '</td><th>CO</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + ';color:#fff\'>' + parseFloat(data.co).toFixed(1)
          + '</td></tr><tr><th>NO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + ';color:#fff\'>' + parseInt(data.no2)
          + '</td><th>SO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + ';color:#fff\'>' + parseInt(data.so2)
          + '</td><th>O3</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + ';color:#fff\'>' + parseInt(data.o3)
          + '</td></tr><tr><th>温度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.temp) + '℃'
          + '</td><th>湿度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.humi) + '%'
          + '</td><th></th><td style=\'width:70px;text-align:center;\'>' + ''
          + '</td></tr><tr><th>风向</th><td style=\'width:70px;text-align:center;\'>' + data.winddirection
          + '</td><th>风级</th><td style=\'width:70px;text-align:center;\'>' + (parseInt(data.windspeed) || 0) + '级'
          + '</td><th></th><td style=\'width:70px;text-align:center;\'>' + ''
          + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + data.time.replace(/T/g, ' ') + '</td></tr></table>'
          + '</td>'
          + '<td valign=\'top\' align=\'right\'><td>'
          + '</tr></table><div id=\'citychart_' + data.citygid + '\' style=\'width:100%;height:110px\'>';
      },

      //国省图表
      setGSChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let value = item.aqi;
          let obj = {
            x: converTimeFormat(item.time.replace('T', ' ')).getTime(),
            y: parseInt(value),
            color: getColorByIndex(getAQILevelIndex(parseInt(value)))
          };
          rtValue.push(obj);
        }
        let title = '最近24小时AQI变化趋势';
        this.loadChar(code, 'AQI', rtValue, title);
      },

      //传感器
      setCGInfoWindow(data){
        return '<table width=\'100%\'><tr><td style=\'font-size:12px\' valign=\'top\'>'
          + '<table width=\'100%\' class=\'fitem\'>'
          + '<tr><th>AQI</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getAQILevelIndex(data.aqi)) + ';color:#fff\'>' + data.aqi
          + '</td></tr><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + parseInt(data.pm25)
          + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + parseInt(data.pm10)
          + '</td><th>CO</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + ';color:#fff\'>' + parseFloat(data.co).toFixed(1)
          + '</td></tr><tr><th>NO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + ';color:#fff\'>' + parseInt(data.no2)
          + '</td><th>SO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + ';color:#fff\'>' + parseInt(data.so2)
          + '</td><th>O3</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + ';color:#fff\'>' + parseInt(data.o3)
          + '</td></tr></table>'
          + '</td>'
          + '<td valign=\'top\' align=\'right\'><td>'
          + '</tr></table><div id=\'citychart_' + data.stationid + '\' style=\'width:100%;height:110px\'>';
      },

      //传感器图表
      setCGChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let obj = {
            x: converTimeFormat(item.recordtime.replace('T', ' ')).getTime(),
            y: parseInt(item.value),
            color: getColorByIndex(getAQILevelIndex(parseInt(item.value)))
          };
          rtValue.push(obj);
        }
        let title = '最近24小时AQI变化趋势';
        this.loadChar(code, 'AQI', rtValue, title);
      },

      //工地信息
      setGDInfoWindow(data){
        return '<table width=\'100%\' class="fitem"><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + parseInt(data.pm25)
          + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + parseInt(data.pm10)
          + '</td></tr><tr><th>温度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.temp) + '℃'
          + '</td><th>湿度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.humi) + '%'
          + '</td></tr><tr><th>风向</th><td style=\'width:70px;text-align:center;\'>' + data.winddirection
          + '</td><th>风级</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.windlevel || 0) + '级'
          + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + (data.time.replace(/T/g, ' ') || '') + '</td></tr></table>'
          + '</td>'
          + '<td valign=\'top\' align=\'right\'><td>'
          + '</tr></table><div id=\'citychart_' + data.deviceid + '\' style=\'width:100%;height:110px\'>';
      },

      //工地
      setGDChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let value = item.pm25 || 0;
          let obj = {
            x: converTimeFormat(item.time && item.time.replace('T', ' ')).getTime(),
            y: parseInt(value),
            color: getColorByIndex(getPM25LevelIndex(parseInt(value)))
          };
          rtValue.push(obj);
        }
        let title = '最近24小时PM2.5变化趋势';
        this.loadChar(code, 'PM2.5', rtValue, title);
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
        })
      },

      setCameraWindow(data){
        return '<iframe style="height:100%;width:100%;border:none;" src="/static/video/video.html?camIndexCode=' + data['CamIndexCode'] + '&devIndexCode=' + data['DevIndexCode'] + '&name=' + data['CamName'] + '"></iframe>';
      },
      //获取图标对象
      getMarker(pt, type){
        let marker = undefined;
        if (pt && type) {
          let imgUrl = this.getMarkerIcon(type);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
          marker = new BMap.Marker(pt, {icon: icon, offset: new BMap.Size(8, -16)});
        }
        return marker;
      },
      getMarkerIcon(type){
        let path = undefined;
        switch (type.toUpperCase()) {
          case 'CGQ-G':
            path = '/static/imgs/main/cgq-g.png';
            break;
          case 'CGQ-O':
            path = '/static/imgs/main/cgq-o.png';
            break;
          case 'CGQ-Y':
            path = '/static/imgs/main/cgq-y.png';
            break;
          case 'CGQ-V':
            path = '/static/imgs/main/cgq-v.png';
            break;
          case 'CGQ-M':
            path = '/static/imgs/main/cgq-m.png';
            break;
          case 'CGQ-R':
            path = '/static/imgs/main/cgq-r.png';
            break;
          case 'CGQ-NG':
            path = '/static/imgs/main/cgq-ng.png';
            break;
          case 'GD-G':
            path = '/static/imgs/main/gd-g.png';
            break;
          case 'GD-O':
            path = '/static/imgs/main/gd-o.png';
            break;
          case 'GD-Y':
            path = '/static/imgs/main/gd-y.png';
            break;
          case 'GD-V':
            path = '/static/imgs/main/gd-v.png';
            break;
          case 'GD-M':
            path = '/static/imgs/main/gd-m.png';
            break;
          case 'GD-R':
            path = '/static/imgs/main/gd-r.png';
            break;
          case 'GD-NG':
            path = '/static/imgs/main/gd-ng.png';
            break;
          case 'GS-G':
            path = '/static/imgs/main/gs-g.png';
            break;
          case 'GS-O':
            path = '/static/imgs/main/gs-o.png';
            break;
          case 'GS-Y':
            path = '/static/imgs/main/gs-y.png';
            break;
          case 'GS-V':
            path = '/static/imgs/main/gs-v.png';
            break;
          case 'GS-M':
            path = '/static/imgs/main/gs-m.png';
            break;
          case 'GS-R':
            path = '/static/imgs/main/gs-r.png';
            break;
          case 'GS-NG':
            path = '/static/imgs/main/gs-ng.png';
            break;
          case 'HWC-NG':
            path = '/static/imgs/main/hwc-ng.png';
            break;
          case 'HWC-G':
            path = '/static/imgs/main/hwc-g.png';
            break;
          case 'JYZ-G':
            path = '/static/imgs/main/jyz-g.png';
            break;
          case 'JYZ-NG':
            path = '/static/imgs/main/jyz-ng.png';
            break;
          case 'JYZ-R':
            path = '/static/imgs/main/jyz-r.png';
            break;
          case 'QY-G':
            path = '/static/imgs/main/qy-g.png';
            break;
          case 'QY-NG':
            path = '/static/imgs/main/qy-ng.png';
            break;
          case 'QY-R':
            path = '/static/imgs/main/qy-r.png';
            break;
          case 'SP-G':
            path = '/static/imgs/main/sp-g.png';
            break;
          case 'SP-NG':
            path = '/static/imgs/main/sp-ng.png';
            break;
          case 'ZTC-G':
            path = '/static/imgs/main/ztc-g.png';
            break;
          case 'ZTC-NG':
            path = '/static/imgs/main/ztc-ng.png';
            break;
        }
        return path;
      },
      getMarkerByType(type){
        let rtValue = [];
        for (let i = 0, length = this.lsMarkers.length; i < length; i++) {
          let item = this.lsMarkers[i];
          item.type.toUpperCase() === type.toUpperCase() && rtValue.push(item);
        }
        return rtValue;
      },
      removeMarkerByList(ls, type){
        for (let i = 0, length = ls.length; i < length; i++) {
          let overlayItem = ls[i];
          this.map.removeOverlay(overlayItem.marker);
        }
        let lsAllMarkers = [];
        for (let i = 0, length = this.lsMarkers.length; i < length; i++) {
          let item = this.lsMarkers[i];
          item.type.toUpperCase() !== type.toUpperCase() && lsAllMarkers.push(item);
        }
        this.lsMarkers = lsAllMarkers;
        this.searchInfoWindow && (this.searchInfoWindow.close(), this.searchInfoWindow = undefined);
      },
      clearMarkers(){
        for (let i = 0, length = this.lsMarkers.length; i < length; i++) {
          this.map.removeOverlay(this.lsMarker[i]);
        }
        this.searchInfoWindow && (this.searchInfoWindow.close(), this.searchInfoWindow = undefined);
      }
    }
  };
</script>
<style>
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
</style>
