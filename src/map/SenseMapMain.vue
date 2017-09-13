<template>
  <div class="sense-map-content">
    <div id="sense_map"></div>
    <layer-switch class="layer-switch"></layer-switch>
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
        hasLoaded: false
      }
    },
    mounted(){
      this.ready();
    },
    methods: {
      ready(){
          let t= this;
        let map = new BMap.Map('sense_map');
        map.centerAndZoom('廊坊', 10);
        map.enableScrollWheelZoom();
        this.map = map;

        bus.$emit('getSenseMap', map);
        map.addEventListener('tilesloaded', function () {
            if(!t.hasLoaded) {
              bus.$emit('tilesSenseLoaded', map);
              t.hasLoaded = true;
            }
        });
      }
    },
    components: {LayerSwitch, SensePollution, SenseSwitch, SenseMapHandle, HistoryHandle}
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

  .layer-switch {
    bottom: 50px !important;
  }
</style>
