<script>
  import CameraComponent from '@/components/VideoCtrl'
  import Coordtransform from 'coordtransform'
  import RequestHandle from '@/request/'
  import {bus} from '@/js/bus'
  export default {
    name: 'ScatterHandle',
    render(){
    },
    data () {
      return {
        videoType: '',
        map: undefined,
        mouseLabel:new BMap.Label(''),
        lsMarkers: []
      };
    },
    created(){
      bus.$once('setScatterMap', this.setMap);
//      bus.$on('cameraEvent', this.eventCameraWindow);
      bus.$on('cameraEvent', this.refreshCamera);
    },
    mounted(){
    },
    methods: {
      setMap(map){
        !this.map && ((this.map = map), this.map && this.loadVideoData());
      },
      loadVideoData(){
        this.requestVideoData();
      },
      refreshCamera(attributes,lng, lat){
        let point = new BMap.Point(lng, lat);
        let transPoint = this.wgsPointToBd(point);
        this.eventCameraWindow(attributes, transPoint.lng, transPoint.lat);
      },
      requestVideoData(){
        let t = this;
        let url = RequestHandle.getRequestUrl('VIDEOTAEGET');
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
          bus.$emit('loadScatterData', data);
          let t = this;
          for (let i = 0, length = data.length; i < length; i++) {
            let value = data[i];
            if (value && value['Type'] && value['Type'] === 4) {
              let camName = value.CamName;
              let pt = new BMap.Point(value.Longitude, value.Latitude);
              let marker = this.getMarker(pt, 1);
              marker.attributes = value;
              let label = new BMap.Label(camName || '');
              label.setStyle({
                display: 'none',
                border: 'none',
                color: '#fff',
                background: 'none',
                fontSize: '14px',
                fontFamily: 'Microsoft YaHei'
              });
              label.setOffset(new BMap.Size(-(camName.length * 4), 15));
              marker && (this.map.addOverlay(marker), marker.setLabel(label), this.lsMarkers.push(marker), marker.addEventListener('click', function (e) {
                t.showCameraWindow(e);
              }),marker.addEventListener('mouseover', function (e) {
                //t.showCameraWindow(e);
              }),marker.addEventListener('mouseout', function (e) {
                //t.showCameraWindow(e);
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
          return '<iframe style="height:100%;width:100%;border:none;" src="/static/video/video.html?camIndexCode=' + data['CamIndexCode'] + '&devIndexCode=' + data['DevIndexCode'] + '&area=' + data['Area'] +'&name=' + data['CamName'] + '"></iframe>';
      },
      //获取图标对象
      getMarker(pt, value){
        let marker = undefined;
        if (pt && value) {
          let imgUrl = this.getImgUrl(value);
          let conPoint = this.wgsPointToBd(pt);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
          marker = new BMap.Marker(conPoint, {icon: icon, offset: new BMap.Size(0, 0)});
        }
        return marker;
      },
      wgsPointToBd: function (pt) {
        let transPoint = this.transformFun([pt.lng, pt.lat]);
        let bdPoint = new BMap.Point(transPoint[0], transPoint[1]);

        return bdPoint;
      },
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      },
      eventCameraWindow(attributes, lng, lat){
        let t = this;
        let point = new BMap.Point(lng, lat);
        let res = t.setCameraWindow(attributes);
        let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
          title: '<sapn style="font-size:16px"><b>' + attributes['CamName'] + '</b>' + '</span>',             //标题
          width: 520,
          height: 400,
          enableAutoPan: true,
          searchTypes: []
        });
        searchInfoWindow.open(point);
      },
      //获取图标地址，根据指标参考值
      getImgUrl(value){
        let imgPath = undefined;
        if (value) {
          imgPath = '/static/imgs/main/sp-voc-g.png';
        }
        else {
          imgPath = '/static/imgs/sense/sp-ng.png';
        }
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
