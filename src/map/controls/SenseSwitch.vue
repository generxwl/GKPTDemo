<template>
  <div class="sense-switch-content">
    <ul>
      <li v-for="(item,index) in target" :data-type="item.name" @click="liClickEvent">{{item.value}}</li>
    </ul>
    <!--<hot-layer :charUrl="charUrl"></hot-layer>-->
    <marker-layer :charUrl="charUrl"></marker-layer>
    <!--<sense-marker-layer></sense-marker-layer>-->
  </div>
</template>
<script>
  import HotLayer from '@/map/handle/HotLayer'
  import MarkerLayer from '@/map/handle/MarkerLayer'
  import SenseMarkerLayer from '@/map/handle/SenseMarkerLayer'
  import RequestHandle from '@/request'
  import {bus} from '@/js/bus.js'
  //  import SenseMarkerLayer from "../handle/SenseMarkerLayer";

  export default {
    name: 'SenseSwitch',
    data () {
      return {
        hasLoaded: false,
        count: 0,
        target: [{
          name: 'HotMap',
          value: '热力图',
          hasChecked: true
        }, {
          name: 'PointMap',
          value: '点位图',
          hasChecked: false
        }]
      };
    },
    props: ['pollutionUrl', 'charUrl'],
    created(){
    },
    mounted(){
      this.ready();
    },
    methods: {
      ready(){
        bus.$once('tilesSenseLoaded', this.requestHandle);
      },
      requestHandle(map){
        bus.$emit('setLayerType','SENSE');//设置时间轴图层类型
//        let url = this.pollutionUrl;
//        console.log(url);
        //let url = RequestHandle.getRequestUrl('SENSEPOLLUTION');
        let t = this;
        let urlLCS = RequestHandle.getRequestUrl('SENSEPOLLUTION');
        let urlXH = RequestHandle.getRequestUrl('XHPOLLUTION');
        let lsUrl = [];
        let lsResult = [];
        lsUrl.push(urlLCS);
        lsUrl.push(urlXH);
        for (let i = 0, length = lsUrl.length; i < length; i++) {
          console.log(i);
          let url = lsUrl[i];
          RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
//          console.log(result);
//            if (result.status === 0) {
//            console.log(result.obj);
            lsResult = lsResult.concat(result.obj);
//            }
            if (t.count === (lsUrl.length - 1) && lsResult.length) {
              t.count = 0;
              bus.$emit('getSenseData', lsResult);
              bus.$emit('loadHotLayer', map, lsResult);
              bus.$emit('loadMarker', map, lsResult);
              bus.$emit('loadSenseMarker', map, lsResult);
            } else {
              t.count++;
            }
          }, function (ex) {
            console.error(ex);
            if (i + 1 === lsUrl.length && lsResult.length) {
              t.count = 0;
              bus.$emit('getSenseData', lsResult);
              bus.$emit('loadHotLayer', map, lsResult);
              bus.$emit('loadMarker', map, lsResult);
              bus.$emit('loadSenseMarker', map, lsResult);
            } else {
              t.count++;
            }
          });
        }
      },
      liClickEvent(e){
        let element = e.currentTarget;
        if (element) {
          this.resetLi();
          let type = element.getAttribute('data-type');
          element.style.backgroundColor = '#fff';
          element.style.color = '#1080CC';
          switch (type.toUpperCase()) {
            case 'HOTMAP':
              bus.$emit('setHotLayerVisible', true);
              bus.$emit('setMarkerVisible', false);
              break;
            case 'POINTMAP':
              bus.$emit('setHotLayerVisible', false);
              bus.$emit('setMarkerVisible', true);
              break;
          }
        }
      },
      resetLi(){
        jQuery.find('.sense-switch-content li').forEach(function (value, index) {
          value.style.backgroundColor = '#1080CC';
          value.style.color = '#fff';
        });
      }
    },
    components: {
      SenseMarkerLayer,
      HotLayer, MarkerLayer
    }
  };
</script>
<style scoped>
  .sense-switch-content {
    position: absolute;
    height: 37px;
    z-index: 1;
    top: 20px;
    left: 360px;
    display: none;
  }

  .sense-switch-content ul {
    height: 37px;
    border: solid 1px #1080CC;
  }

  .sense-switch-content li {
    list-style: none;
    float: left;
    height: 35px;
    width: 120px;
    line-height: 35px;
    color: #fff;
    background-color: #1080CC;
  }

  .sense-switch-content li:first-child {
    color: #1080CC;
    background-color: #fff;
  }
</style>
