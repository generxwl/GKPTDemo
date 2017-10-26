<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import RequestHandle from '@/request'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'BattleHandle',
    ready(){
    },
    data () {
      return {
        valueField: 'AQI',
        displayField: 'stationname',
        keyField: '',
        lsLabelOverlay: [],
        lsMarkerOverlay: []
      };
    },
    methods: {
      init(){
      },
      initEvent(){
        bus.$once('setButtleMap', this.setMap);
      },
      setMap(map){
        map && (this.map = map, this.request());
      },
      request(urlType){
        let t = this;
        let url = RequestHandle.getRequestUrl('MONPOLLUTION');
        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
          if (result.status === 0) {
            t.data = result.obj;
            t.render(t.getPointByType(t.ptType), type);
          }
        }, function (ex) {
          console.error(ex);
        });
      },
      render(data){
        if (data) {
          let t = this;
          this.clearRenderOverlay();

          data.forEach(function (v, i) {
            let name = v[t.displayField] || undefined;
            let value = v[t.displayValue] || -1;
            let index = -1;

            switch (t.displayField.toUpperCase()) {
              case 'AQI':
                unit = '';
                index = getAQILevelIndex(value);
                break;
              case 'PM2.5':
                unit = 'ug/m3';
                index = getPM25LevelIndex(value);
                break;
              case 'PM10':
                unit = 'ug/m3';
                index = getPM10LevelIndex(value);
                break;
              case 'SO2':
                unit = 'ug/m3';
                index = getSO2LevelIndex(value);
                break;
              case 'NO2':
                unit = 'ug/m3';
                index = getNO2LevelIndex(value);
                break;
              case 'O3':
                unit = 'ug/m3';
                index = getO3LevelIndex(value);
                break;
              case 'CO':
                unit = 'mg/m3';
                index = getCOLevelIndex(value);
                break;
              case 'INDEX':
                unit = '';
                index = getComplexIndex(value);
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
                break
            }

            let lat = v.latitude;
            let lng = v.longitude;

            let point = new BMap.Point(lng, lat);
            let opts = {
              position: point,
              offset: new BMap.Size(-15, -15)
            };
            //创建标注
            let bgcolor = getColorByIndex(index);
            let code = v[keyField];
            let label = new BMap.Label(value + '<div class="arrow" style="width: 0;  height: 0; border-left: 8px solid transparent; border-top: 8px solid; border-right: 8px solid transparent; color:' + bgcolor + '; position: absolute;  margin-top:-2px;margin-left:8px  " ></div>', opts)  // 创建文本标注对象
            label.attributes = {ptId: code};

            label && (t.lsMarkerOverlay.push(label), t.map.addOverlay(label));

            let labelName = t.createLabelName(v, point);
            labelName && (t.lsLabelOverlay.push(labelName), t.map.addOverlay(labelName));
          });
        }
      },

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

      //清除Overlay
      clearRenderOverlay(){
        let t = this;
        this.lsMarkerOverlay.forEach(v => (t.map.removeOverlay(v)));
        this.lsLabelOverlay.forEach(v => (t.map.removeOverlay(v)));
      }
    }
  };
</script>
<style scoped>
</style>
