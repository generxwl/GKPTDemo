<script>
  import BMap from 'BMap'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'hello',
    render(){
    },
    data () {
      return {
        hotLayer: undefined,
        hasVisible:true,
        hotConfig: {
          radius: 20
        }
      };
    },
    created(){
    },
    mounted(){
      this.ready();
    },
    methods: {
      ready(){
        bus.$on('tilesSenseLoaded', this.loaded);
        bus.$on('setHotLayerVisible',this.hotLayerToggle);
      },
      loaded(map){
        if (!this.map) {
          this.map = map;
        }
        let points = [
          {"lng": 116.418261, "lat": 39.921984, "count": 50},
          {"lng": 116.423332, "lat": 39.916532, "count": 51},
          {"lng": 116.419787, "lat": 39.930658, "count": 15},
          {"lng": 116.418455, "lat": 39.920921, "count": 40},
          {"lng": 116.418843, "lat": 39.915516, "count": 100},
          {"lng": 116.42546, "lat": 39.918503, "count": 6},
          {"lng": 116.423289, "lat": 39.919989, "count": 18},
          {"lng": 116.418162, "lat": 39.915051, "count": 80},
          {"lng": 116.422039, "lat": 39.91782, "count": 11},
          {"lng": 116.41387, "lat": 39.917253, "count": 7},
          {"lng": 116.41773, "lat": 39.919426, "count": 42},
          {"lng": 116.421107, "lat": 39.916445, "count": 4},
          {"lng": 116.417521, "lat": 39.917943, "count": 27},
          {"lng": 116.419812, "lat": 39.920836, "count": 23},
          {"lng": 116.420682, "lat": 39.91463, "count": 60},
          {"lng": 116.415424, "lat": 39.924675, "count": 8},
          {"lng": 116.419242, "lat": 39.914509, "count": 15},
          {"lng": 116.422766, "lat": 39.921408, "count": 25},
          {"lng": 116.421674, "lat": 39.924396, "count": 21},
          {"lng": 116.427268, "lat": 39.92267, "count": 1},
          {"lng": 116.417721, "lat": 39.920034, "count": 51},
          {"lng": 116.412456, "lat": 39.92667, "count": 7},
          {"lng": 116.420432, "lat": 39.919114, "count": 11},
          {"lng": 116.425013, "lat": 39.921611, "count": 35},
          {"lng": 116.418733, "lat": 39.931037, "count": 22},
          {"lng": 116.419336, "lat": 39.931134, "count": 4},
          {"lng": 116.413557, "lat": 39.923254, "count": 5},
          {"lng": 116.418367, "lat": 39.92943, "count": 3},
          {"lng": 116.424312, "lat": 39.919621, "count": 100},
          {"lng": 116.423874, "lat": 39.919447, "count": 87},
          {"lng": 116.424225, "lat": 39.923091, "count": 32},
          {"lng": 116.417801, "lat": 39.921854, "count": 44},
          {"lng": 116.417129, "lat": 39.928227, "count": 21},
          {"lng": 116.426426, "lat": 39.922286, "count": 80},
          {"lng": 116.421597, "lat": 39.91948, "count": 32},
          {"lng": 116.423895, "lat": 39.920787, "count": 26},
          {"lng": 116.423563, "lat": 39.921197, "count": 17},
          {"lng": 116.417982, "lat": 39.922547, "count": 17},
          {"lng": 116.426126, "lat": 39.921938, "count": 25},
          {"lng": 116.42326, "lat": 39.915782, "count": 100},
          {"lng": 116.419239, "lat": 39.916759, "count": 39},
          {"lng": 116.417185, "lat": 39.929123, "count": 11},
          {"lng": 116.417237, "lat": 39.927518, "count": 9},
          {"lng": 116.417784, "lat": 39.915754, "count": 47},
          {"lng": 116.420193, "lat": 39.917061, "count": 52},
          {"lng": 116.422735, "lat": 39.915619, "count": 100},
          {"lng": 116.418495, "lat": 39.915958, "count": 46},
          {"lng": 116.416292, "lat": 39.931166, "count": 9},
          {"lng": 116.419916, "lat": 39.924055, "count": 8},
          {"lng": 116.42189, "lat": 39.921308, "count": 11},
          {"lng": 116.413765, "lat": 39.929376, "count": 3},
          {"lng": 116.418232, "lat": 39.920348, "count": 50},
          {"lng": 116.417554, "lat": 39.930511, "count": 15},
          {"lng": 116.418568, "lat": 39.918161, "count": 23},
          {"lng": 116.413461, "lat": 39.926306, "count": 3},
          {"lng": 116.42232, "lat": 39.92161, "count": 13},
          {"lng": 116.4174, "lat": 39.928616, "count": 6}];
        this.loadHotLayer(points);
      },
      loadHotLayer(data){
        if (!this.hotLayer) {
          this.hotLayer = new BMapLib.HeatmapOverlay(this.hotConfig);
          this.hotLayerToggle(this.hasVisible);
          this.map.addOverlay(this.hotLayer);
          this.hotLayer.setDataSet({data: data, max: 100});
        }
      },
      clearHotLayer(){
          if(this.hotLayer){
              this.map.removeOverlay(this.hotLayer);
          }
      },
      hotLayerToggle(hasVisible){
        if (this.hotLayer) {
          hasVisible ? this.hotLayer.show() : this.hotLayer.hide();
        }
      },
    }
  };
</script>
<style scoped>
</style>
