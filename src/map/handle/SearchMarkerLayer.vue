<script>
  import BMap from 'BMap'
  import RequestHandle from '@/request'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'SearchMarkerLayer',
    render(){},
    data () {
      return {
        markers: [],
        checkedName: 'AQI',
        map: undefined,
        charUrl: 'http://117.119.97.150:8064/api/FcStation/GetSingleStationInfo'
      };
    },
    created(){
    },
    mounted(){
      this.ready();
    },
    methods: {
      //页面初始化
      ready(){
        bus.$on('loadSearchData', this.loadMarkerLayer);
        bus.$on('clearSearchData', this.clearMarker);
        bus.$on('getCheckedName', this.getCheckedName);
      },

      getCheckedName(name){
        this.checkedName = name;
        this.clearMarker();
      },

      //加载marker数据
      loadMarkerLayer(map, data){
        this.clearMarker();
        if (!this.checkedName) {
          bus.$on('getCheckedName', this.getCheckedName);
        }
        let t = this;
        this.map = map;
        let lsMarkers = data;
        for (let i = 0, length = lsMarkers.length; i < length; i++) {
          let value = lsMarkers[i];
          let pt = new BMap.Point(value.longitude, value.latitude);
          let v = value[t.getKeyByName(t.checkedName)];
          let marker = t.getMarker(pt, v);
          if (marker) {
            marker.show();
            console.log(t.map);
            t.markers.push(marker);
            t.map.addOverlay(marker);
            marker.addEventListener('click', function (e) {
              let tg = e.target;
              let point = new BMap.Point(tg.getPosition().lng, tg.getPosition().lat);
              t.markerClick(value.stationid, point);
            });
          }
        }
      },

      //图标点击事件
      markerClick(code, point){
        let t = this;
        let url = this.charUrl + '?stationid=' + code + '&pollute=' + this.checkedName;
        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
          if (result.status === 0) {
            let data = result.obj;
            let res = t.setInfoWindow(data);
            console.log(res);
            let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
              title: '<sapn style="font-size:16px"><b>' + data.stationname + '</b>' + '</span>',             //标题
              width: 320,
              height: 200,
              enableAutoPan: true,
              searchTypes: []
            });
            searchInfoWindow.open(point);
            setTimeout(function () {
              let title = '最近24小时' + t.checkedName + '变化趋势';
              t.loadChar(code, t.checkedName, t.getHourData(data.hourdatas), title);
            }, 100);
          }
        }, function (ex) {
          console.error(ex);
        });
      },

      //获取属性Key
      getKeyByName(name){
        let rtValue = undefined;
        switch (name.toUpperCase()) {
          case 'AQI':
            rtValue = 'aqi';
            break;
          case 'PM2.5':
            rtValue = 'pm25';
            break;
          case 'PM10':
            rtValue = 'pm10';
            break;
          case 'SO2':
            rtValue = 'so2';
            break;
          case 'NO2':
            rtValue = 'no2';
            break;
          case 'CO':
            rtValue = 'co';
            break;
          case 'O3':
            rtValue = 'o3';
            break;
        }
        return rtValue;
      },

      //获取图标对象
      getMarker(pt, value){
        let marker = undefined;
        if (pt && value) {
          let imgUrl = this.getImgUrl(value);
          let icon = new BMap.Icon(imgUrl, new BMap.Size(32, 32));
          marker = new BMap.Marker(pt, {icon: icon, offset: new BMap.Size(8, -16)});
        }
        return marker;
      },

      //获取图标地址，根据指标参考值
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

      //设置弹出框信息
      setInfoWindow(data){
        return '<table width=\'100%\'><tr><td style=\'font-size:12px\' valign=\'top\'>'
          + '<table width=\'100%\' class=\'fitem\'>'
          + '<tr><th>AQI</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getAQILevelIndex(data.aqi)) + ';color:#fff\'>' + data.aqi
          + '</td></tr><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + parseInt(data.pm25)
          + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + parseInt(data.pm10)
          + '</td><th>CO</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + ';color:#fff\'>' + parseFloat(data.co).toFixed(1)
          + '</td></tr><tr><th>NO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + ';color:#fff\'>' + parseInt(data.no2)
          + '</td><th>SO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + ';color:#fff\'>' + parseInt(data.so2)
          + '</td><th>O3</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + ';color:#fff\'>' + parseInt(data.o3)
          + '</td></tr></table>'
          + '</td>'
          + '<td valign=\'top\' align=\'right\'><td>'
          + '</tr></table><div id=\'citychart_' + data.stationid + '\' style=\'width:100%;height:110px\'>';
      },

      //设置Chart展示数据
      getHourData(data){
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let obj = {
            x: converTimeFormat(item.recordtime.replace('T', ' ')).getTime(),
            y: parseInt(item.value),
            color: getColorByIndex(item.value)
          };
          rtValue.push(obj);
        }
        return rtValue;
      },

      //加载Chart数据
      loadChar(container, name, data, title){
        console.log(data);
        let dateTypeFormat = '%Y-%m-%d %H:%M';
        let markerShowFlag = false;
        let chart = new Highcharts.Chart('citychart_' + container, {
          chart: {
            type: 'column',
            zoomType: 'x',
            spacingLeft: 0,
            spacingRight: 0
          },
          title: {
            text: title,
            style: {
              fontSize: '12px'
            }
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%Y-%m',
              year: '%Y'
            }
          },
          yAxis: {
            title: {
              text: ''
            },
            min: 0
          },
          tooltip: {
            enabled: true,
            formatter: function () {
              let tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) + '<br/>' +
                this.series.name + ': <b>' + this.y + '</b>';//+ unit;
              return tip;
            }
          },
          plotOptions: {
            series: {
              marker: {
                enabled: markerShowFlag,
                radius: 5
              },
              enableMouseTracking: true,
              turboThreshold: 0
            }
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: [{
            name: name,
            data: data
          }]
        })
      },

      //清除当前Marker图层
      clearMarker(){
        for (let i = 0, length = this.markers.length; i < length; i++) {
          this.map.removeOverlay(this.markers[i]);
        }
        this.markers = [];
      },

      //设置图层显隐性
      markerLayerToggle(hasVisible){
        this.hasVisible = hasVisible;
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
  .fitem {
    border: 1px solid #ddd;
    margin-right: 10px;
    line-height: 18px;
  }

  .fitem th {
    width: 65px;
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    border: 1px solid #ddd;
  }

  .fitem td {
    font-size: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }

  .BMapLib_SearchInfoWindow .BMapLib_bubble_title {
    background-color: #1080cc;
    color: #fff;
  }

  .BMapLib_SearchInfoWindow .BMapLib_bubble_tools div {
    background-color: rgba(0, 0, 0, 0);
  }

  .BMapLib_SearchInfoWindow .BMapLib_sendToPhone {
    background: none;
  }
</style>
