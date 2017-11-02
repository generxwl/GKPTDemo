<template>
  <div class="video-map-content">
    <div id="video_map"></div>
    <layer-switch></layer-switch>
    <scatter-handle></scatter-handle>
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import ScatterHandle from '@/map/handle/ScatterHandle'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'ScatterMap',
    data () {
      return {};
    },
    mounted(){
        this.ready();
    },
    methods:{
        ready(){
          let map = new BMap.Map('video_map');
          map.centerAndZoom('廊坊', 10);
          map.enableScrollWheelZoom();
          mapStyle && map.setMapStyle(mapStyle);
          this.map = map;

          map.addEventListener('tilesloaded', function () {
            bus.$emit('setScatterMap', map);
          });
        }
    },
    components:{LayerSwitch,ScatterHandle}
  };
</script>
<style scoped>
  .video-map-content {
    height: calc(100% - 56px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #video_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
