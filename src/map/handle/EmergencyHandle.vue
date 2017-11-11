<script>
  import Coordtransform from 'coordtransform'
  import RequestHandle from '@/request/'
  import {bus} from '@/js/bus'
  export default {
    name: 'EmergencyHandle',
    render(){
    },
    data () {
      return {
        videoType: '',
        map: undefined,
        lsMarkers: []
      };
    },
    created(){
      bus.$once('setEmergencyMap', this.setMap);
    },
    mounted(){
    },
    methods: {
      setMap(map){
        !this.map && ((this.map = map), this.map && this.loadEmergencyData());
      },
      loadEmergencyData(){
        this.requestEmergencyData();
      },
      refreshEmergency(attributes, lng, lat){
        let point = new BMap.Point(lng, lat);
        let transPoint = this.wgsPointToBd(point);
        this.eventCameraWindow(attributes, transPoint.lng, transPoint.lat);
      },
      requestEmergencyData(){
        let t = this;
        let url = RequestHandle.getRequestUrl('EMERGENCY');
        let params = {url: url, type: 'GET', pms: null};
        RequestHandle.request(params, function (result) {
          if (result.status) {
            t.renderMarker(result.obj);
          }
        }, function (e) {
          console.error(e);
        });
      },
      renderMarker(data){
        if (data && data.length) {
          //数据
//          bus.$emit('loadScatterData', data);
          let t = this;
          for (let i = 0, length = data.length; i < length; i++) {
            let value = data[i];
            let companyName = value.companyname;
            let pt = new BMap.Point(value.longitude, value.latitude);
            let marker = this.getMarker(pt, value);
            if(marker) {
              marker.attributes = value;
              let label = new BMap.Label(companyName || '');
              label.setStyle({
                display: 'none',
                border: 'none',
                color: '#fff',
                background: 'none',
                fontSize: '14px',
                fontFamily: 'Microsoft YaHei'
              });
              label.setOffset(new BMap.Size(-(companyName.length * 4), 15));
              marker && (this.map.addOverlay(marker), marker.setLabel(label), this.lsMarkers.push(marker), marker.addEventListener('click', function (e) {
                t.showCameraWindow(e);
              }));
            }
          }
        }
      },
      showCameraWindow(e){
        let t = this;
        let tg = e.target;
        this.eventCameraWindow(tg.attributes, tg.getPosition().lng, tg.getPosition().lat);
      },
      setCameraWindow(data){
        let url = 'static/emergency/.html?id=' + (data['id'] || '');
        return url ? '<iframe style="height:auto;width:100%;border:none;" src="' + url + '"></iframe>' : undefined;
      },
      //获取图标对象
      getMarker(pt, value){
        let marker = undefined;
        if (pt && value) {
          let imgUrl = this.getImgUrl(value);
          if(imgUrl) {
            let conPoint = this.wgsPointToBd(pt);
            let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
            marker = new BMap.Marker(conPoint, {icon: icon, offset: new BMap.Size(0, 0)});
          }
        }
        return marker;
      },
      wgsPointToBd: function (pt) {
        let transPoint = this.transformFun([pt.lng, pt.lat]);
        return new BMap.Point(transPoint[0], transPoint[1]);
      },
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      },
      eventCameraWindow(attributes, lng, lat){
        let t = this;
        let point = new BMap.Point(lng, lat);
        let res = t.setCameraWindow(attributes);
        if (res) {
          let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
            title: '<sapn style="font-size:16px"><b>' + attributes['CamName'] + '</b>' + '</span>',             //标题
            width: 520,
            height: 350,
            enableAutoPan: true,
            searchTypes: []
          });
          searchInfoWindow.open(point);
        }
      },
      //获取图标地址，根据指标参考值
      getImgUrl(value){
        let imgPath = undefined;
        if(value){
            imgPath = '/static/imgs/emergency/' + value.whetherpeak + '-' + value.buttonstate;
        }
//        switch (value) {
//          case 0:
//            imgPath = '/static/imgs/emergency/e-no.png';
//            break;
//          case 1:
//            imgPath = '/static/imgs/emergency/e-o.png';
//            break;
//          case 2:
//            imgPath = '/static/imgs/emergency/e-r.png';
//            break;
//          case 3:
//            imgPath = '/static/imgs/emergency/e-y.png';
//            break;
//          case 4:
//            imgPath = '/static/imgs/emergency/e-b.png';
//            break;
//        }
        return imgPath;
      },
      refreshData(data){
      },
      targetEvent(type){
      },
      setMarkerLayerVisible(hasVisible){
      },
      clearMarkerLayer(){
      }
    },
    components: {CameraComponent}
  };
</script>
<style scoped>

</style>
