<template>
  <div class="emergency-map-content">
    <div id="emergency_map"></div>
    <emergency-handle></emergency-handle>
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import MainLayerHandle from '@/map/controls/MainLayerHandle'
  import MapHandle from '@/map/controls/MapHandle'
  import EmergencyHandle from '@/map/handle/EmergencyHandle'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'EmergencyMap',
    data () {
      return {
        zoom:13
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

      let map = this.map;
      this.$parent.map = map;
      map.centerAndZoom('廊坊', 10);
      map.enableScrollWheelZoom();
      mapStyle && map.setMapStyle(mapStyle);

    //bus.$emit('setEmergencyMap', map);
    },
    methods:{
        ready(){
          let t = this;
          let map = new BMap.Map('emergency_map');
//          map.centerAndZoom('廊坊', 10);
//          map.enableScrollWheelZoom();
//          mapStyle && map.setMapStyle(mapStyle);
          t.map = map;
//          this.$parent.map = map;
          map.addEventListener('tilesloaded', function () {
            bus.$emit('setEmergencyMap', map);
            //bus.$emit('setMainMarkerLabel',map.getZoom() >= t.zoom);
          });
        }
    },
    components:{EmergencyHandle}
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
