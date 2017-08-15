<script>
  import BMap from 'BMap'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'MarkerLayer',
    render(){
    },
    data () {
      return {
        markers: [],
        hasVisible: false,
        infoWindowConfig: {
          width: 250,     // 信息窗口宽度
          height: 80,     // 信息窗口高度
          title: '信息', // 信息窗口标题
          enableMessage: false//设置允许信息窗发送短息
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
        bus.$on('setMarkerVisible', this.markerLayerToggle);
      },
      loaded(map){
        if (!this.map) {
          this.map = map;
        }
        let points = {
          rows: [
            {"lng": 116.418261, "lat": 39.921984, "count": 10},
            {"lng": 116.423332, "lat": 39.916532, "count": 20},
            {"lng": 116.419787, "lat": 39.930658, "count": 50},
            {"lng": 116.418455, "lat": 39.920921, "count": 30},
            {"lng": 116.418843, "lat": 39.915516, "count": 80},
            {"lng": 116.419843, "lat": 39.915516, "count": 60},
            {"lng": 116.416843, "lat": 39.915516, "count": 100}]
        };
        this.loadMarkerLayer(points);
      },
      loadMarkerLayer(data){
        let t = this;
        let lsMarkers = data.rows;
        for (let i = 0, length = lsMarkers.length; i < length; i++) {
          let value = lsMarkers[i];
          let pt = new BMap.Point(value.lng, value.lat);
          let v = value.count;
          let marker = t.getMarker(pt, v);
          marker && ((t.hasVisible ? marker.show() : marker.hide()), t.map.addOverlay(marker), t.markers.push(marker), marker.addEventListener('click', function (e) {
            t.markerClick(v.toString(), e);
          }));
        }
      },
      markerClick(content, e){
        let p = e.target;
        let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        let infoWindow = new BMap.InfoWindow('<div>' + content + '</div>', this.infoWindowConfig);  // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, point); //开启信息窗口
      },
      getMarker(pt, value){
        let marker = undefined;
        if (pt && value) {
          let imgUrl = this.getImgUrl(value);
          console.log(imgUrl);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(32, 32));
          marker = new BMap.Marker(pt, {icon: icon, offset: new BMap.Size(8, -16)});
        }
        return marker;
      },
      getImgUrl(value){
        let imgPath = undefined;
        if (value > 0 && value <= 10) {
          imgPath = '/static/imgs/sense/green.png';
        }
        else if (value > 10 && value <= 20) {
          imgPath = '/static/imgs/sense/orange.png';
        }
        else if (value > 20 && value <= 40) {
          imgPath = '/static/imgs/sense/yellow.png';
        }
        else if (value > 40 && value <= 60) {
          imgPath = '/static/imgs/sense/maroon.png';
        }
        else if (value > 60 && value <= 80) {
          imgPath = '/static/imgs/sense/violet.png';
        }
        else if (value > 80) {
          imgPath = '/static/imgs/sense/red.png';
        }
        return imgPath;
      },
      setInfoWindow()
      {
      },
      clearMarker(){
        for (let i = 0, length = this.markers.length; i < length; i++) {
          this.map.removeOverlay(this.markers[i]);
        }
      },
      markerLayerToggle(hasVisible)
      {
        if (this.markers.length) {
          for (let i = 0, length = this.markers.length; i < length; i++) {
            let value = this.markers[i];
            hasVisible ? value.show() : value.hide();
          }
        }
      }
      ,
    }
  }
  ;
</script>
<style scoped>
</style>
