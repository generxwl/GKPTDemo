<template>
  <div class="enterprise-map-content">
    <div id="enterprise_map"></div>
    <!--<layer-switch style="display: none"></layer-switch>-->
    <enterprise-target></enterprise-target>
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import EnterpriseTarget from '@/map/controls/EnterpriseTarget'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'EnterpriseMap',
    data () {
      return {};
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
      map.centerAndZoom('廊坊', 10);
      map.enableScrollWheelZoom();
      mapStyle && map.setMapStyle(mapStyle);
      this.$parent.map = map;

//      bus.$emit('setEnterpriseMap', map);
    },
    methods:{
        ready(){
          let map = new BMap.Map('enterprise_map');
//          map.centerAndZoom('廊坊', 10);
//          map.enableScrollWheelZoom();
//          mapStyle && map.setMapStyle(mapStyle);
          this.map = map;
//          this.$parent.map = map;

          map.addEventListener('tilesloaded', function () {
            bus.$emit('setEnterpriseMap', map);
          });
        }
    },
    components:{LayerSwitch,EnterpriseTarget}
  };
</script>
<style scoped>
  .enterprise-map-content {
    height: calc(100% - 56px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #enterprise_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
