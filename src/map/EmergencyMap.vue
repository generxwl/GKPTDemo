<template>
  <div class="emergency-map-content">
    <div id="emergency_map"></div>
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import MainLayerHandle from '@/map/controls/MainLayerHandle'
  import MapHandle from '@/map/controls/MapHandle'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'MainMap',
    data () {
      return {
        zoom:13
      };
    },
    mounted(){
        this.ready();
    },
    methods:{
        ready(){
          let map = new BMap.Map('main_map');
          map.centerAndZoom('廊坊', 10);
          map.enableScrollWheelZoom();
          mapStyle && map.setMapStyle(mapStyle);
          this.map = map;
          let t = this;

          map.addEventListener('tilesloaded', function () {
            bus.$emit('setEmergencyMap', map);
            //bus.$emit('setMainMarkerLabel',map.getZoom() >= t.zoom);
          });
        }
    },
    components:{}
  };
</script>
<style scoped>
  .emergency-map-content {
    height: calc(100% - 56px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #emergency_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
