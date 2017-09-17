<script>
  import BMap from 'BMap'
  import RequestHandle from '@/request/'
  import {bus} from '@/js/bus'
  export default {
    name: 'MainHandle',
    render(){
    },
    data () {
      return {
        lsMarkers: []
      };
    },
    created(){
      bus.$once('setMainMap', this.setMap);
      bus.$on('targetLayer', this.targetClick);
    },
    mounted(){
    },
    methods: {
      setMap(map){
        this.map = map;
      },
      targetClick(type, hasVisible){
        //请求接口触发
        hasVisible ? this.loadMarker() : this.removeMarkerByList(this.getMarkerByType(type));
      },
      loadMarker(data, type){
        this.removeMarkerByList(this.getMarkerByType(type));
        let t = this;
        for (let i = 0, length = data.length; i < length; i++) {
          let value = data[i];
          let pt = new BMap.Point(value.lng, value.lat);
          let marker = t.getMarker(pt);
          marker && (t.map.addOverlay(marker), t.markers.push({marker: marker, type: type}), marker.addEventListener('click', function (e) {

          }));
        }
      },
      //获取图标对象
      getMarker(pt, type){
        let marker = undefined;
        if (pt && type) {
          let imgUrl = this.getMarkerIcon(type);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
          marker = new BMap.Marker(pt, {icon: icon, offset: new BMap.Size(8, -16)});
        }
        return marker;
      },
      getMarkerIcon(type){
        let path = undefined;
        switch (type) {
          case 'CGQ-G':
            path = '/static/imgs/main/cgq-g.png';
            break;
          case 'CGQ-O':
            path = '/static/imgs/main/cgq-o.png';
            break;
          case 'CGQ-Y':
            path = '/static/imgs/main/cgq-y.png';
            break;
          case 'CGQ-V':
            path = '/static/imgs/main/cgq-v.png';
            break;
          case 'CGQ-M':
            path = '/static/imgs/main/cgq-m.png';
            break;
          case 'CGQ-R':
            path = '/static/imgs/main/cgq-r.png';
            break;
          case 'CGQ-NG':
            path = '/static/imgs/main/cgq-ng.png';
            break;
          case 'GD-G':
            path = '/static/imgs/main/gd-g.png';
            break;
          case 'GD-O':
            path = '/static/imgs/main/gd-o.png';
            break;
          case 'GD-Y':
            path = '/static/imgs/main/gd-y.png';
            break;
          case 'GD-V':
            path = '/static/imgs/main/gd-v.png';
            break;
          case 'GD-M':
            path = '/static/imgs/main/gd-m.png';
            break;
          case 'GD-R':
            path = '/static/imgs/main/gd-r.png';
            break;
          case 'GD-NG':
            path = '/static/imgs/main/gd-ng.png';
            break;
          case 'GS-G':
            path = '/static/imgs/main/gs-g.png';
            break;
          case 'GS-O':
            path = '/static/imgs/main/gs-o.png';
            break;
          case 'GS-Y':
            path = '/static/imgs/main/gs-y.png';
            break;
          case 'GS-V':
            path = '/static/imgs/main/gs-v.png';
            break;
          case 'GS-M':
            path = '/static/imgs/main/gs-m.png';
            break;
          case 'GS-R':
            path = '/static/imgs/main/gs-r.png';
            break;
          case 'GS-NG':
            path = '/static/imgs/main/gs-ng.png';
            break;
          case 'HWC-NG':
            path = '/static/imgs/main/hwc-ng.png';
            break;
          case 'HWC-G':
            path = '/static/imgs/main/hwc-g.png';
            break;
          case 'JYZ-G':
            path = '/static/imgs/main/jyz-g.png';
            break;
          case 'JYZ-NG':
            path = '/static/imgs/main/jyz-ng.png';
            break;
          case 'JYZ-R':
            path = '/static/imgs/main/jyz-r.png';
            break;
          case 'QY-G':
            path = '/static/imgs/main/qy-g.png';
            break;
          case 'QY-NG':
            path = '/static/imgs/main/qy-ng.png';
            break;
          case 'QY-R':
            path = '/static/imgs/main/qy-r.png';
            break;
          case 'SP-G':
            path = '/static/imgs/main/sp-g.png';
            break;
          case 'SP-NG':
            path = '/static/imgs/main/sp-ng.png';
            break;
          case 'ZTC-G':
            path = '/static/imgs/main/ztc-g.png';
            break;
          case 'ZTC-NG':
            path = '/static/imgs/main/ztc-ng.png';
            break;
        }
      },
      getMarkerByType(type){
        let rtValue = [];
        for (let i = 0, length = this.lsMarkers.length; i < length; i++) {
          let item = this.lsMarker.push(i);
          item.type === type && rtValue.push(item);
        }
        return rtValue;
      },
      removeMarkerByList(ls){
        for (let i = 0, length = ls.length; i < length; i++) {
          this.map.removeOverlay(this.lsMarker[i]);
        }
      },
      clearMarkers(){
        for (let i = 0, length = this.lsMarkers.length; i < length; i++) {
          this.map.removeOverlay(this.lsMarker[i]);
        }
      }
    }
  };
</script>
<style scoped>
</style>
