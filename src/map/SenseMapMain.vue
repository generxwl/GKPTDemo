<template>
  <div class="sense-map-content">
    <div id="sense_map"></div>
    <layer-switch></layer-switch>
    <sense-pollution></sense-pollution>
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import SensePollution from '@/map/controls/SensePollutionTarget'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'SenseMapMain',
    data () {
      return {};
    },
    mounted(){
        this.ready();
    },
    methods:{
        ready(){
          let map = new BMap.Map('sense_map');
          map.centerAndZoom('廊坊', 10);
          map.enableScrollWheelZoom();
          this.map = map;

          bus.$emit('getSenseMap', map);
          map.addEventListener('tilesloaded', function () {
            bus.$emit('tilesSenseLoaded', map);
          });
        }
    },
    components:{LayerSwitch,SensePollution}
  };
</script>
<style scoped>
  .sense-map-content {
    height: calc(100% - 60px);
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
