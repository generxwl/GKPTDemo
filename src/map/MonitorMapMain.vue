<template>
  <div class="monitor-map-content">
    <div id="monitor_map"></div>
    <layer-switch></layer-switch>
    <pollution-target></pollution-target>
    <!--<main-layer-handle></main-layer-handle>-->
    <!--<map-handle></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import PollutionTarget from '@/map/controls/PollutionTarget'
  import MainLayerHandle from '@/map/controls/MainLayerHandle'
  import MapHandle from '@/map/controls/MapHandle'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'MonitorMapMain',
    data() {
      return {
        name: 'DR',
        map: undefined
      }
    },
    created() {
    },
    mounted() {
      this.ready();
      this.event();
    },
    methods: {
      ready: function () {
        let map = new BMap.Map('monitor_map');
        map.centerAndZoom('廊坊', 10);
        map.enableScrollWheelZoom();
        mapStyle && map.setMapStyle(mapStyle);
        this.map = map;

        //初始化地图
        map.addEventListener('tilesloaded', function () {
          bus.$emit('tilesLoaded', map);
        });
      },
      event() {
        bus.$on('setCenter', this.setCenter);
      },
      setCenter(geo) {
        geo = typeof geo === 'string' ? JSON.parse(geo) : geo;
        if (geo && this.map) {
          let pt = new BMap.Point(geo.lng, geo.lat);
          this.map.panTo(pt, false);
        }
      }
    },
    components: {LayerSwitch, PollutionTarget, MapHandle,MainLayerHandle}//GridMap
  }

</script>
<style scoped>
  .monitor-map-content {
    height: calc(100% - 50px);
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  #monitor_map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL {
    display: none;
  }

</style>
