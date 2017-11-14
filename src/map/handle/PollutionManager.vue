<script>
  import BMap from 'BMap'
  import axios from 'axios'
  import RequestHandle from '@/request'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'PollutionManager',
    render () {
    },
    data () {
      return {
        type: 'POINT',
        ptType: '国控点',
        hasLoaded: false,
        lsRenderOverlay: [],
        lsSearchInfoWindow: [],
        lsRenderMarker: [],
        lsRedLabels: [],
        historyData: [],
        hasHistory: false,
        data: [],
        checkedName: 'AQI'
      }
    },
    props: ['pollutionUrl', 'charUrl', 'item'],
    created () {
    },
    mounted () {
      this.ready();
      this.checkedName = this.item;
    },
    methods: {
      ready () {
        bus.$on('switchRender', this.switchRender);//污染指标切换
        bus.$once('tilesLoaded', this.resetData);//初始化Map
        bus.$on('showWindowInfo', this.showSearchInfoWindow);//列表点击事件
        bus.$on('tabClick', this.tabClickEvent);//面板实时累计切换响应事件
        bus.$on('refreshLayer', this.refreshLayer);//刷新图层
        bus.$on('historyMonitorLayer', this.historyRefreshMarker);//历史7*24
      },

      //设置初始化
      resetData (map) {
        bus.$emit('setLayerType', 'MONITOR');//设置时间轴图层类型
        this.map = map;
        this.setPollutionByType(this.checkedName);
      },

      //初始化加载数据
      setPollutionByType (type) {
        if (!this.map.getBounds()) {
          return false;
        }
        let t = this;
        let qs = require('qs');
        let mapLevel = this.map.getZoom();
        let bs = this.map.getBounds();
        let url = RequestHandle.getRequestUrl('MONPOLLUTION');
        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
          if (result.status === 0) {
            t.data = result.obj;
            t.render(t.getPointByType(t.ptType), type);
            bus.$emit('refreshRanking', result.obj, type);
          }
        }, function (ex) {
          console.error(ex);
        });
      },

      //根据类型获取点集合
      getPointByType(type){
        let rtValue = [];
        let dt = this.data;
        if (dt) {
          for (let i = 0, length = dt.length; i < length; i++) {
            let item = dt[i];
            rtValue.push(dt[i]);
          }
        }
        return rtValue;
      },

      //指标切换响应事件
      switchRender (type) {
        if (this.data) {
          this.checkedName = type;
          this.render(this.getPointByType(this.ptType), type);
        }
      },

      //面板切换响应事件
      tabClickEvent(type){
        if (this.data) {
          this.ptType = type;
          this.render(this.getPointByType(type), this.checkedName);
        }
      },

      //刷新覆盖物
      refreshLayer(data, hasHistory = true){
        if (data) {
          //this.data = data;
          hasHistory && (this.data = data);
          this.render(this.getPointByType(this.ptType), this.checkedName);
        }
      },

      //刷新历史数据
      historyRefreshMarker(tm = undefined, hasReset){
        let t = this;
        if (tm) {
          t.hasHistory = true;
          let urlHistoryLCS = RequestHandle.getRequestUrl('MONCHARTHISTORY');
          let url = urlHistoryLCS + '2017103014.json';//+ tm.replace(/-/g,'').replace(/' '/g,'').replace(/:/g,'') + '.json';
          RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
//            if (result.status === 1) {
            let data = result || [];
            t.historyData = data;
            if (data.length) {
              t.refreshLayer(data, false);
            }
//            }
          }, function (ex) {
            console.log(ex);
          })
        }
        else {
          t.hasHistory = false;
          (hasReset && t.data.length) && (t.refreshLayer(t.data));
        }
      },

      //渲染地图
      render (data, type) {
        if (data) {
          this.clearRenderOverlay();
          let aqi, lat, lng, city, pointname, level, region, province, title, value, unit, index, hourdiff,
            time, pointtype, bgcolor;
          let hasRed = false;
          for (let i = 0; i < data.length && (this.type !== 'REGION' || this.checkedName !== 'AQI'); i++) {
            city = data[i].cityname;
            pointname = data[i].pointname;
            level = data[i].level;
            region = data[i].pointname;//data[i].region;
            province = data[i].provincename || '';
            if (!level) {
              level = '城市';
            }
            aqi = parseInt(data[i].aqi);
            hourdiff = 0;
            switch (type) {
              case 'AQI':
                value = aqi;
                unit = '';
                index = getAQILevelIndex(value);
                hasRed = index > 3;
                break;
              case 'PM2.5':
                if (hourdiff < 2) {
                  value = parseInt(data[i].pm25);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getPM25LevelIndex(value);
                hasRed = index > 3;
                break;
              case 'PM10':
                if (hourdiff < 2) {
                  value = parseInt(data[i].pm10);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getPM10LevelIndex(value);
                hasRed = index > 3;
                break;
              case 'SO2':
                if (hourdiff < 2) {
                  value = parseInt(data[i].so2);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getSO2LevelIndex(value);
                hasRed = index > 3;
                break;
              case 'NO2':
                if (hourdiff < 2) {
                  value = parseInt(data[i].no2);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getNO2LevelIndex(value);
                hasRed = index > 3;
                break;
              case 'O3':
                if (hourdiff < 2) {
                  value = parseInt(data[i].o3);
                } else {
                  value = 0;
                }
                unit = 'ug/m3';
                index = getO3LevelIndex(value);
                hasRed = index > 3;
                break;
              case 'CO':
                if (hourdiff < 2) {
                  value = parseFloat(data[i].co).toFixed(1);
                } else {
                  value = 0;
                }
                unit = 'mg/m3';
                index = getCOLevelIndex(value);
                hasRed = index > 3;
                break;
              case 'INDEX':
                value = parseFloat(data[i].complexindex).toFixed(2);
                unit = '';
                index = getComplexIndex(value);
                hasRed = index > 3;
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
                hasRed = index > 3;
                break;
              case 'WS':
                if (hourdiff < 2) {
                  value = parseInt(data[i].windspeed);
                } else {
                  value = 0;
                }
                unit = '级';
                index = getWindLevelIndex(value);
                break;
              case 'WD':
                if (hourdiff < 2) {
                  value = parseInt(data[i].windangle) + '|' + parseInt(data[i].windspeed);
                } else {
                  value = 0;
                }
                unit = '°';
                break
            }
            lat = data[i].latitude;
            lng = data[i].longitude;
            time = data[i].time;
            if (time > this.curtime) {
              this.curtime = time;
            }
            let point = new BMap.Point(lng, lat);

            if (city !== province) {
              title = city;//province + '-' + city;
            } else {
              title = city;
            }
            if (pointname !== null) {
              title = title + '-' + pointname;
            }
            pointtype = data[i].type;
            if (!pointtype) {
              pointtype = '城市';
            }

            bgcolor = getColorByIndex(index);
            if (this.type !== 'REGION') {
              let city_2_26 = '{"citylist":[{"cityname":"安阳"},{"cityname":"保定"},{"cityname":"北京"},{"cityname":"滨州"},{"cityname":"沧州"},{"cityname":"长治"},{"cityname":"德州"},{"cityname":"邯郸"},{"cityname":"菏泽"},{"cityname":"鹤壁"},{"cityname":"衡水"},{"cityname":"济南"},{"cityname":"济宁"},{"cityname":"焦作"},{"cityname":"晋城"},{"cityname":"开封"},{"cityname":"廊坊"},{"cityname":"聊城"},{"cityname":"濮阳"},{"cityname":"石家庄"},{"cityname":"太原"},{"cityname":"唐山"},{"cityname":"天津"},{"cityname":"新乡"},{"cityname":"邢台"},{"cityname":"阳泉"},{"cityname":"郑州"},{"cityname":"淄博"}]}';
              city_2_26 = JSON.parse(city_2_26);
              city_2_26 = city_2_26.citylist;
              let isfd = 0;
              if (this.fdbtn === 1) {
                for (let c = 0; c < city_2_26.length; c++) {
                  if (city === city_2_26[c].cityname) {
                    isfd = 1;
                  }
                }
              }
              hasRed && this.showRedLabels(point);
              this.showMapByPoint(title, value, bgcolor, point, '', i, city, region, pointname, index, isfd, data[i].citygid);
            }
          }
        }
      },

      //加载覆盖物
      showMapByPoint (name, value, bgcolor, point, desp, i, city, region, pointname, index, isfd, citycode) {
        let t = this;
        let arr, wl, wd, icon, offseth, color, isone;
        let opts = {
          position: point,
          offset: new BMap.Size(-15, -15)
        };

        let label = new BMap.Label(value + '<div class="arrow" style="width: 0;  height: 0; border-left: 8px solid transparent; border-top: 8px solid; border-right: 8px solid transparent; color:' + bgcolor + '; position: absolute;  margin-top:-2px;margin-left:8px  " ></div>', opts)  // 创建文本标注对象
        label.attributes = {ptId: citycode};
        let maplevel = this.map.getZoom();
        let link = '';
        if (pointname === null) {
          link = '<a href=\'w.php?tab=city&city=' + city + '#envtab\' style=\'font-size:12px\' target=\'_blank\'> 详情</a>';
        }

        if (this.checkedName === 'WD') {
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
        } else if (maplevel < 7) {
          let icon = this.getIconByIndex(index);
          let myIcon = new BMap.Icon(icon, new BMap.Size(16, 16));
          let marker = new BMap.Marker(point, {icon: myIcon});
          this.lsRenderOverlay.push(marker);
          this.map.addOverlay(marker);
          marker.addEventListener('click', function () {
            //searchInfoWindow.open(point);
            ///t.showCityPointChart(i, city, pointname)
          })
        } else {
          if (index <= 3 || index === 7) {
            color = '#28004D';
          } else {
            color = 'white';
          }
          if (isfd === 1) {
            if (isone < 26) {
              label.setStyle({
                color: color,
                background: bgcolor,
                fontSize: '14px',
                border: '1px solid #888',
                width: '40px',
                textAlign: 'center',
                height: '23px',
                lineHeight: '22px',
                borderRadius: '4px',
                animation: 'mymove 1s '
              })
            } else {
              label.setStyle({
                color: color,
                background: bgcolor,
                fontSize: '14px',
                border: '1px solid #888',
                width: '35px',
                textAlign: 'center',
                height: '23px',
                lineHeight: '22px',
                borderRadius: '4px'
              })
            }
            isone++;
          } else {
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
            })
          }
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
            if (this.checkedName !== 'WD' || maplevel !== 9) {
              this.lsRenderOverlay.push(label_tip);
              this.map.addOverlay(label_tip);
            }
          }
        }
        label.addEventListener('click', function (e) {
          //searchInfoWindow.open(point);
          t.showCityPointChart(citycode, point);
        });
        //this.lsSearchInfoWindow.push(searchInfoWindow);
        if (value > 80) {
//0811
//          let myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
//          let marker2 = new BMap.Marker(point,{icon:myIcon,size:{width:0,height:0}});  // 创建标注
//          this.map.addOverlay(marker2);
//          this.lsRenderMarker.push(marker2)
        }
      },

      //加载预警覆盖物
      showRedLabels(point){
        let elContext = '<div class="pulse"></div><div class="pulse1"></div>';
        let opts = {
          position: point,
          offset: new BMap.Size(-30, -20)
        };
        let labelRed = new BMap.Label(elContext, opts);
        labelRed.setStyle({
          border: 'none',
          background: 'none',
          height: '60px',
          width: '60px',
        });
        this.lsRedLabels.push(labelRed);
        this.map.addOverlay(labelRed);
      },

      //清除覆盖物
      clearRenderOverlay () {
        this.lsSearchInfoWindow.length = 0;
        for (let i = 0, length = this.lsRenderOverlay.length; i < length; i++) {
          this.map.removeOverlay(this.lsRenderOverlay[i]);
        }
        for (let i = 0, length = this.lsRenderMarker.length; i < length; i++) {
          this.map.removeOverlay(this.lsRenderMarker[i]);
        }
        for (let i = 0, length = this.lsRedLabels.length; i < length; i++) {
          this.map.removeOverlay(this.lsRedLabels[i]);
        }
        this.lsRenderOverlay = [];
        this.lsRenderMarker = [];
        this.lsRedLabels = [];
      },

      //显示监测点详细信息框
      showSearchInfoWindow (lng, lat, name) {
        let t = this;
        //let ckWindow = this.getSearchInfoWindow(name);
        let pt = new BMap.Point(lng, lat);
//        if (ckWindow && pt) {
//          ckWindow.open(pt);
        setTimeout(function () {
          bus.$emit('setCenter', pt);
          t.showCityPointChart(name, pt);
        }, 100);
      },

      //获取污染等级
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

      //显示监测点24小时数据图表
      showCityPointChart (citycode, point) {
//                console.log(citycode);
        let t = this;
        let chartUrl = RequestHandle.getRequestUrl('MONCHART');
        let pmsValue = undefined;
        switch (t.checkedName) {
          case 'INDEX':
            pmsValue = 'ZZ';
            break;
          case 'TEMP':
            pmsValue = 'WD';
            break;
          case 'HUMI':
            pmsValue = 'SD';
            break;
          case 'WD':
            pmsValue = 'FX';
            break;
          case 'WS':
            pmsValue = 'FL';
            break;
          default:
            pmsValue = t.checkedName;
            break;
        }
        let url = chartUrl + '?id=' + citycode + '&type=' + pmsValue;
        RequestHandle.request({url: url, type: 'GET', pms: {}}, function (result) {
          if (result.status === 0) {
            let obj = result.obj;
            let infoContent = t.setGSInfoWindow(obj);
            let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, infoContent, {
              title: '<sapn style="font-size:16px"><b>' + (obj.pointname || '') + '</b>' + '</span>',             //标题
              width: 420,
              height: 'auto',
              enableAutoPan: true,
              searchTypes: []
            });
            searchInfoWindow.open(point);

            setTimeout(function () {
              let dt = result.history;
              t.loadChartData(citycode, {total: dt.length, rows: dt});
            }, 150);
          } else {
          }
        }, function (ex) {
          console.error(ex);
        });
      },

      //设置国省控点详细信息框Element
      setGSInfoWindow(data){
        let aqi = data.aqi;
        let time = data.time;
        let gridName = (data.firstGridName || '') + '-' + (data.secodGridName || '') + '-' + (data.threeGridName || '');
        let tel = data.Contact || data.contact || '';
        let memberName = data.memberName || '';
        /* return '<table width=\'100%\'><tr><td style=\'font-size:12px\' valign=\'top\'>'
         + '<table width=\'100%\' class=\'fitem\'>'
         + '</td></tr><tr><th>类型</th><td style=\'width:70px;text-align:center;\'>' + data.type
         + '</td></tr></tr><th>AQI</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getAQILevelIndex(aqi)) + ';color:#fff\'>' + aqi
         + '</td><th>综指</th><td  style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getComplexIndex(data.complexindex)) + ';color:#fff\'>' + parseFloat(data.complexindex).toFixed(3)
         + '</td></tr><tr><th>PM2.5</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + ';color:#fff\'>' + parseInt(data.pm25)
         + '</td><th>PM10</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + ';color:#fff\'>' + parseInt(data.pm10)
         + '</td><th>CO</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + ';color:#fff\'>' + parseFloat(data.co).toFixed(1)
         + '</td></tr><tr><th>NO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + ';color:#fff\'>' + parseInt(data.no2)
         + '</td><th>SO2</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + ';color:#fff\'>' + parseInt(data.so2)
         + '</td><th>O3</th><td style=\'width:70px;text-align:center;background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + ';color:#fff\'>' + parseInt(data.o3)
         + '</td></tr><tr><th>温度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.temp) + '℃'
         + '</td><th>湿度</th><td style=\'width:70px;text-align:center;\'>' + parseInt(data.humi) + '%'
         + '</td></tr><tr><th>风向</th><td style=\'width:70px;text-align:center;\'>' + data.winddirection
         + '</td><th>风级</th><td style=\'width:70px;text-align:center;\'>' + (parseInt(data.windspeed) || 0) + '级'
         + '</td></tr><tr><th>时间</th><td colspan=\'5\' style=\'text-align:left;padding-left:7px;\'>' + data.time.replace(/T/g, ' ') + '</td></tr></table>'
         + '</td>'
         + '<td valign=\'top\' align=\'right\'><td>'
         + '</tr></table><div id=\'citychart_' + data.citygid + '\' style=\'width:100%;height:110px\'>';*/


        return '  <div class="param"><div class="line"></div>\n' +
          '        <div class="item one">\n' +
          '            <div class="above">\n' +
          '            <div class="square"></div>\n' +
          '            <span class="type">' + data.type + '</span>\n' +
          '            </div>\n' +
          '            <div class="date">' + time.replace('T', ' ') + '</div>\n' +
          '        </div>\n' +
          '        <div class="item second">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getAQILevelIndex(aqi)) + '\'> AQI</div>\n' +
          '            <div class="value">' + aqi + '</div>\n' +
          '        </div>' +
          '<div class="item third">' +
          '<div class="key" style=\'background-color:' + getColorByIndex(getComplexIndex(data.complexindex)) + '\'>综值</div>' +
          '<div class="value">' + parseFloat(data.complexindex).toFixed(3) + '</div></div><br>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getPM25LevelIndex(data.pm25)) + '\'>PM2.5</div>\n' +
          '            <div class="value"> ' + parseInt(data.pm25) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getPM10LevelIndex(data.pm10)) + '\'>PM10</div>\n' +
          '            <div class="value">' + parseInt(data.pm10) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getCOLevelIndex(data.co)) + '\'>CO</div>\n' +
          '            <div class="value">' + parseFloat(data.co).toFixed(1) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getNO2LevelIndex(data.no2)) + '\'>NO2</div>\n' +
          '            <div class="value">' + parseInt(data.no2) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getSO2LevelIndex(data.so2)) + '\'>SO2</div>\n' +
          '            <div class="value">' + parseInt(data.so2) + '</div>\n' +
          '        </div>\n' +
          '        <div class="item secondLine">\n' +
          '            <div class="key" style=\'background-color:' + getColorByIndex(getO3LevelIndex(data.o3)) + '\'>O3</div>\n' +
          '            <div class="value">' + parseInt(data.o3) + '</div>\n' +
          '        </div>\n' +
          '    </div><div class="index">' +
          '<div class="item">温度：' + parseInt(data.temp) + '℃' + '</div>' +
          '<div class="item">湿度：' + parseInt(data.humi) + '%' + '</div>' +
          '<div class="item">风向：' + data.winddirection + '</div>' +
          '<div class="item">风级：' + (parseInt(data.windspeed) || 0) + '级' + '</div></div>' +
          '<div id=\'citychart_' + data.citygid + '\' style=\'width:100%;height:110px\'></div>' +
          '<div class="Introduce"><div class="Net">所属网络：' + gridName + '</div><div class="Person">网络员代表：' + memberName + '</div><div>联系方式：' + tel + '</div></div>'
      },

      //加载24小时数据
      loadChartData (code, data) {
        let t = this;
        let dataCityPoint = [];
        let value, unit, index, title;
        let labelstr = t.checkedName;
        for (let j = 0; j < data.total; j++) {
          let item = data.rows[j];
          switch (t.checkedName.toUpperCase()) {
            case 'AQI':
              unit = '';
              value = item.value;
              index = getAQILevelIndex(value);
              break;
            case 'PM2.5':
              value = parseInt(item.value);
              unit = 'ug/m3';
              index = getPM25LevelIndex(value);
              break;
            case 'PM10':
              value = parseInt(item.value);
              unit = 'ug/m3';
              index = getPM10LevelIndex(value);
              break;
            case 'SO2':
              value = parseInt(item.value);
              unit = 'ug/m3';
              index = getSO2LevelIndex(value);
              break;
            case 'NO2':
              value = parseInt(item.value);
              unit = 'ug/m3';
              index = getNO2LevelIndex(value);
              break;
            case 'O3':
              value = parseInt(item.value);
              unit = 'ug/m3';
              index = getO3LevelIndex(value);
              break;
            case 'CO':
              value = parseFloat(item.value);
              unit = 'mg/m3';
              index = getCOLevelIndex(value);
              break;
            case 'INDEX':
              value = parseFloat(item.value);
              unit = '';
              index = getComplexIndex(value);
              break;
            case 'TEMP':
              value = parseInt(item.value);
              unit = '℃';
              index = getTempLevelIndex(value);
              break;
            case 'HUMI':
              value = parseInt(item.value);
              unit = '%';
              index = getHumiLevelIndex(value);
              break;
            case 'WD':
              value = parseInt(item.value);
              unit = '°';
              index = 0;
              break;
            case 'WS':
              value = parseInt(item.value);
              unit = '级';
              index = getWindLevelIndex(value);
              break;
          }
          dataCityPoint.push({
            x: converTimeFormat(item.time.replace('T', ' ')).getTime(),
            y: parseInt(value),
            color: getColorByIndex(index)
          })
        }
        switch (t.checkedName) {
          case 'INDEX':
            labelstr = '综合指数';
            break;
          case 'TEMP':
            labelstr = '温度';
            break;
          case 'HUMI':
            labelstr = '湿度';
            break;
          case 'WD':
            labelstr = '风向角';
            break;
          case 'WS':
            labelstr = '风级';
            break;
        }
        title = '最近24小时' + labelstr + '变化趋势';
        t.showChart('citychart_' + code, labelstr, dataCityPoint, unit, title);
      },

      //显示图标数据
      showChart (container, name, data, unit, title) {
        let dateTypeFormat = '%Y-%m-%d %H:%M';
        let markerShowFlag = false;
        let chart = new Highcharts.Chart(container, {
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
//                            console.log(this);
              let tip = '' + Highcharts.dateFormat(dateTypeFormat, this.x) + '<br/>' +
                this.series.name + ': <b>' + this.y + '</b>' + unit;
//              if (this.point.primary_pollutant !== null) {
//                tip = tip + '<br/>首要污染物：' + this.point.primary_pollutant;
//              }
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

      //获取污染指标Icon
      getIconByIndex(value) {
        var icon = null;
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
    }
    ,
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

  .secondLine {
    width: 61px;
  }

  .index {
    padding: 0 20px 10px;
  }

  .index .item {
    display: inline-block;
    font-size: 12px;
    color: #666666;
    margin-right: 30px;
    font-family: 'Microsoft YaHei'
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
