<template>
  <div class="grid-map-content">
    <div id="grid_map"></div>
    <bd-grid-layer></bd-grid-layer>
  </div>
</template>
<script>
  import BMap from 'BMap'
  import BdGridLayer from '@/map/overlayes/BdGridLayer'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'GridMapMain',
    data () {
      return {};
    },
    mounted(){
        this.ready();
    },
    methods:{
        ready(){
          let map = new BMap.Map('grid_map');
          map.centerAndZoom('廊坊', 8);
          map.enableScrollWheelZoom();
          this.map = map;

          bus.$emit('getGridMap', map);
          map.addEventListener('tilesloaded', function () {
            bus.$emit('tilesGridLoaded', map);
          });
        }
    },
    components:{BdGridLayer}
  };
</script>
<style scoped>
  .grid-map-content {
    height: calc(100% - 60px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #grid_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
