<script>
  import BMap from 'BMap'
  import Coordtransform from 'coordtransform'
  import RequestHandle from '@/request/'
  import {bus} from '@/js/bus'
  export default {
    name: 'MainHandle',
    render(){
    },
    data () {
      return {
        lsMarkers: [],
        trafficLayer: undefined,
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
      targetClick(type, hasVisible, from){
        switch (type.toUpperCase()) {
          case 'LAYER_SP':
          case 'LAYER_SP_SLW':
          case 'LAYER_SP_VOC':
          case 'LAYER_SP_GD':
          case 'LAYER_SP_GKW':
          case 'LAYER_VOC':
          case 'LAYER_CG':
          case 'LAYER_CGQ_LCS':
          case 'LAYER_CGQ_GSX':
          case 'LAYER_CGQ_VOC':
          case 'LAYER_GS':
          case 'LAYER_GD':
            //请求接口触发
            hasVisible ? this.requestData(type, from) : this.removeMarkerByList(this.getMarkerByType(type), type);
            break;
          case 'LAYER_LK':
            this.targetTrafficLayer(hasVisible);
            break;
        }
      },
      requestData(type, from){
        this.lsMarkers.length && this.removeMarkerByList(this.getMarkerByType(type), type);
        let t = this;
        let lsUrl = [];
        let fieldName = undefined;
        let pms = undefined;
        let pmsKey = undefined;
        let uppercaseType = type.toUpperCase();
        switch (uppercaseType) {
          case 'LAYER_SP':
          case 'LAYER_SP_SLW':
          case 'LAYER_SP_VOC':
          case 'LAYER_SP_GD':
          case 'LAYER_SP_GKW':
            pmsKey = uppercaseType === 'LAYER_SP' ? undefined : (uppercaseType === 'LAYER_SP_SLW' ? '' : (uppercaseType === 'LAYER_SP_VOC' ? '' : (uppercaseType === 'LAYER_SP_GD' ? '' : (uppercaseType === 'LAYER_SP_GKW' ? '' : undefined))))
            let urlSP = RequestHandle.getRequestUrl('VIDEOTAEGET');
            //console.log(urlSP)
            pmsKey && (pms = {key: pmsKey});
            lsUrl.push(urlSP);
            break;
          case 'LAYER_CG':
          case 'LAYER_CGQ_LCS':
          case 'LAYER_CGQ_GSX':
            pmsKey = uppercaseType === 'LAYER_CG' ? undefined : (uppercaseType === 'LAYER_CGQ_LCS' ? '' : (uppercaseType === 'LAYER_CGQ_GSX' ? '' : (uppercaseType === 'LAYER_CGQ_VOC' ? '' : undefined)));
            let urlLCS = RequestHandle.getRequestUrl('SENSEPOLLUTION');
            let urlXH = RequestHandle.getRequestUrl('XHPOLLUTION');
            pmsKey && (pms = {key: pmsKey});
            fieldName = 'aqi';
            lsUrl.push(urlLCS);
            lsUrl.push(urlXH);
            break;
          case 'LAYER_VOC':
          case 'LAYER_CGQ_VOC':
            let urlVOC = RequestHandle.getRequestUrl('VOCPOLLUTION');
            fieldName = 'aqi';
            lsUrl.push(urlVOC);
            break;
          case 'LAYER_CGQ_SLW':
            let urlSLW = RequestHandle.getRequestUrl('VOCPOLLUTION');
            fieldName = 'aqi';
            lsUrl.push(urlSLW);
            break;
          case 'LAYER_GS':
            let urlGS = RequestHandle.getRequestUrl('MONPOLLUTION');
            fieldName = 'aqi';
            lsUrl.push(urlGS);
            break;
          case 'LAYER_GD':
            let urlGD = RequestHandle.getRequestUrl('DUSTPOLLUTION');
            let urlXHGD = RequestHandle.getRequestUrl('XHDUST');
            fieldName = 'pm25';
            lsUrl.push(urlGD);
            lsUrl.push(urlXHGD);
            break;
          case 'LAYER_QY':
//            let urlQY = RequestHandle.getRequestUrl('');
//            lsUrl.push(urlQY);
//            fieldName = 'NOX';
            break;
        }
        let reqPms = undefined;
        if (pms) {
          for (let k in pms) {
            if (!reqPms) {
              reqPms = k + '=' + pms[k];
            } else {
              reqPms += '&' + k + '=' + pms[k];
            }
          }
        }
        for (let i = 0, length = lsUrl.length; i < length; i++) {
          let url = lsUrl[i];
          let params = {url: url + (reqPms ? ('?' + reqPms) : ''), type: 'GET', pms: null};
          RequestHandle.request(params, function (result) {
//          if (result.status) {
            let rtValue = [];
            let dt = result.obj;
            if (dt) {
              for (let k = 0, length = dt.length; k < length; k++) {
                let item = dt[k];
                if (item.Type == from) {
                  rtValue.push(dt[k]);
                }
              }
            }
            console.log(rtValue);
            t.loadMarker(rtValue, type, fieldName);
//          }
          }, function (e) {
            console.error(e);
          });
        }
      },
      targetTrafficLayer(hasVisible){
        if (hasVisible) {
          this.trafficLayer = new BMap.TrafficLayer();
          this.map.addTileLayer(this.trafficLayer);
        }
        else {
          this.trafficLayer && this.map.removeTileLayer(this.trafficLayer);
          this.trafficLayer = undefined;
        }
      },
      loadMarker(data, type, fieldName){
        let t = this;
        for (let i = 0, length = data.length; i < length; i++) {
          let value = data[i];
          value['ptType'] = type;
          let labelName = '';//value.CamName || '';
          let pt = new BMap.Point(value.lng || value.Longitude || value.longitude, value.lat || value.Latitude || value.latitude);
          let marker = t.getMarker(pt, t.getMarkerState(value, type, fieldName), type);
          let label = new BMap.Label(labelName || '');
          label.setStyle({
            border: 'none',
            color: '#fff',
            background: 'none',
            fontSize: '14px',
            fontFamily: 'Microsoft YaHei'
          });
          label.setOffset(new BMap.Size(-(labelName.length * 4), 15));
          marker && (t.map.addOverlay(marker), marker.attributes = value, marker.setLabel(label), t.lsMarkers.push({
            marker: marker,
            type: type
          }), marker.addEventListener('click', function (e) {
            let tg = e.target;
            let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
            t.markerClick(tg.attributes, point);
          }));
        }
      },
      getMarkerState(data, ptType, fieldName){
        //console.log(data)
        let value = data[fieldName] || 0;
        let level = 0;
        if (ptType.toUpperCase() === 'LAYER_VOC' || ptType.toUpperCase() === 'LAYER_CGQ_VOC') {
          level = getVOCLeveColorIndex(data.TVOC_V) || 1;
        } else if (ptType.toUpperCase() === 'LAYER_QY') {
          level = getNO2LevelIndex(value) || 1;
        } else {
          level = getAQILevelIndex(value) || 1;
        }
        // console.log(level)
        let iconName = this.getIconName(ptType, level - 1);
        return iconName.toUpperCase();
      },
      getIconName(ptType, level){
        //console.log(level)
        let iconName = undefined;
        switch (ptType.toUpperCase()) {
          case 'LAYER_CG':
            iconName = 'cgq-';
            break;
          case 'LAYER_CGQ_LCS':
            iconName = 'cgq-lcs-';
            break;
          case 'LAYER_CGQ_GSX':
            iconName = 'cgq-gsx-';
            break;
          case 'LAYER_CGQ_VOC':
            iconName = 'cgq-voc-';
            break;
          case 'LAYER_VOC':
            iconName = 'voc-';
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
          case 'LAYER_SP_SLW':
            iconName = 'sp-slw-';
            break;
          case 'LAYER_SP_VOC':
            iconName = 'sp-voc-';
            break;
          case 'LAYER_SP_GD':
            iconName = 'sp-gd-';
            break;
          case 'LAYER_SP_GKW':
            iconName = 'sp-gkw-';
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
            iconName += 'y';
            break;
          case 2:
            iconName += 'o';
            break;
          case 3:
            iconName += 'r';
            break;
          case 4:
            iconName += 'v';
            break;
          case 5:
            iconName += 'm';
            break;
          case 6:
            iconName += 'v';
            break;
        }
        return iconName;
      },
      //图标点击事件
      markerClick(attributes, point){
        let t = this;
        if (attributes.hasOwnProperty('ptType') && (attributes.ptType.toUpperCase() === 'LAYER_SP' || attributes.ptType.toUpperCase() === 'LAYER_SP_VOC' || attributes.ptType.toUpperCase() === 'LAYER_SP_SLW' )) {
          let res = t.setCameraWindow(attributes);
          this.searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
            title: '<sapn style="font-size:16px"><b>' + (attributes['CamName'] || '') + ' - ' + (attributes['TypeName'] || '') + '</b>' + '</span>',             //标题
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
            case 'LAYER_CGQ_LCS':
              res = t.setCGInfoWindow(attributes);
              let dtCGType = (attributes.hasOwnProperty('dataType') && attributes.dataType) || undefined;
              charUrl = !dtCGType ? RequestHandle.getRequestUrl('SENSECHART') : RequestHandle.getRequestUrl('XHPOLLUTIONCHAR');
              pms = {stationid: attributes.stationid, pollute: 'AQI'};
              displayName = 'stationname';
              break;
            case 'LAYER_CGQ_VOC':
              res = t.setVOCInfoWindow(attributes);
              charUrl = RequestHandle.getRequestUrl('VOCCHART');
              pms = {stationid: attributes.StationID};
              displayName = 'PointName';
              break;
            case 'LAYER_GS':
              res = t.setGSInfoWindow(attributes);
              charUrl = RequestHandle.getRequestUrl('MONCHART');
              pms = {id: attributes.citygid};
              displayName = 'pointname';
              break;
            case 'LAYER_GD':
              res = t.setGDInfoWindow(attributes);
              let dtGDType = (attributes.hasOwnProperty('dataType') && attributes.dataType) || undefined;
              charUrl = !dtGDType ? RequestHandle.getRequestUrl('DUSTCHART') : RequestHandle.getRequestUrl('XHDUSTCHAR');
              pms = {deviceid: attributes.deviceid, ptype: 'pm25'};
              displayName = 'name';
              break;
          }
          this.searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res || '无数据', {
            title: '<sapn style="font-size:16px" ><b title="' + (attributes[displayName] || '') + '">' + (attributes[displayName] || '') + '</b>' + '</span>',             //标题
            width: 320,
            height: "auto",
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
            if (data) {
              switch (ptType.toUpperCase()) {
                case 'LAYER_CG':
                case 'LAYER_CGQ_LCS':
                  t.setCGChart(attributes.stationid, data.hourdatas);
                  break;
                case 'LAYER_GS':
                  t.setGSChart(attributes.citygid, data);
                  break;
                case 'LAYER_GD':
                  t.setGDChart(attributes.deviceid, data.valuelist || data[0].valuelist || []);
                  break;
                case 'LAYER_CGQ_VOC':
                  t.setVOCChart(attributes.StationID, data);
                  break;
              }
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
      //VOC监控
      setVOCInfoWindow(data){
        return '<table width=\'100%\' ><tr><td style=\'font-size:14px\' valign=\'top\'>'
          + '<table width=\'100%\' class=\'fitem\'>'
          + '<tr height=\'32px\'><th>TVOC</th><td style=\'width:70px;text-align:center;background-color:' + getVOCLeveColor(data.TVOC_V) + ';color:#fff\'>' + data.TVOC_V
          + '</td></tr><tr height=\'32px\'><th>温度</th><td style=\'width:70px;text-align:center;background-color:#fff;color:#333\'>' + parseInt(data.TP_V)
          + '℃</td><th>湿度</th><td style=\'width:70px;text-align:center;background-color:#fff;color:#333\'>' + parseInt(data.TD_V)
          + '%</td></tr><tr height=\'32px\'><th>更新时间</th><td colspan=\'3\' style=\'text-align:center;color:#000\'>' + data.CollectTime
          + '</td></tr></table>'
          + '</td>'
          + '<td valign=\'top\' align=\'right\'><td>'
          + '</tr></table><div id=\'citychart_' + data.StationID + '\' style=\'width:100%;height:110px\'>';
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
          + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + data.CollectTime+ '</td></tr></table>'
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
      //VOC图表
      setVOCChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let obj = {
            x: converTimeFormat(item.CollectTime).getTime(),
            y: parseInt(item.TVOC_V),
            color: getVOCLeveColor(item.TVOC_V)
          };
          //console.log(obj.x)
          rtValue.push(obj);
        }
        let title = '最近24小时VOC变化趋势';
        this.loadChar(code, 'VOC', rtValue, title);
      },
      //工地信息
      setGDInfoWindow(data){
        return '<table width=\'100%\' class="fitem"><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + parseInt(data.pm25)
          + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + parseInt(data.pm10)
          + '</td></tr><tr><th>温度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.temp) + '℃'
          + '</td><th>湿度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.humi) + '%'
          + '</td></tr><tr><th>风向</th><td style=\'width:70px;text-align:center;\'>' + data.winddirection
          + '</td><th>风级</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.windlevel || 0) + '级'
          + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + (data.time && (data.time.replace(/T/g, ' ')) || '') + '</td></tr></table>'
          + '</td>'
          + '<td valign=\'top\' align=\'right\'><td>'
          + '</tr></table><div id=\'citychart_' + data.deviceid + '\' style=\'width:100%;height:110px\'>';
      },

      //工地
      setGDChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let value = item.values || 0;
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
        Highcharts.setOptions({global: {useUTC: false}});
      },

      setCameraWindow(data){
        return '<iframe style="height:100%;width:100%;border:none;" src="/static/video/video.html?camIndexCode=' + data['CamIndexCode'] + '&devIndexCode=' + data['DevIndexCode'] + '&name=' + data['CamName'] + '"></iframe>';
      },
      //获取图标对象
      getMarker(pt, type, lyType){
        let marker = undefined;
        if (pt && type) {
          let conPoint = this.wgsPointToBd(pt);
          let imgUrl = this.getMarkerIcon(type);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
          marker = new BMap.Marker((lyType.toUpperCase() === 'LAYER_SP' || lyType.toUpperCase() === 'LAYER_SP_VOC' || lyType.toUpperCase() === 'LAYER_CGQ_LCS' || lyType.toUpperCase() === 'LAYER_CGQ_VOC'|| lyType.toUpperCase() === 'LAYER_GD') ? conPoint : pt, {
          //marker = new BMap.Marker((lyType.toUpperCase() === 'LAYER_GS') ? pt:conPoint, {
            icon: icon,
            offset: new BMap.Size(0, 0)
          });
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
          case 'CGQ-LCS-G':
            path = '/static/imgs/main/cgq-lcs-g.png';
            break;
          case 'CGQ-LCS-O':
            path = '/static/imgs/main/cgq-lcs-o.png';
            break;
          case 'CGQ-LCS-Y':
            path = '/static/imgs/main/cgq-lcs-y.png';
            break;
          case 'CGQ-LCS-V':
            path = '/static/imgs/main/cgq-lcs-v.png';
            break;
          case 'CGQ-LCS-M':
            path = '/static/imgs/main/cgq-lcs-m.png';
            break;
          case 'CGQ-LCS-R':
            path = '/static/imgs/main/cgq-lcs-r.png';
            break;
          case 'CGQ-LCS-NG':
            path = '/static/imgs/main/cgq-lcs-ng.png';
            break;
          case 'CGQ-GSX-G':
            path = '/static/imgs/main/cgq-gsx-g.png';
            break;
          case 'CGQ-GSX-O':
            path = '/static/imgs/main/cgq-gsx-o.png';
            break;
          case 'CGQ-GSX-Y':
            path = '/static/imgs/main/cgq-gsx-y.png';
            break;
          case 'CGQ-GSX-V':
            path = '/static/imgs/main/cgq-gsx-v.png';
            break;
          case 'CGQ-GSX-M':
            path = '/static/imgs/main/cgq-gsx-m.png';
            break;
          case 'CGQ-GSX-R':
            path = '/static/imgs/main/cgq-gsx-r.png';
            break;
          case 'CGQ-GSX-NG':
            path = '/static/imgs/main/cgq-gsx-ng.png';
            break;
          case 'CGQ-VOC-G':
            path = '/static/imgs/main/cgq-voc-g.png';
            break;
          case 'CGQ-VOC-O':
            path = '/static/imgs/main/cgq-voc-o.png';
            break;
          case 'CGQ-VOC-Y':
            path = '/static/imgs/main/cgq-voc-y.png';
            break;
          case 'CGQ-VOC-V':
            path = '/static/imgs/main/cgq-voc-v.png';
            break;
          case 'CGQ-VOC-M':
            path = '/static/imgs/main/cgq-voc-m.png';
            break;
          case 'CGQ-VOC-R':
            path = '/static/imgs/main/cgq-voc-r.png';
            break;
          case 'CGQ-VOC-NG':
            path = '/static/imgs/main/cgq-voc-ng.png';
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
          case 'SP-SLW-G':
            path = '/static/imgs/main/sp-slw-g.png';
            break;
          case 'SP-SLW-NG':
            path = '/static/imgs/main/sp-slw-ng.png';
            break;
          case 'SP-VOC-G':
            path = '/static/imgs/main/sp-voc-g.png';
            break;
          case 'SP-VOC-NG':
            path = '/static/imgs/main/sp-voc-ng.png';
            break;
          case 'SP-GD-G':
            path = '/static/imgs/main/sp-gd-g.png';
            break;
          case 'SP-GD-NG':
            path = '/static/imgs/main/sp-gd-ng.png';
            break;
          case 'SP-GKW-G':
            path = '/static/imgs/main/sp-gkw-g.png';
            break;
          case 'SP-GKW-NG':
            path = '/static/imgs/main/sp-gkw-ng.png';
            break;
          case 'ZTC-G':
            path = '/static/imgs/main/ztc-g.png';
            break;
          case 'ZTC-NG':
            path = '/static/imgs/main/ztc-ng.png';
            break;
          case 'VOC-M':
            path = '/static/imgs/main/voc-v.png';
            break;
          case 'VOC-O':
            path = '/static/imgs/main/voc-o.png';
            break;
          case 'VOC-R':
            path = '/static/imgs/main/voc-r.png';
            break;
          case 'VOC-G':
            path = '/static/imgs/main/voc-g.png';
            break;
          case 'VOC-Y':
            path = '/static/imgs/main/voc-y.png';
            break;
          case 'VOC-NG':
            path = '/static/imgs/main/voc-ng.png';
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
