<template>
  <div class="video-map-content">
    <div id="video_map"></div>
    <layer-switch></layer-switch>
    <video-handle style="display: none"></video-handle>
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import VideoHandle from '@/map/controls/VideoTarget'
  import MapHandle from '@/map/controls/MapHandle'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'VideoMap',
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
            bus.$emit('setVideoMap', map);
          });
        }
    },
    components:{LayerSwitch,VideoHandle,MapHandle}
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
