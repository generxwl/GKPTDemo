<template>
  <div class="static-map-content">
    <div id="static_map"></div>
    <layer-switch style="display: none"></layer-switch>
    <static-dust-target></static-dust-target>
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import StaticDustTarget from '@/map/controls/StaticDustTarget'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'StaticDustMap',
    data () {
      return {};
    },
    mounted(){
        this.ready();
    },
    methods:{
        ready(){
          let map = new BMap.Map('static_map');
          map.centerAndZoom('廊坊', 10);
          map.enableScrollWheelZoom();
          mapStyle && map.setMapStyle(mapStyle);
          this.map = map;

          map.addEventListener('tilesloaded', function () {
            bus.$emit('setStaticMap', map);
          });
        }
    },
    components:{LayerSwitch,StaticDustTarget}
  };
</script>
<style scoped>
  .static-map-content {
    height: calc(100% - 56px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #static_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
