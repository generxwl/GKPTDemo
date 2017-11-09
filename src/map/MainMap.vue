<template>
  <div class="main-map-content">
    <div id="main_map"></div>
    <!--<layer-switch style="display: none"></layer-switch>-->
    <main-layer-handle></main-layer-handle>
    <!--<map-handle ></map-handle>-->
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
        zoom: 13,
        map: undefined
      };
    },
    mounted(){
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
      this.ready();
    },
    methods: {
      ready(){
        let map = new BMap.Map('main_map');
        map.centerAndZoom('廊坊', 10);
        map.enableScrollWheelZoom();
        mapStyle && map.setMapStyle(mapStyle);
        this.map = map;
        this.$parent.map = map;
        let t = this;

//        (new BMapLib.DistanceTool(this.map, {lineStroke: 12})).open();

        map.addEventListener('tilesloaded', function () {
          bus.$emit('setMainMap', map);
//          bus.$emit('setToolMap',map);
//            bus.$emit('setMainMarkerLabel',map.getZoom() >= t.zoom);//setMainMarkerLabel
          bus.$emit('setMainValueLabel', map.getZoom() >= t.zoom);//setMainValueLabel
        });
      }
    },
    components: {LayerSwitch, MainLayerHandle, MapHandle}
  };
</script>
<style scoped>
  .main-map-content {
    height: calc(100% - 56px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #main_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
