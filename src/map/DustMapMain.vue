<template>
  <div class="sense-map-content">
    <div id="sense_map"></div>
    <!--<layer-switch style="display: none"></layer-switch>-->
    <dust-pollution></dust-pollution>
    <history-handle style="display: none;"></history-handle>
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import DustPollution from '@/map/controls/DustPollutionTarget'
  import MapHandle from '@/map/controls/MapHandle'
  import HistoryHandle from '@/map/controls/HistoryHandle'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'DustMapMain',
    data () {
      return {
        maxZoom: 15
      };
    },
    mounted(){
      this.ready();
    },
    activated(){
      let lsScript = document.getElementsByTagName('script');
      for (let i = 0, length = lsScript.length; i < length; i++) {
        let value = lsScript[i];
        if (value && value.src) {
          if (value.src.indexOf('static/js/map/DistanceTool_min.js') > -1) {
            document.body.removeChild(value);
            break;
          }
        }
      }
      let el = document.createElement('script');
      el.src = 'static/js/map/DistanceTool_min.js';
      document.body.appendChild(el);
      let  map = this.map;
      this.map.centerAndZoom('廊坊', 12);
      mapStyle && this.map.setMapStyle(mapStyle);
      this.map.enableScrollWheelZoom();
      this.$parent.map = this.map;

//      bus.$emit('tilesDustLoaded', this.map);
//      bus.$emit('setLabelVisible',map.getZoom() >= this.maxZoom)
    },
    methods: {
      ready(){
        let t = this;
        let map = new BMap.Map('sense_map');
//        map.centerAndZoom('廊坊', 12);
//        mapStyle && map.setMapStyle(mapStyle);
//        map.enableScrollWheelZoom();
        this.map = map;
//        this.$parent.map = map;

//        bus.$emit('getDustMap', map);
        map.addEventListener('tilesloaded', function () {
          bus.$emit('tilesDustLoaded', map);
          bus.$emit('setLabelVisible',map.getZoom() >= t.maxZoom)
        });
      }
    },
    components: {LayerSwitch, DustPollution, MapHandle,HistoryHandle}
  };
</script>
<style scoped>
  .sense-map-content {
    height: calc(100% - 56px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #sense_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
