<template>
    <div class="Paneldataindex">
        <!--首页面板-->
        <div id="list">
            <div class="gensui">
                <div class="line_top">
                    <toolbar @RightslideToggle="togleclick">
                        <map-handle slot="toors"></map-handle>
                    </toolbar>
                </div>
                <div class="line_bottom">
                    <tone-color></tone-color>
                </div>
            </div>
            <div class="panel">
                <img class="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img class="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <!--切换部分-->
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="统计一览" name="first">
                            <!--统计部分-->
                            <div class="tongji" v-if="tongji">
                                <div class="table_item">
                                    <strong>{{Statistics.AirCount}}</strong>
                                    <p>接入空气传感器</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.DustCount}}</strong>
                                    <p>接入工地监测</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.VideoCount}}</strong>
                                    <p>接入视频</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.CompanyCount}}</strong>
                                    <p>接入企业监测</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.GridCount}}</strong>
                                    <p>网格总数</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.GridMemberCount}}</strong>
                                    <p>网格员总数</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.PollutionCount ? Statistics.PollutionCount : '--'}}</strong>
                                    <p>污染源清单总数</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.CoalToGasCount ? Statistics.CoalToGasCount : '--'}}</strong>
                                    <p>煤改气进度</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.ColaToEle ? Statistics.ColaToEle : '--'}}</strong>
                                    <p>煤改电进度</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.CarCount ? Statistics.CarCount : '--'}}</strong>
                                    <p>接入车辆</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.RestaurantCount ? Statistics.RestaurantCount : '--'}}</strong>
                                    <p>接入餐饮监测</p>
                                </div>
                                <div class="table_item">
                                    <strong>{{Statistics.GasStationCount ? Statistics.GasStationCount : '--'}}</strong>
                                    <p>接入加油站</p>
                                </div>
                            </div>
                            <!--饼图展示-->
                            <div class="bing">
                                <div class="look">
                                    <p>空气传感器占比</p>
                                    <div class="bing_item1" id="bing_item1" style="width: 203px;height: 180px;"></div>
                                    <div class="tuli">
                                        <ul>
                                            <li><img src="../../static/imgs/piebiao/icon_lan1.png" alt="">六参数传感器</li>
                                            <li><img src="../../static/imgs/piebiao/icon_huang2.png" alt="">TVOC传感器</li>
                                            <li><img src="../../static/imgs/piebiao/icon_lu3.png" alt="">工地传感器</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="look">
                                    <p>视频类型占比</p>
                                    <div class="bing_item2" id="bing_item2" style="width: 203px;height: 180px;"></div>
                                    <div class="tuli">
                                        <ul>
                                            <li><img src="../../static/imgs/piebiao/icon_lan1.png" alt="">VOCs企业</li>
                                            <li><img src="../../static/imgs/piebiao/icon_huang2.png" alt="">高空五公里</li>
                                            <li><img src="../../static/imgs/piebiao/icon_lu3.png" alt="">散乱污企业</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="look" style="margin-top: 20px">
                                    <p>网络类型占比</p>
                                    <div class="bing_item3" id="bing_item3" style="width: 203px;height: 180px;"></div>
                                    <div class="tuli">
                                        <ul>
                                            <li style="width: 66px"><img src="../../static/imgs/piebiao/icon_lan1.png" alt="">一级</li>
                                            <li style="width: 66px"><img src="../../static/imgs/piebiao/icon_huang2.png" alt="">二级</li>
                                            <li style="width: 66px"><img src="../../static/imgs/piebiao/icon_lu3.png" alt="">三级</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="look" style="margin-top: 20px">
                                    <p>网格员占比</p>
                                    <div class="bing_item4" id="bing_item4" style="width: 203px;height: 180px;"></div>
                                    <div class="tuli">
                                        <ul>
                                            <li style="width: 66px"><img src="../../static/imgs/piebiao/icon_lan1.png" alt="">开发区</li>
                                            <li style="width: 66px"><img src="../../static/imgs/piebiao/icon_huang2.png" alt="">广阳区</li>
                                            <li style="width: 66px"><img src="../../static/imgs/piebiao/icon_lu3.png" alt="">安次区</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="各局数据接入进度" name="second">
                            <!--表格-->
                            <ul class="table_tie">
                                <li class="table_title" style="background:#ddd">
                                    <div class="item-table1">排名</div>
                                    <div class="item-table2">机关单位</div>
                                    <div class="item-table3">接入状态</div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 40px;line-height: 40px">1</div>
                                    <div class="item-table2" style="height: 40px;line-height: 40px">市环保局</div>
                                    <div class="item-table3" style="height: 40px;line-height: 40px">
                                        <p>接入在线监测企业{{RightStatistics.companyCount}}个，正常{{RightStatistics.CompanyCountOnline}}个，离线{{RightStatistics.companyCountUnline}}个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 240px;line-height: 240px">2</div>
                                    <div class="item-table2" style="height: 240px;line-height: 240px">开发区管委会</div>
                                    <div class="item-table3" style="height: 240px;">
                                        <p>接入六参数空气质量传感器{{RightStatistics.kfqSixCount}}个，正常{{RightStatistics.kfqSixCountOnline}}个，离线{{RightStatistics.kfqSixCountUnline}}个</p>
                                        <p>接入扬尘传感器{{RightStatistics.kfqDustCount}}个，正常{{RightStatistics.kfqDustCountOnline}}个，离线{{RightStatistics.kfqDustCountUnline}}个</p>
                                        <p>接入TVOC传感器{{RightStatistics.kfqVocCount}}个，正常{{RightStatistics.kfqVocCountOnline}}个，离线{{RightStatistics.kfqVocCountUnline}}</p>
                                        <p>接入TVOC企业视频监控{{RightStatistics.kfqVideoVoc}}个</p>
                                        <p>接入小散乱污企业视频{{RightStatistics.kfqVideoSlw}}个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 80px;line-height: 80px">3</div>
                                    <div class="item-table2" style="height: 80px;line-height: 80px">广阳区政府</div>
                                    <div class="item-table3" style="height: 80px;">
                                        <p>接入TVOC企业视频监控{{RightStatistics.gyqVideoVoc}}个</p>
                                        <p>接入小散乱污视频{{RightStatistics.gyqVideoSlw}}个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 240px;line-height: 240px">4</div>
                                    <div class="item-table2" style="height: 240px;line-height: 240px">安次区政府</div>
                                    <div class="item-table3" style="height: 240px;">
                                        <p>接入六参数空气质量传感器{{RightStatistics.acqSixCount}}个，正常{{RightStatistics.acqSixCountOnline}}个，离线{{RightStatistics.acqSixCountUnline}}个</p>
                                        <p>接入扬尘传感器{{RightStatistics.acqDustCount}}个，正常{{RightStatistics.acqDustCountOnline}}个，离线{{RightStatistics.acqDustCountUnline}}个</p>
                                        <p>接入TVOC传感器{{RightStatistics.acqVocCount}}个，正常{{RightStatistics.acqVocCountOnline}}个，离线{{RightStatistics.acqVocCountUnline}}个</p>
                                        <p>接入TVOC企业视频监控{{RightStatistics.acqVideoVoc}}个</p>
                                        <p>接入小散乱污企业视频{{RightStatistics.acqVideoSlw}}个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 80px;line-height: 80px">5</div>
                                    <div class="item-table2" style="height: 80px;line-height: 80px">市建设局</div>
                                    <div class="item-table3" style="height: 80px;">
                                        <p>煤改气数据最近更新时间：---</p>
                                        <p>接入工地视频监控--个，正常--个，离线--个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 40px;line-height: 40px">6</div>
                                    <div class="item-table2" style="height: 40px;line-height: 40px">供电公司</div>
                                    <div class="item-table3" style="height: 40px;">
                                        <p>用电量数据最近更新时间：---</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 40px;line-height: 40px">7</div>
                                    <div class="item-table2" style="height: 40px;line-height: 40px">市统计局</div>
                                    <div class="item-table3" style="height: 40px;">
                                        <p>经济运行数据最近更新时间：---</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 40px;line-height: 40px">8</div>
                                    <div class="item-table2" style="height: 40px;line-height: 40px">市气象局</div>
                                    <div class="item-table3" style="height: 40px;">
                                        <p>接入气象站--个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 40px;line-height: 40px">9</div>
                                    <div class="item-table2" style="height: 40px;line-height: 40px">是综合执法局</div>
                                    <div class="item-table3" style="height: 40px;">
                                        <p>接入车辆--个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 40px;line-height: 40px">10</div>
                                    <div class="item-table2" style="height: 40px;line-height: 40px">市环卫局</div>
                                    <div class="item-table3" style="height: 40px;">
                                        <p>接入车辆--个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 40px;line-height: 40px">11</div>
                                    <div class="item-table2" style="height: 40px;line-height: 40px">市交警支队</div>
                                    <div class="item-table3" style="height: 40px;">
                                        <p>接入监控视频--个</p>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    import Toolbar from '@/components/Toolbar'
    import ToneColor from '@/components/ToneColor'
    //import MapHandle from '@/map/controls/MapHandle'
    export default {
        name: 'paneldata',
        data () {
            return {
                zuo: false,
                you: true,
                table: false,
                tongji: true,
                activeName: 'first',
                tableData: [],//
                Statistics: {},//
                AirPie: [],//传感器
                VideoPie: [],//视频
                GridPie: [],//网格类
                GridMemberPie: [],//网格员
                RightStatistics:{},//右侧栏统计2
                flag:true
            }
        },
      activated(){
            api.GetXhHbPoints().then(res => {
                let data = res.data;
                data = typeof data === 'string' ? JSON.parse(data) : data;
                data = {
                    status: data.hasOwnProperty('status') ? data.status : data.Status,
                    obj: data.obj || data.ExtraData
                };
                this.Statistics = data.obj;
            })
            api.GetOfficeProgess().then(res => {
                let data = res.data;
                data = typeof data === 'string' ? JSON.parse(data) : data;
                data = {
                    status: data.hasOwnProperty('status') ? data.status : data.Status,
                    obj: data.obj || data.ExtraData
                };
                this.RightStatistics = data.obj;
            })
            this.GetEcharsData()
        },
        mounted(){
            //右侧收放
            let that = this;
            //
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
            //
            $('.shrink').on('click', function () {
                if (this.flag) {
                    that.zuo = true;
                    that.you = false;
                    $('#list').animate({
                        'right': '-437px'
                    });
                    this.flag = false;
                } else {
                    that.zuo = false;
                    that.you = true;
                    $('#list').animate({
                        'right': '0px'
                    });
                    this.flag = true;
                }
            })
        },
        methods: {
            togleclick(){
                let that = this;
                if (this.flag) {
                    that.zuo = true;
                    that.you = false;
                    $('#list').animate({
                        'right': '-437px'
                    });
                    this.flag = false;
                } else {
                    that.zuo = false;
                    that.you = true;
                    $('#list').animate({
                        'right': '0px'
                    });
                    this.flag = true;
                }
            },
            //排序
            compare (propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName]
                    let value2 = object2[propertyName]
                    return value2 - value1
                }
            },
            //table点击事件
            RowCurrentChange(val){
                this.currentRow = val;
                let citygid = this.currentRow.citygid;//城市id
                let latitude = this.currentRow.latitude;//纬度
                let longitude = this.currentRow.longitude;//经度
                // console.log(this.currentRow)
                bus.$emit('showWindowInfo', longitude, latitude, citygid)
            },
            //监听数据
            setdata(data, type){
            },
            //渲染
            switchRender(type){
                this.type = type;
                this.labelType = this.getPollutionTarget(type);
                this.setdata(this.data, this.type)
            },
            getPollution(type){
                let rtValue = type;
                switch (type.toUpperCase()) {
                    case 'PM2.5':
                        rtValue = 'pm25';
                        break;
                    case 'INDEX':
                        rtValue = 'complexindex';
                        break;
                    case 'WS':
                        rtValue = 'windspeed';
                        break;
                    case 'WD':
                        rtValue = 'windangle';
                        break;
                }
                return rtValue;
            },
            //空气传感器占比图
            AirSensorRatio(){
                let data = this.AirPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item1'));
                // 指定图表的配置项和数据
                let option = {
//                    tooltip : {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b} : {c} ({d}%)"
//                    },
                    series : [
                        {
                            name:'空气传感器占比',
                            type:'pie',
                            radius : ['0%', '75%'],
                            hoverAnimation:false,
                            itemStyle : {
                                normal : {
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        x : 'center',
//                        y : 'bottom',
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
                    series: [{
                        data: data,
                        color:[
                            '#0392e0',
                            '#f7cc5c',
                            '#a0cb3e',
                        ]
                    }]
                })
            },
            //视频类型占比
            VideoratioPie(){
                let data = this.VideoPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item2'));
                // 指定图表的配置项和数据
                let option = {
//                    tooltip : {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b} : {c} ({d}%)"
//                    },
                    series : [
                        {
                            name:'视频类型占比',
                            type:'pie',
                            radius : ['0%', '75%'],
                            hoverAnimation:false,
                            itemStyle : {
                                normal : {
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
                    series: [{
                        data: data,
                        color:[
                            '#0392e0',
                            '#f7cc5c',
                            '#a0cb3e',
                        ]
                    }]
                })
            },
            //网络类型占比
            GridTypeProportionPie(){
                let data = this.GridPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item3'));
                // 指定图表的配置项和数据
                let option = {
//                    tooltip : {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b} : {c} ({d}%)"
//                    },
                    series : [
                        {
                            name:'网络类型占比',
                            type:'pie',
                            radius : ['0%', '75%'],
                            hoverAnimation:false,
                            itemStyle : {
                                normal : {
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
                    series: [{
                        data: data,
                        color:[
                            '#0392e0',
                            '#f7cc5c',
                            '#a0cb3e',
                        ]
                    }],
                })
            },
            //网格员占比
            GridSharePie(){
                let data = this.GridMemberPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item4'));
                // 指定图表的配置项和数据
                let option = {
//                    tooltip : {
//                        trigger: 'item',
//                        formatter: "{a} <br/>{b} : {c} ({d}%)"
//                    },
                    series : [
                        {
                            name:'网格员占比',
                            type:'pie',
                            radius : ['0%', '75%'],
                            hoverAnimation:false,
                            itemStyle : {
                                normal : {
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                },

                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
                    series: [{
                        data: data,
                        color:[
                            '#0392e0',
                            '#f7cc5c',
                            '#a0cb3e',
                        ]
                    }],
                })
            },
            //图标数据请求
            GetEcharsData(){
                let t = this;
                //传感器
                api.GetAirPie().then(res => {
                    let data = res.data;
                    data = typeof data === 'string' ? JSON.parse(data) : data;
                    let charData = {
                        status: data.hasOwnProperty('status') ? data.status : data.Status,
                        obj: data.obj || data.ExtraData
                    };
                    t.AirPie = charData.obj;
                    t.AirSensorRatio();
                })
                //视频
                api.GetVideoPie().then(res => {
                    let data = res.data;
                    data = typeof data === 'string' ? JSON.parse(data) : data;
                    let charData = {
                        status: data.hasOwnProperty('status') ? data.status : data.Status,
                        obj: data.obj || data.ExtraData
                    };
                    t.VideoPie = charData.obj;
                    t.VideoratioPie();
                })
                //网格类
                api.GetGridPie().then(res => {
                    let data = res.data;
                    data = typeof data === 'string' ? JSON.parse(data) : data;
                    let charData = {
                        status: data.hasOwnProperty('status') ? data.status : data.Status,
                        obj: data.obj || data.ExtraData
                    };
                    t.GridPie = charData.obj;
                    t.GridTypeProportionPie();
                })
                //网格员
                api.GetGridMemberPie().then(res => {
                    let data = res.data;
                    data = typeof data === 'string' ? JSON.parse(data) : data;
                    let charData = {
                        status: data.hasOwnProperty('status') ? data.status : data.Status,
                        obj: data.obj || data.ExtraData
                    };
                    t.GridMemberPie = charData.obj;
                    //console.log(t.GridMemberPie)
                    t.GridSharePie();
                })
            },
            //时间转换
            dateFtt(fmt, date){
                var o = {
                    "M+": date.getMonth() + 1,               //月份
                    "d+": date.getDate(),                    //日
                    "h+": date.getHours(),                   //小时
                    "m+": date.getMinutes(),                 //分
                    "s+": date.getSeconds(),                 //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
        },
        components: {Toolbar,ToneColor}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .Paneldataindex {
        width: 410px;
        height: auto;
        background-color: #666;
        position: absolute;
        top: 60px;
        right: 0;

        .border_bottom {
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
        }

        #list {
            background: #fff;
            position: fixed;
            width: 437px;
            height: 100%;
            top: 56px;
            right: 0;
            z-index: 9;
            box-shadow: 0px 5px 15px #333333;
            .gensui {
                .line_top{
                    position: absolute;
                    left: -258px;
                    top: 24px;
                    width: 245px;
                    height: 46px;
                    background: #fff;
                    border:solid 1px #ccc;
                }
                .line_bottom{
                    width: 320px;
                    position: absolute;
                    left: -309px;
                    bottom: 56px;
                }
            }

            img {
                position: absolute;
                top: 40%;
                left: -17px;
                cursor: pointer;
                float: left;
            }

            .main {
                height: auto;

                .table_tie {
                    width: 410px;
                    height: 405px;
                    margin: 0 auto;

                    li {
                        list-style: none;

                        height: auto;

                        .item-table1 {
                            border: solid 1px #ccc;
                            border-top: none;
                            width: 44px;
                            float: left;
                        }

                        .item-table2 {
                            border: solid 1px #ccc;
                            border-top: none;
                            border-left: none;
                            border-right: none;
                            width: 89px;
                            float: left;
                        }

                        .item-table3 {
                            border: solid 1px #ccc;
                            border-top: none;
                            width: 272px;
                            float: left;

                            p {
                                line-height: 40px;
                                font-size: 12px;
                                text-align: left;
                                padding-left: 10px;
                            }

                        }
                    }
                    .table_title {
                        color: #333;

                        .item-table1 {
                            background: #f6f6f6;
                            border: solid 1px #ccc;
                            height: 56px;
                            line-height: 56px;
                        }

                        .item-table2 {
                            background: #f6f6f6;
                            border: solid 1px #ccc;
                            border-left: none;
                            border-right: none;
                            height: 56px;
                            line-height: 56px;
                        }

                        .item-table3 {
                            background: #f6f6f6;
                            border: solid 1px #ccc;
                            height: 56px;
                            line-height: 56px;
                        }

                    }
                }
                .tongji {
                    width: 410px;
                    height: 405px;
                    margin: 0 auto;
                    margin-top: 10px;
                    border: solid 1px #ccc;
                    background: #F6F6F6;

                    .table_item {
                        padding-top: 9px;
                        float: left;
                        margin: 8px 8px;
                        width: 120px;
                        height: 85px;
                        box-shadow: 0 0 10px #ccc;
                        text-align: center;
                        background: #fff;

                        strong {
                            line-height: 42px;
                            font-size: 24px;
                            color: #555;
                        }

                        p {
                            font-size: 14px;
                            color: #888;
                        }

                    }
                }
                .bing {
                    width: 420px;
                    height: 366px;
                    margin: 0 auto;
                    margin-top: 20px;
                    .look{
                        width: 49%;
                        height: auto;
                        float: left;
                        p{
                            color: #434D55;
                            font-size: 14px;
                            font-weight:bold;
                        }
                        ul{
                            li{
                                list-style: none;
                                font-size: 12px;
                                width:100px ;
                                height: 20px;
                                float: left;
                                text-align: left;
                                padding-left: 5px;
                                img{
                                    position: inherit;
                                    width:14px ;
                                    height: auto;
                                    vertical-align: middle;
                                    margin-top: 4px;
                                    margin-right: 5px;
                                }
                            }
                        }
                    }
                    .bing_item1 {
                        width: 203px;
                        height: 180px;
                        float: left;

                    }

                    .bing_item2 {
                        width: 203px;
                        height: 180px;
                        float: left;

                    }

                    .bing_item3 {

                        width: 203px;
                        height: 180px;
                        float: left;

                    }

                    .bing_item4 {

                        width: 203px;
                        height: 180px;
                        float: left;

                    }

                }
            }
        }
    }


</style>
