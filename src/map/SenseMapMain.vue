<template>
  <div class="sense-map-content">
    <div id="sense_map"></div>
    <!--<layer-switch class="layer-switch" style="display: none"></layer-switch>-->
    <sense-pollution></sense-pollution>
    <sense-switch :pollutionUrl="pollutionUrl" :charUrl="charUrl"></sense-switch>
    <!--<sense-map-handle></sense-map-handle>-->
    <!--<history-handle></history-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import SensePollution from '@/map/controls/SensePollutionTarget'
  import SenseSwitch from '@/map/controls/SenseSwitch'
  import SenseMapHandle from '@/map/controls/SenseMapHandle'
  import HistoryHandle from '@/map/controls/HistoryHandle'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'SenseMapMain',
    data () {
      return {
        pollutionUrl: 'http://lftdkfc.zhiscity.com/api/FcStation/GetFcStationList',
        charUrl: 'http://lftdkfc.zhiscity.com/api/FcStation/GetSingleStationInfo',
        hasLoaded: false,
        maxZoom: 15
      }
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
      map.centerAndZoom('廊坊', 12);
      map.enableScrollWheelZoom();
      mapStyle && map.setMapStyle(mapStyle);
      this.$parent.map = map;
//      bus.$emit('tilesSenseLoaded', map);
//      bus.$emit('setLabelVisible', map.getZoom() >= this.maxZoom);
    },
    methods: {
      ready(){
        let t = this;
        let map = new BMap.Map('sense_map');
//        map.centerAndZoom('廊坊', 12);
//        map.enableScrollWheelZoom();
//        mapStyle && map.setMapStyle(mapStyle);
        this.map = map;
//        this.$parent.map = map;

        map.addEventListener('tilesloaded', function () {
          bus.$emit('tilesSenseLoaded', map);
          bus.$emit('setLabelVisible', map.getZoom() >= t.maxZoom);
        });
      }
    },
    components: {LayerSwitch, SensePollution, SenseSwitch, SenseMapHandle, HistoryHandle}
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

  .layer-switch {
    bottom: 50px !important;
  }
</style>
