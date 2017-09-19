<script>
  import CameraComponent from '@/components/VideoCtrl'
  import RequestHandle from '@/request/'
  import {bus} from '@/js/bus'
  export default {
    name: 'VideoHandle',
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
      bus.$once('setVideoMap', this.setMap);
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
          let t = this;
          for (let i = 0, length = data.length; i < length; i++) {
            let value = data[i];
            let camName = value.CamName;
            let pt = new BMap.Point(value.Longitude, value.Latitude);
            let marker = this.getMarker(pt, 1);
            marker.attributes = value;
            let label = new BMap.Label(camName || '');
            label.setStyle({
              border: 'none',
              color: '#fff',
              background: 'none',
              fontSize: '14px',
              fontFamily: 'Microsoft YaHei'
            });
            label.setOffset(new BMap.Size(-(camName.length * 4), 15));
            marker && (this.map.addOverlay(marker), marker.setLabel(label), this.lsMarkers.push(marker), marker.addEventListener('click', function (e) {
              t.showCameraWindow(e);
            }));
          }
        }
      },
      showCameraWindow(e){
        let t = this;
        let tg = e.target;
        let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
        let res = t.setCameraWindow(tg.attributes);
        let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
          title: '<sapn style="font-size:16px"><b>' + tg.attributes['CamName'] + '</b>' + '</span>',             //标题
          width: 520,
          height: 350,
          enableAutoPan: true,
          searchTypes: []
        });
        searchInfoWindow.open(point);
      },
      setCameraWindow(data){
        return '<iframe style="height:100%;width:100%;border:none;" src="/static/video/video.html?camIndexCode='+data['CamIndexCode']+'&devIndexCode='+data['DevIndexCode']+'&name='+data['CamName']+'"></iframe>';
      },
      //获取图标对象
      getMarker(pt, value){
        let marker = undefined;
        if (pt && value) {
          let imgUrl = this.getImgUrl(value);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(25, 25));
          marker = new BMap.Marker(pt, {icon: icon, offset: new BMap.Size(8, -16)});
        }
        return marker;
      },
      //获取图标地址，根据指标参考值
      getImgUrl(value){
        let imgPath = undefined;
        if (value) {
          imgPath = '/static/imgs/main/sp-g.png';
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
<style>
    .BMapLib_SearchInfoWindow .BMapLib_bubble_title {
        padding-left: 15px;
        line-height: 32px;
        height: 32px;
        background-color: #1080cc!important;
        color: #fff;
    }

    .BMapLib_SearchInfoWindow .BMapLib_bubble_tools div {
        background-color: rgba(0, 0, 0, 0);
    }

    .BMapLib_SearchInfoWindow .BMapLib_sendToPhone {
        background: none;
    }
</style>
