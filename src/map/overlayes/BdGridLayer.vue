<template>
  <div class="grid-view">

  </div>
</template>
<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import RequestHandle from '@/request'
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
        }],
        marker: undefined,
        temp_str2: '<div class="shangb">\
          <h3 class="matitle">{companyname}</h3>\
          <div class="lie_t"><span class="hengys">企业行业</span>：<span class="hen_title">{industry}</span></div>\
          <div class="lie_t"><span class="hengys">污染物</span>：<span class="hen_wr">{mainpollute}</span></div>\
      </div>\
      <ul class="lixk">\
          <li class="lixf">{contactName}</li>\
          <li class="lixs">{contacttype}</li>\
          <li class="lixt">{address}</li>\
      </ul>'
    }
    },
    created () {
      this.ready()
    },
    mounted () {
      let t = this;
      let rectangleOption = {
        strokeColor: "black",
        strokeWeight: 0.3,
        strokeOpacity: 0,
        fillColor: "red",
        fillOpacity: 0.7
      };
      setTimeout(function () {
        t.createGrid();
        t.setMapData('SO2_120', rectangleOption);
      }, 10)
    },
    methods: {
      ready () {
        bus.$on('getGridMap', this.getMap);
        bus.$on('locationGridPoint',this.locationPoint);
      },
      getMap (map) {
        this.map = map
      },
      createGrid () {
        if (!this.map) {
          bus.$on('getGridMap', this.getMap);
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
      setMapData (type, rectangleOption) {
        let t = this;
        let xmin = 110, ymin = 35.8, xmax = 121.9, ymax = 42.7;
        this.map.clearOverlays();
        $.get('http://60.10.135.153:3000/querys/adj.js', {var: type}, function (rdata) {
          let data = rdata[type];
          for (let i = 0; i < 70; i++) {
            for (let j = 0; j < 120; j++) {
              if (data[i][j] > 0.05) {
                let rectangle = new BMap.Polygon([new BMap.Point(xmin + (0.1 * j), ymin + (0.1 * i)), new BMap.Point(xmin + 0.1 + (0.1 * j), ymin + (0.1 * i)), new BMap.Point(xmin + 0.1 + (0.1 * j), ymin + 0.1 + (0.1 * i)), new BMap.Point(xmin + (0.1 * j), ymin + 0.1 + (0.1 * i))
                ], $.extend({}, rectangleOption, {fillColor: t.getColor(data[i][j])}));
                rectangle.addEventListener("click", t.locationClick);
                t.map.addOverlay(rectangle);
              }
            }
          }
        }, 'jsonp');
      },
      locationClick (e) {
        let t =this;
        let p = e.target;
        let xmin = p.getBounds().getSouthWest().lng;
        let ymin = p.getBounds().getSouthWest().lat;
        let url = 'http://lftdkplat.zhiscity.com/api/GridForecast/GetGridForecast';
        let pms = {
          method: 'POST',
          url: 'http://www.zc12369.com/percenter/findCompanyByLocation.jhtm',
          xmin: xmin,
          xmax: (xmin + 0.1),
          ymin: ymin,
          ymax: (ymin + 0.1)
        };

        RequestHandle.request({
          url: url + '?paramStr=' + JSON.stringify(pms),
          type: 'GET', pms: {}
        }, function (result) {
            if (result.status === 0){
                bus.$emit('getGridData',result.obj);
            }
          //console.log(result);
          //let s = result.obj[0];
          //t.locationPoint(s.point_lng,s.point_lat,s.id);
        }, function (ex) {
        });
      },
      locationPoint(lng, lat, code){
        let t = this;
        this.deletePoint();
        let point = new BMap.Point(lng, lat);
        this.marker ? this.marker.setPosition(point) : (this.marker = new BMap.Marker(point));

        let url = 'http://lftdkplat.zhiscity.com/api/GridForecast/GetGridForecast';
        let pms = {
          method: 'POST',
          url: 'http://www.zc12369.com/percenter/findCompany.jhtm',
          id: code,
        };

        RequestHandle.request({
          url: url + '?paramStr=' + JSON.stringify(pms),
          type: 'GET', pms: {}
        }, function (result) {
          if (result.status === 0) {
            let data = result.obj;
            let infoWindow = new BMap.InfoWindow(t.format(t.temp_str2, data), {
              width: 295,
              height: 180,
              enableMessage: false
            });  // 创建信息窗口对象
            infoWindow.addEventListener('close', function () {
              t.deletePoint();
            });
            t.map.openInfoWindow(infoWindow, point); //开启信息窗口
            t.map.addOverlay(t.marker);
            t.map.panTo(point);
          }
          console.log(result);
        }, function (ex) {
        });
      },
      deletePoint(){
        this.map.removeOverlay(this.marker);
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
