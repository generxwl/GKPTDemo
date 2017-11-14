<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import Coordtransform from 'coordtransform'
  import RequestHandle from '@/request'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'BattleHandle',
    ready(){
    },
    data () {
      return {
        type: 'MONITOR',
        valueField: 'AQI',
        displayField: 'pointname',
        keyField: 'citygid',
        datas: [{
          type: 'SENSE',
          valueField: 'AQI',
          displayField: 'pointname',
          keyField: 'citygid'
        }, {
          type: 'DUST',
          valueField: 'PM10',
          displayField: 'name',
          keyField: 'deviceid'
        }, {
          type: 'ENTERPRISE',
          valueField: 'smokeStatus',
          displayField: 'psname',
          keyField: 'pscode'
        }, {
          type: 'VIDEO',
          valueField: 'AQI',
          displayField: 'pointname',
          keyField: 'citygid'
        }],
        lsLabelDefaultOverlay: [],
        lsMarkerDefaultOverlay: [],
        lsRedLabels: [],
        lsMarkerOverlay: []
      };
    },
    created(){
    },
    mounted(){
      this.initEvent();
    },
    methods: {
      init(){
      },
      initEvent(){
        bus.$once('setButtleMap', this.setMap);
        bus.$on('targetPollution', this.refreshMap);
      },
      setMap(map){
        let t = this;
//        map && (this.map = map);
        map && (this.map = map, this.request());
        setTimeout(function () {
          let checkedItem = t.datas[0];
          t.displayField = checkedItem.displayField;
          t.valueField = checkedItem.valueField;
          t.type = checkedItem.type;
          t.keyField = checkedItem.keyField;
          t.request();
        }, 500);
      },
      refreshMap(type){
        let t = this;
        let checkedItem = t.datas[type];
        t.displayField = checkedItem.displayField;
        t.valueField = checkedItem.valueField;
        t.type = checkedItem.type;
        t.keyField = checkedItem.keyField;
        (this.valueField && this.displayField && this.keyField) && this.request();
      },

      //发送数据请求
      request(){
        let t = this;
        this.setAttributeKey();
        let url = undefined;
        switch (t.type.toUpperCase()) {
          case 'MONITOR':
            url = RequestHandle.getRequestUrl('MONPOLLUTION');
            break;
          case 'SENSE':
            url = RequestHandle.getRequestUrl('SENSEBATTLE');
            break;
          case 'DUST':
            url = RequestHandle.getRequestUrl('DUSTBATTLE');
            break;
          case 'ENTERPRISE':
            url = RequestHandle.getRequestUrl('ENTREPRISEBATTLE');
            break;
          case 'VIDEO':
            url = RequestHandle.getRequestUrl('VOCPOLLUTION');
            break;
        }
        if (url) {
          RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
//            if (result.status === 1) {
            t.data = result.obj;
            t.render(t.data);
//            }
          }, function (ex) {
            console.error(ex);
          });
        }
      },

      //渲染覆盖物
      render(data){
        if (data) {
          let t = this;
          this.clearRenderOverlay();
          if (this.type.toUpperCase() === 'MONITOR') {
            data.forEach(function (v, i) {
              let value = v[t.valueField.toLowerCase()] || 0;
              let unit = undefined;
              let index = -1;
              let hasRed = false;

              switch (t.valueField.toUpperCase()) {
                case 'AQI':
                  unit = '';
                  index = getAQILevelIndex(value);
                  hasRed = index > 3;
                  break;
                case 'PM25':
                  unit = 'ug/m3';
                  index = getPM25LevelIndex(value);
                  hasRed = index > 3;
                  break;
                case 'PM10':
                  unit = 'ug/m3';
                  index = getPM10LevelIndex(value);
                  hasRed = index > 3;
                  break;
                case 'SO2':
                  unit = 'ug/m3';
                  index = getSO2LevelIndex(value);
                  hasRed = index > 3;
                  break;
                case 'NO2':
                  unit = 'ug/m3';
                  index = getNO2LevelIndex(value);
                  hasRed = index > 3;
                  break;
                case 'O3':
                  unit = 'ug/m3';
                  index = getO3LevelIndex(value);
                  hasRed = index > 3;
                  break;
                case 'CO':
                  unit = 'mg/m3';
                  index = getCOLevelIndex(value);
                  hasRed = index > 3;
                  break;
                case 'INDEX':
                  unit = '';
                  index = getComplexIndex(value);
                  hasRed = index > 3;
                  break;
                case 'TEMP':
                  unit = '℃';
                  index = getTempLevelIndex(value);
                  break;
                case 'HUMI':
                  unit = '%';
                  index = getHumiLevelIndex(value);
                  break;
                case 'WS':
                  unit = '级';
                  index = getWindLevelIndex(value);
                  break;
                case 'WD':
                  unit = '°';
                  break;
                case 'SMOKE':
                  value = value ? '--' : value;
                  break;
              }

              let lat = v.latitude || v.lat;
              let lng = v.longitude || v.lng;

              let point = new BMap.Point(lng, lat);
              let opts = {
                position: point,
                offset: new BMap.Size(-15, -15)
              };
              //创建标注
              let bgcolor = getColorByIndex(index) || '#333';
              let code = v[t.keyField];
              let label = new BMap.Label(value + '<div class="arrow" style="width: 0;  height: 0; border-left: 8px solid transparent; border-top: 8px solid; border-right: 8px solid transparent; color:' + bgcolor + '; position: absolute;  margin-top:-2px;margin-left:8px  " ></div>', opts)  // 创建文本标注对象
              label.attributes = {ptId: code};
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

              label && (t.lsMarkerDefaultOverlay.push(label), t.map.addOverlay(label));

              let labelName = t.createLabelName(v, point);
              labelName && (t.lsLabelDefaultOverlay.push(labelName), t.map.addOverlay(labelName));

              hasRed && t.showRedLabels(point);
            });
          }
          else {
            data.forEach(function (v, i) {
              let lat = v.latitude || v.lat;
              let lng = v.longitude || v.lng;

              let point = new BMap.Point(lng, lat);
              let opts = {
                position: point,
                offset: new BMap.Size(-15, -15)
              };
              let marker = t.createMarker(point, v);
              marker && (t.lsMarkerOverlay.push(marker), t.map.addOverlay(marker));
            });
          }
        }
      },

      //创建标注
      createLabelName(v, p){
        let nametip = v[this.displayField] || '';
        let opts_tip = {
          position: p,
          offset: new BMap.Size(-nametip.length * 6, 12)
        };
        let label_tip = new BMap.Label(nametip, opts_tip);
        label_tip.setStyle({
          color: 'black',
          background: 'rgba(255,255,255,0.8)',
          fontSize: '12px',
          border: '1px solid #999',
          width: 'auto',
          textAlign: 'center',
          height: '18px',
          lineHeight: '18px'
        });
        return label_tip;
      },

      //加载预警覆盖物
      showRedLabels(point){
        let elContext = '<div class="pulse"></div><div class="pulse1"></div>';
        let opts = {
          position: point,
          offset: new BMap.Size(-30, -20)
        };
        let labelRed = new BMap.Label(elContext, opts);
        labelRed.setStyle({
          border: 'none',
          background: 'none',
          height: '60px',
          width: '60px',
        });
        this.lsRedLabels.push(labelRed);
        this.map.addOverlay(labelRed);
      },

      //根据类型获取属性字段
      setAttributeKey(){
        let t = this;
        this.datas.forEach(function (v) {
          if (v.type.toUpperCase() === t.type.toUpperCase()) {
            t.valueField = v.valueField;
            t.displayField = v.displayField;
            t.keyField = v.keyField;
            return '';
          }
        })
      },

      //创建Marker
      createMarker(pt, value){
        let marker = undefined;
        let level = this.getMarkerState(value) - 1;
        let iconName = this.getIconName(this.type, level);
        if (pt) {
          let conPoint = this.wgsPointToBd(pt);
          let imgUrl = this.getMarkerIcon(iconName);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
          marker = new BMap.Marker(conPoint, {
            //marker = new BMap.Marker((lyType.toUpperCase() === 'LAYER_GS') ? pt:conPoint, {
            icon: icon,
            offset: new BMap.Size(0, 0)
          });
        }
        return marker;
      },

      //获取Marker状态
      getMarkerState(data){
        let value = data[this.valueField.toLocaleLowerCase()];
        let level = 0;
        switch (this.type.toUpperCase()) {
          case 'SENSE':
              console.log(this.valueField + '-' + value);
            level = getAQILevelIndex(value);
            break;
          case 'DUST':
            level = getPM10LevelIndex(value);
            break;
          case 'ENTERPRISE':
            level = data['isOnline'] ? (value ? 4 : 1) : 0;
            break;
          default:
            level = 0;
            break;
        }
        return level;
      },

      //获取Icon名称
      getIconName(ptType, level){
        //console.log(level)
        let iconName = undefined;
        switch (ptType.toUpperCase()) {
          case 'SENSE':
            iconName = 'cgq-lcs-';
            break;
          case 'DUST':
            iconName = 'gd-';
            break;
          case 'ENTERPRISE':
            iconName = 'qy-';
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

      //清除Overlay
      clearRenderOverlay(){
        let t = this;
        this.lsMarkerOverlay.forEach(v => (t.map.removeOverlay(v)));
//        this.lsLabelDefaultOverlay.forEach(v => (t.map.removeOverlay(v)));
//        this.lsRedLabels.forEach(v => (t.map.removeOverlay(v)));
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
    }
  };
</script>
<style scoped>
</style>
