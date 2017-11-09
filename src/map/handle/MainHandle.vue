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
        lsLabels: [],
        lsRedLabels: [],
        lsValueLabels: [],
        mouseLabel: undefined,
        defaultType: 'LAYER_GS',
        maxZoom: 13,
        trafficLayer: undefined,
        searchInfoWindow: undefined
      };
    },
    created(){
      bus.$once('setMainMap', this.setMap);
//      bus.$on('setMainMarkerLabel', this.setMarkerLabelVisible);
      bus.$on('setMainValueLabel', this.setLabelValueVisible);
      bus.$on('targetMainLayer', this.targetClick);
    },
    mounted(){
    },
    methods: {

      //设置Map对象
      setMap(map){
        this.map = map;
        !this.mouseLabel && ( this.mouseLabel = new BMap.Label(''), this.mouseLabel.setStyle({
          color: '#333',
          backgroundColor: '#fff',
          border: 'none',
          fontSize: '12px'
        }), this.mouseLabel.hide(), this.map.addOverlay(this.mouseLabel));
        if (this.map) {
          this.targetClick(this.defaultType, true);
        }
      },

      //切换响应事件
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
          case 'LAYER_QY':
            //请求接口触发
            hasVisible ? this.requestData(type, from) : (this.removeMarkerByList(this.getMarkerByType(type), type), this.removeLabelValue(this.getLabelValueByType(type), type), this.removeLabelRed(this.getLabelRedByType(type), type));
            break;
          case 'LAYER_LK':
            this.targetTrafficLayer(hasVisible);
            break;
        }
      },

      //发送请求获取相应数据
      requestData(type, from){
        this.lsMarkers.length && this.removeMarkerByList(this.getMarkerByType(type), type);
        this.lsLabels.length && this.removeMarkerLabel(this.getMarkerLabelByType(type), type);
        this.lsRedLabels.length && this.removeLabelRed(this.getLabelRedByType(type), type);
        this.lsValueLabels.length && this.removeLabelValue(this.getLabelValueByType(type), type);
        let t = this;
        let lsUrl = [];
        let fieldName = undefined;
        let displayName = undefined;
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
            displayName = 'CamName';
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
            displayName = 'stationname';
            lsUrl.push(urlLCS);
            lsUrl.push(urlXH);
            break;
          case 'LAYER_VOC':
          case 'LAYER_CGQ_VOC':
            let urlVOC = RequestHandle.getRequestUrl('VOCPOLLUTION');
            fieldName = 'TVOC_V';
            displayName = 'PointName';
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
            displayName = 'pointname';
            lsUrl.push(urlGS);
            break;
          case 'LAYER_GD':
            let urlGD = RequestHandle.getRequestUrl('DUSTPOLLUTION');
            let urlXHGD = RequestHandle.getRequestUrl('XHDUST');
            fieldName = 'pm10';
            displayName = 'name';
            lsUrl.push(urlGD);
            lsUrl.push(urlXHGD);
            break;
          case 'LAYER_QY':
            let urlQY = RequestHandle.getRequestUrl('ENTERPRISE');
            lsUrl.push(urlQY);
            fieldName = 'SmokeStatus';
            displayName = 'psname';
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
            t.loadMarker(rtValue, type, fieldName, displayName);
//          }
          }, function (e) {
            console.error(e);
          });
        }
      },

      //路况显隐性切换
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

      //加载Marker
      loadMarker(data, type, fieldName, displayName){
        let t = this;
        for (let i = 0, length = data.length; i < length; i++) {
          let value = data[i];
          value['ptType'] = type;
          let labelName = ((displayName && value) && (value[displayName]));//value.CamName || '';
          let pt = new BMap.Point(value.lng || value.Longitude || value.longitude, value.lat || value.Latitude || value.latitude);
          let marker = t.getMarker(pt, t.getMarkerState(value, type, fieldName), type, value[displayName] || undefined);
//          let label = t.setMarkerLabel(labelName, t.getMarkerLabelState(value, type, fieldName), pt, type);//, marker.setLabel(label)
//          label && (t.lsLabels.push({label: label, type: type}), t.map.addOverlay(label));

          //获取警报Label
          let labelRed = t.getLabelRed(value, type, fieldName, pt);
          labelRed && (t.lsRedLabels.push({label: labelRed, type: type}), t.map.addOverlay(labelRed));

          //加载数值Label
          let labelValue = t.setValueLabel(value, fieldName, type, pt);
          labelValue && (t.lsValueLabels.push({label: labelValue, type: type}), t.map.addOverlay(labelValue));

          marker && (t.map.addOverlay(marker), marker.attributes = value, marker.displayField = displayName, t.lsMarkers.push({
            marker: marker,
            type: type
          }), (type.toUpperCase() !== 'LAYER_GS' && ((marker.addEventListener('mouseover', function (e) {
            console.log(e);
            let tg = e.target || e.currentTarget;
            let attr = tg.attributes;
            let displayFieldName = tg.displayField;
            if (attr && displayFieldName) {
              let ptName = attr[displayFieldName] || attr['psname'];//兼容企业显示字段
              ptName && (t.mouseLabel.setContent(ptName + '<div class="arrow" style="width: 0;  height: 0; border-left: 8px solid transparent; border-bottom: 8px solid #fff; border-right: 8px solid transparent; color:#333; position: absolute;  margin-top:-24px;margin-left:' + (ptName.length * 6 - 8) + 'px"></div>'),
                t.mouseLabel.setPosition(tg.getPosition()),
                t.mouseLabel.setOffset(new BMap.Size(-ptName.length * 6-6, 8)),
                t.mouseLabel.show());
            }
          }))), marker.addEventListener('mouseout', function () {
            t.mouseLabel.hide();
          })), marker.addEventListener('click', function (e) {
            let tg = e.target;
            let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
            t.markerClick(tg.attributes, point);
          }));
        }
      },

      //获取Label状态
      getMarkerLabelState(data, ptType, fieldName){
        let value = data[fieldName];
        let level = 0;
        if (ptType.toUpperCase() === 'LAYER_VOC' || ptType.toUpperCase() === 'LAYER_CGQ_VOC') {
          level = getVOCLeveColorIndex(data.TVOC_V) || -1;
          value = data[fieldName] || '--';
        } else if (ptType.toUpperCase() === 'LAYER_QY') {
          level = data['isOnline'] ? (value ? 4 : -1) : -1;//getNO2LevelIndex(value) || 1;
          value = data['smoke'] || '--';
        } else if (ptType.toUpperCase() === 'LAYER_SP_SLW' || ptType.toUpperCase() === 'LAYER_SP_VOC' || ptType.toUpperCase() === 'LAYER_SP_GKW') {
          value = data[fieldName];
        } else {
          level = getAQILevelIndex(value) || -1;
          value = data[fieldName] || '--';
        }
        return {level: level, value: value};
      },

      //获取警报Label
      getLabelRed(data, ptType, fieldName, pt){
        let labelRed = undefined;
        //if(!(ptType.toUpperCase() === 'LAYER_SP_SLW' || ptType.toUpperCase() === 'LAYER_SP_VOC' || ptType.toUpperCase() === 'LAYER_SP_GKW')) {
        if (ptType.toUpperCase() === 'LAYER_GS') {
          let value = data[fieldName];
          let hasRed = false;
          if (ptType.toUpperCase() === 'LAYER_VOC' || ptType.toUpperCase() === 'LAYER_CGQ_VOC') {
            hasRed = getVOCLeveColorIndex(data.TVOC_V) > 3;
          } else if (ptType.toUpperCase() === 'LAYER_QY') {
            hasRed = data['isOnline'] ? value : false;
          } else {
            hasRed = getAQILevelIndex(value) > 3;
          }
          //警报
          if (hasRed) {
            let elContext = '<div class="pulse"></div><div class="pulse1"></div>';
            let conPoint = this.wgsPointToBd(pt);
            let opts = {
              position: (ptType.toUpperCase() === 'LAYER_SP' || ptType.toUpperCase() === 'LAYER_SP_VOC' || ptType.toUpperCase() === 'LAYER_CGQ_LCS' || ptType.toUpperCase() === 'LAYER_CGQ_VOC' || ptType.toUpperCase() === 'LAYER_GD') ? conPoint : pt,
              offset: (ptType.toUpperCase() === 'LAYER_SP' || ptType.toUpperCase() === 'LAYER_SP_VOC' || ptType.toUpperCase() === 'LAYER_CGQ_LCS' || ptType.toUpperCase() === 'LAYER_CGQ_VOC' || ptType.toUpperCase() === 'LAYER_GD') ? new BMap.Size(-35, -35) : new BMap.Size(-35, -35)
            };
            labelRed = new BMap.Label(elContext, opts);
            labelRed.setStyle({
              border: 'none',
              background: 'none',
              height: '60px',
              width: '60px',
            });
          }
        }
        return labelRed;
      },

      //获取Marker状态
      getMarkerState(data, ptType, fieldName){
        //console.log(data)
        let value = data[fieldName] || 0;
        let level = 0;
        if (ptType.toUpperCase() === 'LAYER_VOC' || ptType.toUpperCase() === 'LAYER_CGQ_VOC') {
          level = getVOCLeveColorIndex(data.TVOC_V) || 1;
        } else if (ptType.toUpperCase() === 'LAYER_QY') {
          level = data['isOnline'] ? (value ? 4 : 1) : 0;//getNO2LevelIndex(value) || 1;
        } else if (ptType.toUpperCase() === 'LAYER_GD') {
          level = getPM10LevelIndex(value) || 1;
        } else {
          level = getAQILevelIndex(value) || 1;
        }
        // console.log(level)
        let iconName = this.getIconName(ptType, level - 1);
        return iconName.toUpperCase();
      },

      //获取Icon名称
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
          case -1:
            iconName += 'ng';
            break;
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
            iconName += 'm';
            break;
          case 5:
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
          (this.searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
            title: '<sapn style="font-size:16px"><b>' + (attributes['CamName'] || '') + ' - ' + (attributes['TypeName'] || '') + '</b>' + '</span>',             //标题
            width: 520,
            height: 400,
            enableAutoPan: true,
            enableSendToPhone: false,
            searchTypes: []
          }));
          this.searchInfoWindow.open(point);
        }
        else {
          let res = undefined;
          let charUrl = undefined;
          let pms = undefined;
          let displayName = undefined;
          let infoWidth = '420px';
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
              pms = {id: attributes.citygid, type: 'AQI'};
              displayName = 'pointname';
              break;
            case 'LAYER_GD':
              res = t.setGDInfoWindow(attributes);
              let dtGDType = (attributes.hasOwnProperty('dataType') && attributes.dataType) || undefined;
              charUrl = !dtGDType ? RequestHandle.getRequestUrl('DUSTCHART') : RequestHandle.getRequestUrl('XHDUSTCHAR');
              pms = {deviceid: attributes.deviceid, ptype: 'pm10'};
              displayName = 'name';
              break;
            case 'LAYER_QY':
              displayName = 'psname';
              charUrl = RequestHandle.getRequestUrl('ENTERPRISECHAR');
              pms = {pscode: attributes.pscode, type: 'nox'};
              infoWidth = 410;
              break;
          }
           (this.searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res || '无数据', {
            title: '<sapn style="font-size:16px" ><b title="' + (attributes[displayName] || '') + '">' + (attributes[displayName] || '') + '</b>' + '</span>',             //标题
            width: infoWidth,
            height: "auto",
            enableAutoPan: true,
            enableSendToPhone: false,
            searchTypes: []
          }));
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
                  let gsContent = t.setGSInfoWindow(data);
                  t.searchInfoWindow.setContent(gsContent);
                  t.setGSChart(data.citygid, result.history || []);
                  break;
                case 'LAYER_GD':
                  t.setGDChart(attributes.deviceid, data.valuelist || data[0].valuelist || []);
                  break;
                case 'LAYER_CGQ_VOC':
                  t.setVOCChart(attributes.StationID, data);
                  break;
                case 'LAYER_QY':
                  let qyContent = t.setQYInfoWindow(data);
                  t.searchInfoWindow.setContent(qyContent);
                  t.setQYChart(attributes.pscode, result.history);
                  break;
              }
            }
          }, function (ex) {
            console.error(ex);
          });
        }
        //console.log(this.searchInfoWindow.container.querySelector('img').src = '');
      },

      //国省控点
      setGSInfoWindow(data){
        let aqi = data.aqi;
        let time = data.time;
        /*return '<table width=\'100%\'><tr><td style=\'font-size:12px\' valign=\'top\'>'
         + '<table width=\'100%\' class=\'fitem\'>'
         + '</td></tr><tr><th>类型</th><td style=\'width:70px;text-align:center;\'>' + data.type
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
         + '</td></tr><tr><th>风向</th><td style=\'width:70px;text-align:center;\'>' + data.winddirection
         + '</td><th>风级</th><td style=\'width:70px;text-align:center;\'>' + (parseInt(data.windspeed) || 0) + '级'
         + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + data.time.replace(/T/g, ' ') + '</td></tr></table>'
         + '</td>'
         + '<td valign=\'top\' align=\'right\'><td>'
         + '</tr></table><div id=\'citychart_' + data.citygid + '\' style=\'width:100%;height:110px\'></div>';*/

        return '  <div class="param"><div class="line"></div>\n' +
          '        <div class="item one">\n' +
          '            <div class="above">\n' +
          '            <div class="square"></div>\n' +
          '            <span class="type">' + data.type + '</span>\n' +
          '            </div>\n' +
          '            <div class="data">' + time.replace('T', ' ') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item second">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getAQILevelIndex(aqi)) + '\'> AQI</div>\n' +
          '            <div class="value">' + aqi + '</div>\n' +
          '        </div>' +
          '<div class="item third">' +
          '<div class="key" style=\'background-color:' + getColorByIndex(getComplexIndex(data.complexindex)) + '\'>综值</div>' +
          '<div class="value">' + parseFloat(data.complexindex).toFixed(3) + '</div></div><br>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + '\'>PM2.5</div>\n' +
          '            <div class="value"> ' + parseInt(data.pm25) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + '\'>PM10</div>\n' +
          '            <div class="value">' + parseInt(data.pm10) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + '\'>CO</div>\n' +
          '            <div class="value">' + parseFloat(data.co).toFixed(1) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + '\'>NO2</div>\n' +
          '            <div class="value">' + parseInt(data.no2) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + '\'>SO2</div>\n' +
          '            <div class="value">' + parseInt(data.so2) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + '\'>O3</div>\n' +
          '            <div class="value">' + parseInt(data.o3) + '</div>\n' +
          '        </div>\n' +
          '    </div><div class="index">' +
          '<div class="item">温度：' + parseInt(data.temp) + '℃' + '</div>' +
          '<div class="item">湿度：' + parseInt(data.humi) + '%' + '</div>' +
          '<div class="item">风向：' + data.winddirection + '</div>' +
          '<div class="item">风级：' + (parseInt(data.windspeed) || 0) + '级' + '</div></div>' +
          '<div id=\'citychart_' + data.citygid + '\' style=\'width:100%;height:110px\'></div>'
      },

      //国省图表
      setGSChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let value = item.value;
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
        /* return '<table width=\'100%\' ><tr><td style=\'font-size:14px\' valign=\'top\'>'
         + '<table width=\'100%\' class=\'fitem\'>'
         + '<tr height=\'32px\'><th>TVOC</th><td style=\'width:70px;text-align:center;background-color:' + getVOCLeveColor(data.TVOC_V) + ';color:#fff\'>' + (data.TVOC_V ? data.TVOC_V : '--')
         //          + '</td></tr><tr height=\'32px\'><th>温度</th><td style=\'width:70px;text-align:center;background-color:#fff;color:#333\'>' + (data.TP_V ? parseInt(data.TP_V) + '℃' : '--')
         //          + '</td><th>湿度</th><td style=\'width:70px;text-align:center;background-color:#fff;color:#333\'>' + (data.TD_V ? parseInt(data.TD_V) + '%' : '--')
         + '</td></tr><tr height=\'32px\'><th>更新时间</th><td colspan=\'3\' style=\'text-align:center;color:#000\'>' + (data.CollectTime || data.RecordTime.replace(/T/g, ' '))
         + '</td></tr></table>'
         + '</td>'
         + '<td valign=\'top\' align=\'right\'><td>'
         + '</tr></table><div id=\'citychart_' + data.StationID + '\' style=\'width:100%;height:110px\'>';*/

        return '<div class="param">\n' +
          '    <div class="line"></div>\n' +
          '    <div class="item vocItem one">\n' +
          '        <div class="triangle"></div>\n' +
          '        <div class="type">TVOC监测</div>\n' +
          '        <div class="data">' + (data.CollectTime || data.RecordTime.replace('T', ' ')) + '</div>\n' +
          '    </div>\n' +
          '    <div class="item vocItem">\n' +
          '        <div class="key" style=\'background-color:' + getVOCLeveColor(data.TVOC_V) + '\'>TVOC</div>\n' +
          '        <div class="value">' + (data.TVOC_V ? data.TVOC_V : '--') + '</div>\n' +
          '    </div>\n' +
          '</div><div id=\'citychart_' + data.StationID + '\' style=\'width:100%;height:110px\'>'
      },

      //六参数
      setCGInfoWindow(data){
        /* return '<table width=\'100%\'><tr><td style=\'font-size:12px\' valign=\'top\'>'
         + '<table width=\'100%\' class=\'fitem\'>'
         + '<tr><th>AQI</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getAQILevelIndex(data.aqi)) + ';color:#fff\'>' + (data.aqi ? data.aqi : '--')
         + '</td></tr><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + (data.pm25 ? parseInt(data.pm25) : '--')
         + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + (data.pm10 ? parseInt(data.pm10) : '--')
         + '</td><th>CO</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + ';color:#fff\'>' + (data.co ? parseFloat(data.co).toFixed(1) : '--')
         + '</td></tr><tr><th>NO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + ';color:#fff\'>' + (data.no2 ? parseInt(data.no2) : '--')
         + '</td><th>SO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + ';color:#fff\'>' + (data.so2 ? parseInt(data.so2) : '--')
         + '</td><th>O3</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + ';color:#fff\'>' + (data.o3 ? parseInt(data.o3) : '--')
         + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + ((data.CollectTime && data.CollectTime.replace(/T/g, ' ')) || data.RecordTime.replace(/T/g, ' ')) + '</td></tr></table>'
         + '</td>'
         + '<td valign=\'top\' align=\'right\'><td>'
         + '</tr></table><div id=\'citychart_' + data.stationid + '\' style=\'width:100%;height:110px\'>';*/


        return '<div class="param"><div class="line"></div>\n' +
          '        <div class="item one">\n' +
          '            <div class="above">\n' +
          '            <div class="circle"></div>\n' +
          '            <span class="type">六参数检测</span>\n' +
          '            </div>\n' +
          '            <div class="data">' + data.CollectTime.replace('T', ' ') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item">\n' +
          '            <div class="key keyAqi" style=\'background-color:' + getColorByIndex(getAQILevelIndex(data.aqi)) + '\'>AQI</div>\n' +
          '            <div class="value">' + (data.aqi ? data.aqi : '--') + '</div>\n' +
          '        </div><br>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + '\'>PM2.5</div>\n' +
          '            <div class="value">' + (data.pm25 ? parseInt(data.pm25) : '--') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key"  style=\'background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + '\'>PM10</div>\n' +
          '            <div class="value">' + (data.pm10 ? parseInt(data.pm10) : '--') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + '\'>CO</div>\n' +
          '            <div class="value">' + (data.co ? parseFloat(data.co).toFixed(1) : '--') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + '\'>NO2</div>\n' +
          '            <div class="value">' + (data.no2 ? parseInt(data.no2) : '--') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + '\'>SO2</div>\n' +
          '            <div class="value">' + (data.so2 ? parseInt(data.so2) : '--') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + '\'>O3</div>\n' +
          '            <div class="value">' + (data.o3 ? parseInt(data.o3) : '--') + '</div>\n' +
          '        </div>\n' +
          '    </div><div id=\'citychart_' + data.stationid + '\' style=\'width:100%;height:110px\'>'
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
            x: converTimeFormat(item.CollectTime || item.RecordTime).getTime(),
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
        return '<table width=\'100%\' class="fitem"><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + (data.pm25 ? parseInt(data.pm25) : '--')
          + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + (data.pm10 ? parseInt(data.pm10) : '--')
          + '</td></tr><tr><th>温度</th><td style=\'width:70px;text-align:center;\'>' + (data.temp ? (parseInt(data.temp) + '℃') : '--')
          + '</td><th>湿度</th><td style=\'width:70px;text-align:center;\'>' + (data.humi ? (parseInt(data.humi) + '%') : '--')
          + '</td></tr><tr><th>风向</th><td style=\'width:70px;text-align:center;\'>' + (data.wdirection || '--')
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
          let value = (item.hasOwnProperty('value') ? item.value : item.values) || 0;
          let obj = {
            x: converTimeFormat(item.time && item.time.replace('T', ' ')).getTime(),
            y: parseInt(value),
            color: getColorByIndex(getPM25LevelIndex(parseInt(value)))
          };
          rtValue.push(obj);
        }
        let title = '最近24小时PM10变化趋势';
        this.loadChar(code, 'PM10', rtValue, title);
      },

      //企业InfoWindow
      setQYInfoWindow(data){
        let dts = data || [];
        let headerElements = '<tr><td rowspan="2">名称</td><td colspan="2">氮氧化物</td><td colspan="2">二氧化硫</td><td colspan="2">烟尘</td><td rowspan="2">总排放量</td></tr><tr><td>实测</td><td>折算</td><td>实测</td><td>折算</td><td>实测</td><td>折算</td></tr>';
        let els = '';
        for (let i = 0, length = dts.length; i < length; i++) {
          let item = dts[i];
          els += '<tr><td>' + item.outputname + '</td><td style="color:' + (item.noxStatus ? '#ff0000' : '') + '">' +
            (item.nox || '--') + '</td><td>' +
            (item.nox_convert || '--') + '</td><td style="color:' + (item.so2Status ? '#ff0000' : '') + '">' +
            (item.so2 || '--') + '</td><td>' +
            (item.so2_convert || '--') + '</td><td style="color:' + (item.smokeStatus ? '#ff0000' : '') + '">' +
            (item.smoke || '--') + '</td><td>' +
            (item.smoke_convert || '--') + '</td><td>' +
            (item.gasoutputflow || '--') + '</td></tr>';
          if (i === (dts.length - 1)) {
            els += '<tr><td>排放限值(mg/m3)</td><td colspan="2">' + (item.NoxLimit || ' --') + '</td><td colspan="2">' + (item.So2Limit || ' --') + '</td><td colspan="2">' + (item.SmokeLimit || ' --') + '</td><td>--</td></tr>'
          }
        }
        els += '<tr><td>时间</td><td colspan="7">' + ((data.length ? data[0].time : '--') || '--') + '</td></tr>';

        return '<table style="min-width:390px;" class="fitem" cellpadding="0" cellspacing="0">' + headerElements + els + '</table><div id=\'citychart_' + (data.length && data[0].pscode) + '\' style=\'width:100%;height:110px;\'>';
      },

      //企业24小时
      setQYChart(code, data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let value = item['value'] || 0;
          let obj = {
            x: converTimeFormat(item.time && item.time.replace('T', ' ')).getTime(),
            y: parseInt(value),
            color: value['status'] ? '#ff0000' : '#00ff00'//getColorByIndex(getPM25LevelIndex(parseInt(value)))
          };
          rtValue.push(obj);
        }
        let title = '最近24小时烟尘变化趋势';
        this.loadChar(code, '烟尘', rtValue, title);
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

      //设置摄像头IFrame
      setCameraWindow(data){
        return '<iframe style="height:100%;width:100%;border:none;" src="/static/video/video.html?camIndexCode=' + data['CamIndexCode'] + '&devIndexCode=' + data['DevIndexCode'] + '&area=' + data['Area'] + '&name=' + data['CamName'] + '"></iframe>';
      },

      //获取图标对象
      getMarker(pt, type, lyType, value){
        let marker = undefined;
        if (pt && type) {
          let conPoint = this.wgsPointToBd(pt);
          let imgUrl = this.getMarkerIcon(type);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
          marker = new BMap.Marker((lyType.toUpperCase() === 'LAYER_SP' || lyType.toUpperCase() === 'LAYER_SP_VOC' || lyType.toUpperCase() === 'LAYER_CGQ_LCS' || lyType.toUpperCase() === 'LAYER_CGQ_VOC' || lyType.toUpperCase() === 'LAYER_GD') ? conPoint : pt, {
            //marker = new BMap.Marker((lyType.toUpperCase() === 'LAYER_GS') ? pt:conPoint, {
            icon: icon,
            offset: new BMap.Size(0, 0)
          });
          //let typeUpper = type.toUpperCase();
          if (lyType.toUpperCase() === 'LAYER_GS') {
            let label = new BMap.Label((value || '') + '<div class="arrow" style="width: 0;  height: 0; border-left: 8px solid transparent; border-bottom: 8px solid #fff; border-right: 8px solid transparent; color:#333; position: absolute;  margin-top:-24px;margin-left:' + (value.length * 6 - 8) + 'px  " ></div>');
            label.setStyle({
              border: 'none',
              //color: (typeUpper === 'GS-G' || typeUpper === 'GS-O' || typeUpper === 'GS-Y') ? '#333' : '#fff',
              color: '#000000',
              background: '#fff',
              fontSize: '12px',
              fontFamily: 'Microsoft YaHei'
            });
            label.setOffset(new BMap.Size(-6 * value.length + 7, 21));
            marker.setLabel(label);
          }
        }
        return marker;
      },

      //设置显示值覆盖物
      setValueLabel(value, displayField, ptType, pt){
        let index = 0;
        let hasLabel = false;
        let label = undefined;
        let vl = value[displayField];
        switch (ptType.toUpperCase()) {
          case 'LAYER_GS':
          case 'LAYER_CGQ_LCS':
            index = getAQILevelIndex(parseInt(vl));
            hasLabel = true;
            break;
          case 'LAYER_GD':
            index = getPM10LevelIndex(parseInt(vl));
            hasLabel = true;
            break;
          case 'LAYER_CGQ_VOC':
            index = getVOCLeveColorIndex(parseInt(vl));
            hasLabel = true;
            break;
          case 'LAYER_QY':
            index = value['isOnline'] ? (value ? 4 : 1) : 0;
            vl = value['smoke'] || '--';
            hasLabel = true;
            break
        }
        if (hasLabel) {
          let bgcolor = getColorByIndex(index) || '#333';
          let conPoint = this.wgsPointToBd(pt);
          let opts = {
            position: (ptType.toUpperCase() === 'LAYER_SP' || ptType.toUpperCase() === 'LAYER_SP_VOC' || ptType.toUpperCase() === 'LAYER_CGQ_LCS' || ptType.toUpperCase() === 'LAYER_CGQ_VOC' || ptType.toUpperCase() === 'LAYER_GD') ? conPoint : pt,
            offset: new BMap.Size(-20, -40)
          };
          label = new BMap.Label(vl + '<div class="arrow" style="width: 0;  height: 0; border-left: 8px solid transparent; border-top: 8px solid; border-right: 8px solid transparent; color:' + bgcolor + '; position: absolute;  margin-top:-2px;margin-left:8px  " ></div>', opts)  // 创建文本标注对象
//          label.attributes = {ptId: code};
          label.setStyle({
            color: '#fff',
            background: bgcolor,
            fontSize: '14px',
            border: '',
            width: '35px',
            textAlign: 'center',
            height: '22px',
            lineHeight: '22px',
            borderRadius: '4px'
          });
          label && ((this.map.getZoom() >= this.maxZoom || ptType.toUpperCase() === 'LAYER_GS') ? label.show() : label.hide());
        }
        return undefined;
      },

      //设置MarkerLabel
      setMarkerLabel(displayValue, state, point, lyType){
//        displayValue = displayValue === '药材公司' ? '第十中学' : displayValue;
        let conPoint = this.wgsPointToBd(point);
        let label = new BMap.Label(((!state.value) ? displayValue : this.getLabelContent(displayValue, state, lyType)) || '');
        label.setStyle({
          border: 'solid 1px rgba(51, 51, 51, 0.9)',
          color: '#333',
          background: 'rgba(255, 255, 255, 0.8)',
          fontSize: '14px',
          fontFamily: 'Microsoft YaHei'
        });
        label.setPosition((lyType.toUpperCase() === 'LAYER_SP' || lyType.toUpperCase() === 'LAYER_SP_VOC' || lyType.toUpperCase() === 'LAYER_CGQ_LCS' || lyType.toUpperCase() === 'LAYER_CGQ_VOC' || lyType.toUpperCase() === 'LAYER_GD') ? conPoint : point);
        displayValue && label.setOffset(new BMap.Size(-(displayValue.length * 14 / 2 + 16), 14));
        this.map.getZoom() >= this.maxZoom ? label.show() : label.hide();
        return label;
      },

      //获取Label显示内容
      getLabelContent(displayValue, state, lyType){
        let col = '#00ff00';
        if (lyType.toUpperCase() === 'LAYER_QY') {
          col = state.level ? '#43ce17' : '#d20040';
        } else {
          col = getColorByIndex(state.level);
        }
        return '<div><span>' + displayValue + '</span><span>|</span><span style="color:' + col + '">' + state.value + '</span></div>';
      },

      //设置Label显隐性
      setMarkerLabelVisible(hasVisible){
        for (let i = 0, length = this.lsLabels.length; i < length; i++) {
          let v = this.lsLabels[i];
          hasVisible ? v.label.show() : v.label.hide();
        }
      },

      //获取Label根据类型
      getMarkerLabelByType(type){
        return this.lsLabels.filter(v => v.type.toUpperCase() === type.toUpperCase());
      },

      //WGS坐标转百度坐标
      wgsPointToBd: function (pt) {
        let transPoint = this.transformFun([pt.lng, pt.lat]);
        let bdPoint = new BMap.Point(transPoint[0], transPoint[1]);

        return bdPoint;
      },

      //WGS坐标转百度坐标
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      },

      //获取地图显示图标根据类型
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

      //根据类型获取Marker
      getMarkerByType(type){
        let rtValue = [];
        for (let i = 0, length = this.lsMarkers.length; i < length; i++) {
          let item = this.lsMarkers[i];
          item.type.toUpperCase() === type.toUpperCase() && rtValue.push(item);
        }
        return rtValue;
      },

      //获取警报Label根据类型
      getLabelRedByType(type){
        let rtValue = [];
        for (let i = 0, length = this.lsRedLabels.length; i < length; i++) {
          let item = this.lsRedLabels[i];
          item.type.toUpperCase() === type.toUpperCase() && rtValue.push(item);
        }
        return rtValue;
      },

      //获取值Label根据类型
      getLabelValueByType(type){
        let rtValue = [];
        for (let i = 0, length = this.lsValueLabels.length; i < length; i++) {
          let item = this.lsValueLabels[i];
          item.type.toUpperCase() === type.toUpperCase() && rtValue.push(item);
        }
        return rtValue;
      },

      //设置数值Value显隐性
      setLabelValueVisible(hasVisible){
        this.lsValueLabels.forEach(v => (hasVisible ? v.label.show() : v.label.hide()));
      },

      //移除Marker根据类型及Marker集合
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

      //移除Label
      removeMarkerLabel(ls = [], type){
        let t = this;
        ls.forEach(v => t.map.removeOverlay(v.label));
        let lsAllLabels = [];
        this.lsLabels.forEach(function (v) {
          v.type.toUpperCase() !== type.toUpperCase() && lsAllLabels.push(v);
        });
        this.lsLabels = lsAllLabels;
      },

      //移除LabelRed
      removeLabelRed(ls = [], type){
        let t = this;
        ls.forEach(v => t.map.removeOverlay(v.label));
        let lsAllLabels = [];
        this.lsRedLabels.forEach(function (v) {
          v.type.toUpperCase() !== type.toUpperCase() && lsAllLabels.push(v);
        });
        this.lsRedLabels = lsAllLabels;
      },

      //移除LabelValue
      removeLabelValue(ls = [], type){
        let t = this;
        ls.forEach(v => t.map.removeOverlay(v.label));
        let lsAllLabels = [];
        this.lsValueLabels.forEach(function (v) {
          v.type.toUpperCase() !== type.toUpperCase() && lsAllLabels.push(v);
        });
        this.lsValueLabels = lsAllLabels;
      },

      //清除Marker
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
    /*padding: 4px 2px;*/
  }

  .pop {
    padding: 12px 20px 20px 20px;
    border: 1px solid #ccc;
    background: #FFFFFF;
    border-radius: 2px;
    margin: 20px;
    display: inline-block;

  }

  .param {
    /*border-top:1px solid #DDDDDD;*/
    padding: 0 15px 20px;
  }

  .line {
    height: 1px;
    width: 100%;
    background: #DDDDDD;
    margin-bottom: 12px;
  }

  .param .item {
    background: #EBEBEB;
    display: inline-block;
    font-size: 14px;
    font-family: "Microsoft YaHei";
  }

  .data {
    font-size: 10px;
    color: #666666;
    line-height: 10px;
  }

  .value {
    font-size: 14px;
    color: #666666;
    background: #EBEBEB;
    text-align: center;
  }

  .key {
    font-size: 12px;
    color: #333333;
    font-weight: bold;
    background: #2BE42F;
    text-align: center;
    height: 20px;
    line-height: 20px;
  }

  .type {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    display: inline-block;
  }

  .square, .circle {
    height: 14px;
    width: 14px;
    background: #2BE42F;
    border: 1px solid #009C03;
    display: inline-block;
    margin-right: 4px;

  }

  .circle {
    border-radius: 50%;
  }

  .keyAqi {
    width: 190px;
  }

  .one {
    text-align: center;
    padding: 10px 35px 10px;
  }

  .second .key,
  .third .key {
    width: 94px;
  }

  .second .value,
  .third .value {
    height: 28px;
    width: 94px;
  }

  .param .value {
    height: 28px;
    line-height: 28px;
  }

  .third {
    margin-left: 4px;
  }

  .secondLine {
    width: 61px;
  }

  .index {
    padding: 0 20px 10px;
  }

  .index .item {
    display: inline-block;
    font-size: 12px;
    color: #666666;
    margin-right: 30px;
    font-family: 'Microsoft YaHei'
  }

  .vocItem {
    width: 190px;
  }

  .triangle {
    height: 0;
    width: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 16px solid #FFB334;
    display: inline-block;
  }
</style>
