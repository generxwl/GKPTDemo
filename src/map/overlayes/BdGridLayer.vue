<template>
  <div class="grid-view">
    <table>
      <tr class="tr_class" v-for="(item,key,index) in lsCompany">
        <td>{{item.companyname}}</td>
        <td>{{item.industry}}</td>
        <td class="text-center">
          <a class="location" @click="locationClick" href="#" :data-id="item.id" :data-lat="item.point_lat" :data-lng="item.point_lng"><img src=""/></a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import $ from 'jquery'
  import {bus} from '@/js/bus.js'
  export default {
    name: 'BdGridLayer',
    data () {
      return {
        lsCompany: [{
          companyname: '1',
          industry: '1',
          point_lat: '1',
          point_lng: '1'
        }]
      }
    },
    created () {
      this.ready()
    },
    mounted () {
      let t = this
      setTimeout(function () {
        t.createGrid()
        t.setMapData('SO2_120')
      }, 10)
    },
    methods: {
      ready () {
        bus.$on('getMap', this.getMap)
      },
      getMap (map) {
        this.map = map
      },
      createGrid () {
        if (!this.map) {
          bus.$on('getMap', this.getMap)
        }
        let xmin = 110;
        let ymin = 35.8;
        let xmax = 121.9;
        let ymax = 42.7;
        let lineOption = {
          strokeColor: '#000',
          strokeWeight: 0.3,
          strokeOpacity: 1.0,
          enableMassClear: false,
          enableClicking: false
        };
        for (let i = 0; i < 70; i++) {
          this.map.addOverlay(new BMap.Polyline([new BMap.Point(xmin, (ymin + 0.1 * i)), new BMap.Point(xmax, (ymin + 0.1 * i))], lineOption));
        }
        for (let i = 0; i < 120; i++) {
          this.map.addOverlay(new BMap.Polyline([new BMap.Point((xmin + 0.1 * i), ymin), new BMap.Point((xmin + 0.1 * i), ymax)], lineOption));
        }
      },
      setMapData (type) {

      },
      locationClick (e) {
        e.preventDefault();
        let t = this;
        let temp_str2 = '<div class="shangb">\
          <h3 class="matitle">{companyname}</h3>\
          <div class="lie_t"><span class="hengys">企业行业</span>：<span class="hen_title">{industry}</span></div>\
          <div class="lie_t"><span class="hengys">污染物</span>：<span class="hen_wr">{mainpollute}</span></div>\
      </div>\
      <ul class="lixk">\
          <li class="lixf">{contactName}</li>\
          <li class="lixs">{contacttype}</li>\
          <li class="lixt">{address}</li>\
      </ul>';
        let element = e.currentTarget;
        let lng = element.getAttribute('data-lng');
        let lat = element.getAttribute('data-lat');
        let id = element.getAttribute('data-id');
        let point = new BMap.Point(lng, lat);
        let url = 'http://www.zc12369.com/percenter/findCompany.jhtm';
        let urlHandle = 'http://localhost:6005/Handler.ashx';

        $.post(urlHandle, {url: url, id: id}, function (data) {
          let infoWindow = new BMap.InfoWindow(t.format(temp_str2, data), {
            width: 295,
            height: 180,
            enableMessage: false
          }) ; // 创建信息窗口对象
          infoWindow.addEventListener('close', function () {
          });
          t.map.openInfoWindow(infoWindow, point); //开启信息窗口
          t.map.panTo(point)
        }, 'json');
      },
      getColor (val) {
        if (val <= 0.1)
          return '#79E6F0';
        else if (val <= 0.2)
          return '#C8DC33';
        else if (val <= 0.4)
          return '#F0DC16';
        else if (val <= 0.6)
          return '#FFBE16';
        else if (val <= 0.8)
          return '#FF790C';
        else if (val <= 1.0)
          return '#FF5B0C';
        else if (val <= 2.0)
          return '#F02A02';
        else if (val <= 4.0)
          return '#B40C02';
        else if (val <= 8.0)
          return '#790C02';
        else
          return '#330C02';
      },
      format (e, j) {
        return e.replace(/{(.+?)}/g, function (k, l) {
          return typeof j[l] === 'undefined' ? k : j[l]
        })
      }
    }
  }
</script>
<style scoped>
  .grid-view {
    position: absolute;
    width: 50%;
    z-index: 1;
    background: #fff;
    top: 120px;
    left: 0;
  }

  table {
    color: #333;
    border: 1px solid #cad9ea;
    width: 100%;
  }

  td {
    height: 30px;
    border: 1px solid #cad9ea;
    padding: 0 1em 0;
  }

  img {
    height: 24px;
    width: 24px;
    margin: auto;
  }
</style>
