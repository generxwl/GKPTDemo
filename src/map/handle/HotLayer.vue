<script>
  import BMap from 'BMap'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'hello',
    render(){
    },
    data () {
      return {
        hotLayer: undefined,
        hasVisible: true,
        checkedName: 'AQI',
        data: [],
        hotConfig: {
          radius: 20
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
      ready(){
        //bus.$on('tilesSenseLoaded', this.getMap);
        bus.$on('loadHotLayer', this.loadHotLayer);
        bus.$on('setHotLayerVisible', this.hotLayerToggle);
        bus.$on('hotLayerTarget', this.pollutionTarget);
        bus.$on('refreshHotLayer',this.refreshLayer);
      },
      getMap(map){
        if (!this.map) {
          this.map = map;
        }
      }, loadHotLayer(map, data){
        console.log('hot'+this.hasVisible);
        if (!this.data.length) {
          this.data = data;
        }
        this.map = map;
        let dt = this.getPollutionByType(this.checkedName);
        if (!this.hotLayer) {
          this.hotLayer = new BMapLib.HeatmapOverlay(this.hotConfig);
          this.map.addOverlay(this.hotLayer);
          this.hotLayer.setDataSet({data: dt, max: (this.getMaxPollutionByType() || 200)});
          this.hasVisible ? this.hotLayer.show() : this.hotLayer.hide();
        }
      }, pollutionTarget(type){
        console.log(type);
        this.checkedName = type;
        let dt = this.getPollutionByType(type);
        if (dt.length) {
          this.refreshLayer(dt);
        }
      }, refreshLayer(data){
        if (this.hotLayer) {
          this.clearHotLayer();
          this.loadHotLayer(this.map, data);
        }
      },
      getPollutionByType(type){
        let rtValue = [];
        if (this.data) {
          for (let i = 0, length = this.data.length; i < length; i++) {
            let item = this.data[i];
            let obj = {'lng': item.longitude, 'lat': item.latitude, 'count': item[type.toLowerCase()]};
            rtValue.push(obj);
          }
        }
        return rtValue;
      },
      clearHotLayer(){
        if (this.hotLayer) {
          this.map.removeOverlay(this.hotLayer);
          this.hotLayer = undefined;
        }
      },
      hotLayerToggle(hasVisible){
        this.hasVisible = hasVisible;
        if (this.hotLayer) {
          hasVisible ? this.hotLayer.show() : this.hotLayer.hide();
        }
      },
      getMaxPollutionByType(){
          let rtValue = undefined;
          if(this.checkedName){
              switch(this.checkedName.toUpperCase()){
                case 'AQI':
                  rtValue = 200;
                    break;
                case 'PM25':
                  rtValue = 150;
                  break;
                case 'PM10':
                  rtValue = 350;
                  break;
                case 'SO2':
                  rtValue = 800;
                  break;
                case 'NO2':
                  rtValue = 280;
                  break;
                case 'CO':
                  rtValue = 24;
                  break;
                case 'O3':
                  rtValue = 265;
                  break;
              }
          }
          console.log(this.checkedName);
          return rtValue;
      }
    }
  };
</script>
<style scoped>
</style>
