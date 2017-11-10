<template>
  <div class="monitor-map-content">
    <div id="monitor_map"></div>
    <!--<layer-switch style="display: none"></layer-switch>-->
    <pollution-target></pollution-target>
    <history-handle class="history-panel"></history-handle>
    <!--<main-layer-handle></main-layer-handle>-->
    <!--<map-handle ></map-handle>-->
  </div>
</template>
<script>
  import BMap from 'BMap'
  import LayerSwitch from '@/map/controls/LayerSwitch'
  import PollutionTarget from '@/map/controls/PollutionTarget'
  import MainLayerHandle from '@/map/controls/MainLayerHandle'
  import MapHandle from '@/map/controls/MapHandle'
  import HistoryHandle from '@/map/controls/HistoryHandle'
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
      this.event();
    },
    methods: {
      ready: function () {
        let map = new BMap.Map('monitor_map');
        map.centerAndZoom('廊坊', 10);
        map.enableScrollWheelZoom();
        mapStyle && map.setMapStyle(mapStyle);
        this.map = map;
        this.$parent.map = map;
//        (new BMapLib.DistanceTool(this.map, {lineStroke: 2})).open();

        //初始化地图
        map.addEventListener('tilesloaded', function () {
            bus.$emit('setMainMap', map);
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
    components: {LayerSwitch, PollutionTarget, MapHandle,MainLayerHandle,HistoryHandle}//GridMap
  }

</script>
<style scoped>
  .monitor-map-content {
    height: calc(100% - 56px);
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

  .history-panel{
    display: none;
  }

</style>
