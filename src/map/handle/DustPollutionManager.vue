<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import Coordtransform from 'coordtransform'
  import RequestHandle from '@/request'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'DustPollutionManager',
    render () {
    },
    data () {
      return {
        type: 'POINT',
        ptType: '国控点',
        hasLoaded: false,
        maxZoom: 13,
        count: 0,
        lsRenderOverlay: [],
        lsLabelOverlay: [],
        lsSearchInfoWindow: [],
        lsRenderMarker: [],
        data: [],
        item: 'PM2.5'
      }
    },
    props: ['pollutionUrl', 'charUrl'],
    created () {
//      console.log(RequestHandle)
    },
    mounted () {
      this.ready()
    },
    methods: {
      ready () {
        bus.$on('switchDustRender', this.switchRender);
        bus.$on('getDustMap', this.setMap);
        bus.$once('tilesDustLoaded', this.resetData);
        bus.$on('refreshDustLayer', this.refreshLayer);
        bus.$on('showDustInfoWindow', this.showDustInfoWindow);
        bus.$on('setLabelVisible', this.labelVisibleTarget);
      },

      //重置Map对象
      resetData (map) {
        bus.$emit('setLayerType', 'DUST');//设置时间轴图层类型
        if (!this.hasLoaded) {
          this.hasLoaded = true;
          this.map = map;
          this.data = [];
          this.setPollutionByType(this.item);
        }
      },

      //初始化Map对象
      setMap (map) {
        this.map = map;
      },

      //发送请求
      setPollutionByType (type) {
        if (!this.map.getBounds()) {
          return false;
        }
        let t = this;
        let qs = require('qs');
        let mapLevel = this.map.getZoom();
        let bs = this.map.getBounds();
        //let url = this.pollutionUrl;
        let urlDU = RequestHandle.getRequestUrl('DUSTPOLLUTION');
        let urlXH = RequestHandle.getRequestUrl('XHDUST');
        let lsResult = [];
        let lsUrl = [];
        lsUrl.push(urlDU);
        lsUrl.push(urlXH);
        for (let i = 0, length = lsUrl.length; i < length; i++) {
          let url = lsUrl[i];
          console.log(i);
          RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
            if (result.status === 1) {
              lsResult = lsResult.concat(result.obj);
              if (t.count === (lsUrl.length - 1) && lsResult.length) {
                t.count = 0;
                t.data = lsResult;
                t.render(lsResult, type);
                bus.$emit('refreshDustRanking', lsResult, type);
              } else {
                t.count++;
              }
            }
          }, function (ex) {
            if (i + 1 === lsUrl.length && lsResult.length) {
              t.count = 0;
              t.render(lsResult, type);
              bus.$emit('refreshDustRanking', lsResult, type);
            } else {
              t.count++;
            }
          });
        }
      },

      //获取点信息根据类型
      getPointByType(type){
        let rtValue = [];
        let dt = this.data;
        if (dt) {
          for (let i = 0, length = dt.length; i < length; i++) {
            let item = dt[i];
            if (item.type === type) {
              rtValue.push(dt[i]);
            }
          }
        }
        return rtValue;
      },

      //指标切换
      switchRender (type) {
        if (this.data) {
          this.item = type;
          this.render(this.data, this.item);
        }
      },

      //累计和实时切换刷新地图数据
      refreshLayer(data){
        if (data) {
          this.data = data;
          this.render(this.data, this.item);
        }
      },

      //右侧面板监测点列表点击事件
      showDustInfoWindow(lng, lat, attr){
        let point = new BMap.Point(lng, lat);
        let transPoint = this.wgsPointToBd(point);
        this.showCityPointChart(attr, transPoint);
      },

      //根据数据和指标类型加载地图及覆盖物
      render (data, type) {
        console.log(data);
//        console.log(type);
        if (data) {
          this.clearRenderOverlay();
          let aqi, lat, lng, city, pointname, level, region, province, title, value, unit, index, hourdiff,
            time, pointtype, bgcolor
          for (let i = 0; i < data.length && (this.type !== 'REGION' || this.item !== 'AQI'); i++) {
            city = data[i].name;
            pointname = data[i].name;
            level = data[i].level;
            title = data[i].name;
            region = data[i].name;//data[i].region;
            province = data[i].provincename || '';
            hourdiff = 0;
            switch (type) {
              case 'AQI':
                value = aqi;
                unit = '';
                index = getAQILevelIndex(value);
                break;
              case 'PM2.5':
                if (hourdiff < 2) {
                  value = parseInt(data[i].pm25);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getPM25LevelIndex(value);
                break;
              case 'PM10':
                if (hourdiff < 2) {
                  value = parseInt(data[i].pm10);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getPM10LevelIndex(value);
                break;
              case 'SO2':
                if (hourdiff < 2) {
                  value = parseInt(data[i].so2);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getSO2LevelIndex(value);
                break;
              case 'NO2':
                if (hourdiff < 2) {
                  value = parseInt(data[i].no2);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getNO2LevelIndex(value);
                break;
              case 'O3':
                if (hourdiff < 2) {
                  value = parseInt(data[i].o3);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getO3LevelIndex(value);
                break;
              case 'CO':
                if (hourdiff < 2) {
                  value = parseFloat(data[i].co).toFixed(1);
                } else {
                  value = 0;
                }
                unit = 'mg/m3';
                index = getCOLevelIndex(value);
                break;
              case 'INDEX':
                value = parseFloat(data[i].complexindex).toFixed(2);
                unit = '';
                index = getComplexIndex(value);
                break;
              case 'TEMP':
                if (hourdiff < 2) {
                  value = parseInt(data[i].temp);
                } else {
                  value = 0;
                }
                unit = '℃';
                index = getTempLevelIndex(value);
                break;
              case 'HUMI':
                if (hourdiff < 2) {
                  value = parseInt(data[i].humi);
                } else {
                  value = 0;
                }
                unit = '%';
                index = getHumiLevelIndex(value);
                break;
              case 'WINDSPEED':
                if (hourdiff < 2) {
                  value = parseInt(data[i].windspeed);
                } else {
                  value = 0;
                }
                unit = '级';
                index = getWindLevelIndex(value);
                break;
              case 'WINDDIRECTION':
                if (hourdiff < 2) {
                  value = parseInt(data[i].winddirection) + '|' + parseInt(data[i].windspeed);
                } else {
                  value = 0;
                }
                unit = '°';
                break
            }
            lat = data[i].latitude;
            lng = data[i].longitude;
            let point = new BMap.Point(lng, lat);
            //坐标转换
            let transPoint = this.wgsPointToBd(point);
            bgcolor = getColorByIndex(index);

            this.showMapByPoint(value, bgcolor, transPoint, city, region, pointname, index, data[i]);
          }
        }
      },

      //WGS坐标转百度坐标
      wgsPointToBd: function (pt) {
        let transPoint = this.transformFun([pt.lng, pt.lat]);
        let bdPoint = new BMap.Point(transPoint[0], transPoint[1]);

        return bdPoint;
      },

      //WGS坐标转百度坐标
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      },

      //加载地图覆盖物
      showMapByPoint (value, bgcolor, point, city, region, pointname, index, attr) {
        let t = this;
        let arr, wl, wd, icon, offseth, color, isone;
        let opts = {
          position: point,
          offset: new BMap.Size(-15, -15)
        };

        let label = new BMap.Label((value || '--') + '<div class="arrow" style="width: 0;  height: 0; border-left: 8px solid transparent; border-top: 8px solid; border-right: 8px solid transparent; color:' + bgcolor + '; position: absolute;  margin-top:-2px;margin-left:8px  " ></div>', opts)  // 创建文本标注对象
        let maplevel = this.map.getZoom();

        if (this.item === 'WINDDIRECTION') {
          if (value === 0) {
            return;
          }
          arr = value.split('|');
          wl = arr[1];
          wd = arr[0];
          if (wl > 6) {
            wl = 6
          }
          icon = 'static/imgs/arrow/color/' + wl + '.png';
          let myIcon = new BMap.Icon(icon, new BMap.Size(23, 32));
          let marker = new BMap.Marker(point, {icon: myIcon});
          marker.setRotation(wd);
          this.lsRenderOverlay.push(marker);
          this.map.addOverlay(marker);
          offseth = 12;
          label = marker;
        } else {
          if (index <= 3 || index === 7) {
            color = '#28004D';
          } else {
            color = 'white';
          }
          label.setStyle({
            color: color,
            background: bgcolor,
            fontSize: '14px',
            border: '',
            width: '35px',
            textAlign: 'center',
            height: '22px',
            lineHeight: '22px',
            borderRadius: '4px'
          });

          this.lsRenderOverlay.push(label);
          this.map.addOverlay(label);
          offseth = 14;
        }
        if (maplevel >= 7) {
          let nametip = null;
          if (maplevel <= 8) {
            nametip = city;
          } else if (maplevel <= 10) {
            nametip = region;
          } else {
            nametip = pointname;
          }
          if (nametip !== null) {
            let len = nametip.length;
            let opts_tip = {
              position: point,
              offset: new BMap.Size(-len * 6, offseth)
            };
            let label_tip = new BMap.Label(nametip, opts_tip);
            label_tip.setStyle({
              color: 'black',
              background: 'rgba(255,255,255,0.8)',
              fontSize: '12px',
              border: '1px solid #999',
              width: 'auto',
              textAlign: 'center',
              height: '18px',
              lineHeight: '18px'
            });
            if (this.item !== 'WINDDIRECTION' || maplevel !== 9) {
              this.lsLabelOverlay.push(label_tip);
              this.map.addOverlay(label_tip);
              this.map.getZoom() >= this.maxZoom ? label_tip.show() : label_tip.hide();
            }
          }
        }
        label.addEventListener('click', function (e) {
          t.showCityPointChart(attr, point);
        });
      },

      //监测点名称实现随比例尺放大显示
      labelVisibleTarget(hasVisible){
        console.log(this.lsLabelOverlay.length);
        this.lsLabelOverlay.forEach(v => (hasVisible ? v.show() : v.hide()));
      },

      //清空地图覆盖物
      clearRenderOverlay () {
        let t = this;
        this.lsSearchInfoWindow.length = 0;
        for (let i = 0, length = this.lsRenderOverlay.length; i < length; i++) {
          this.map.removeOverlay(this.lsRenderOverlay[i]);
        }
        for (let i = 0, length = this.lsRenderMarker.length; i < length; i++) {
          this.map.removeOverlay(this.lsRenderMarker[i]);
        }
        this.lsLabelOverlay.forEach(v => (t.map.removeOverlay(v)));

        this.lsRenderOverlay = [];
        this.lsRenderMarker = [];
        this.lsLabelOverlay = [];
      },

      //获取弹出框显示位置
      showSearchInfoWindow (lng, lat, name) {
        let t = this;
        let ckWindow = this.getSearchInfoWindow(name);
        let pt = new BMap.Point(lng, lat);
        if (ckWindow && pt) {
          ckWindow.open(pt);
          setTimeout(function () {
            bus.$emit('setCenter', pt);
            t.showCityPointChart(name);
          }, 100)
        }
      },

      //获取弹出框详细表HTML
      getSearchInfoWindow (name) {
        if (this.lsSearchInfoWindow.length) {
          for (let i = 0, length = this.lsSearchInfoWindow.length; i < length; i++) {
            let item = this.lsSearchInfoWindow[i];
            if (item._opts.name === name) {
              return item;
            }
          }
        }
      },

      //获取污染级别
      getLevel (aqival) {
        let _color = null;
        let _quality = null;
        if (aqival <= 0) {
          _color = '#6E6E6E';
          _quality = '无'
        } else if (aqival <= 50) {
          _color = '#43ce17';
          _quality = '优'
        } else if (aqival <= 100) {
          _color = '#efdc31';
          _quality = '良'
        } else if (aqival <= 150) {
          _color = '#fa0';
          _quality = '轻度污染'
        } else if (aqival <= 200) {
          _color = '#ff401a';
          _quality = '中度污染'
        } else if (aqival <= 300) {
          _color = '#d20040';
          _quality = '重度污染'
        } else {
          _color = '#9c0a4e';
          _quality = '严重污染'
        }
        return {
          color: _color,
          quality: _quality
        }
      },

      //图标点击显示图表信息
      showCityPointChart (attr, point) {
        let t = this;
        let charUrl = attr.hasOwnProperty('dataType') ? RequestHandle.getRequestUrl('XHDUSTCHAR') : RequestHandle.getRequestUrl('DUSTCHART');
        let code = attr['deviceid'];
        let url = charUrl + '?deviceid=' + code + '&ptype=' + this.item.replace('.', '').toLowerCase();
//        console.log(code + this.item);
        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
//          console.log(result);
          if (result.status === 1) {
            let data = result.obj[0] || result.obj;
            let res = t.setInfoWindow(data);
//            console.log(res);
            let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res, {
              title: '<sapn style="font-size:16px"><b>' + (data.name || '') + '</b>' + '</span>',             //标题
              width: 420,
              height: 'auto',
              enableAutoPan: true,
              searchTypes: []
            });
            searchInfoWindow.open(point);
            setTimeout(function () {
              let title = '最近24小时' + t.getPollutionTarget(t.item) + '变化趋势';
              t.loadChar(code, t.item, t.getHourData(data.valuelist), title);
            }, 150);
          }
        }, function (ex) {
          console.error(ex);
        });
      },

      //根据污染指标获取相应值集合
      getPollutionTarget(type){
        console.log('你懂了')
        let rtValue = type;
        switch (type.toUpperCase()) {
          case 'INDEX':
            rtValue = '综指';
            break;
          case 'TEMP':
            rtValue = '温度';
            break;
          case 'HUMI':
            rtValue = '湿度';
            break;
          case 'WINDSPEED':
            rtValue = '风级';
            break;
          case 'WINDDIRECTION':
            rtValue = '风向';
            break;
        }
        return rtValue;
      },

      //设置弹出框信息
      setInfoWindow(data){
        //console.log(data)
        /* return '<table width=\'100%\' class="fitem"><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + parseInt(data.pm25)
         + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + parseInt(data.pm10)
         + '</td></tr><tr><th>温度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.temp) + '℃'
         + '</td><th>湿度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.humi) + '%'
         + '</td></tr><tr><th>风向</th><td style=\'width:70px;text-align:center;\'>' + data.wdirection
         + '</td><th>风级</th><td style=\'width:70px;text-align:center;\'>' + (data.windspeed || 0) + '级'
         + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + (data.time.replace(/T/g, ' ') || '') + '</td></tr></table>'
         + '</td>'
         + '<td valign=\'top\' align=\'right\'><td>'
         + '</tr></table><div id=\'citychart_' + data.deviceid + '\' style=\'width:100%;height:110px\'>';*/

        let gridName = (data.firstGridName || '') + '-' + (data.secodGridName || '') + '-' + (data.threeGridName || '');
        let tel = data.Contact || data.contact || '';
        let memberName = data.memberName || '';

        return '<div class="param gongDi">\n' +
          '    <div class="line"></div>\n' +
          '    <div class="item one">\n' +
          '        <img src="../static/imgs/main/gd-g.png"></img>\n' +
          '        <div class="type">工地扬尘监测</div>\n' +
          '        <div class="date">' + (data.time && (data.time.replace(/T/g, ' ')) || '') + '</div>\n' +
          '    </div>\n' +
          '    <div class="item second">\n' +
          '        <div class="key" style=\'background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + '\'>PM2.5</div>\n' +
          '        <div class="value">' + (data.pm25 ? parseInt(data.pm25) : '--') + '</div>\n' +
          '    </div>' +
          '<div class="item third">' +
          '<div class="key" style=\'background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + '\'>PM10</div>' +
          '<div class="value">' + (data.pm10 ? parseInt(data.pm10) : '--') + '</div>' +
          '</div>\n' +
          '</div><div id=\'citychart_' + data.deviceid + '\' style=\'width:100%;color:#666666;font-weight:bold;height:110px\'></div>' +
          '<div class="Introduce"><div class="Net">所属网络：' + gridName + '</div><div class="Person">网络员代表：' + memberName + '</div><div>联系方式：' + tel + '</div></div>'
      },

      //加载Chart数据
      loadChar(container, name, data, title){
//        console.log(data);
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
        });
        Highcharts.setOptions({global: {useUTC: false}});
      },

      //设置Chart展示数据
      getHourData(data){
        let rtValue = [];

        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          let obj = {
            x: converTimeFormat(item.time.replace('T', ' ')).getTime(),
            y: parseInt(item.values),
            color: getColorByIndex(this.getPollutionLeave(parseInt(item.values)))
          };
          rtValue.push(obj);
        }
        return rtValue;
      },

      //获取污染等级
      getPollutionLeave(value){
        let index = 0;
        switch (this.item) {
          case 'AQI':
            index = getAQILevelIndex(value);
            break;
          case 'PM2.5':
            index = getPM25LevelIndex(value);
            break;
          case 'PM10':
            index = getPM10LevelIndex(value);
            break;
          case 'SO2':
            index = getSO2LevelIndex(value);
            break;
          case 'NO2':
            index = getNO2LevelIndex(value);
            break;
          case 'O3':
            index = getO3LevelIndex(value);
            break;
          case 'CO':
            index = getCOLevelIndex(value);
            break;
        }
        return index;
      },

      //获取地图展示图片
      getIconByIndex(value) {
        let icon = null;
        if (value == 0) {
          icon = "resource/img/map/level00.png";
        }
        else if (value == 1) {
          icon = "resource/img/map/level11.png";
        }
        else if (value == 2) {
          icon = "resource/img/map/level22.png";
        }
        else if (value == 3) {
          icon = "resource/img/map/level33.png";
        }
        else if (value == 4) {
          icon = "resource/img/map/level44.png";
        }
        else if (value == 5) {
          icon = "resource/img/map/level55.png";
        }
        else {
          icon = "resource/img/map/level66.png";
        }
        //icon = "resource/img/map/aqi"+value + ".png";
        return icon;
      }
    },
    components: {}
  }
</script>
<style scope>
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

  .param {
    /*border-top:1px solid #DDDDDD;*/
    padding: 0 15px 20px;
  }

  .line {
    height: 1px;
    width: 100%;
    background: #DDDDDD;
    margin-bottom: 12px;
  }

  .param .item {
    background: #EBEBEB;
    display: inline-block;
    font-size: 14px;
    font-family: "Microsoft YaHei";
  }

  .date {
    font-size: 10px;
    color: #666666;
    line-height: 10px;
  }

  .value {
    font-size: 14px;
    color: #666666;
    background: #EBEBEB;
    text-align: center;
  }

  .key {
    font-size: 12px;
    color: #333333;
    font-weight: bold;
    /*background:#2BE42F;*/
    text-align: center;
    height: 20px;
    line-height: 20px;
  }

  .type {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    display: inline-block;
  }

  .one {
    text-align: center;
    padding: 10px 0;
    width: 190px;
  }

  .second .key,
  .third .key {
    width: 93px;
  }

  .second .value,
  .third .value {
    height: 28px;
    width: 93px;
  }

  .param .value {
    height: 28px;
    line-height: 28px;
  }

  .third {
    margin-left: 4px;
  }

  .index .item {
    display: inline-block;
    font-size: 12px;
    color: #666666;
    margin-right: 30px;
    font-family: 'Microsoft YaHei'
  }

  .gongDi .item {
    display: inline-block;
    height: 48px;
    vertical-align: top;
  }

  .Introduce {
    font-size: 12px;
    color: #999999;
    padding: 0 15px 15px;
  }

  .Net, .Person {
    display: inline-block;
  }

  .Net {
    margin-right: 10px;
  }
</style>
