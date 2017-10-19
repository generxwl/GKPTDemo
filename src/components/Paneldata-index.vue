<template>
    <div class="Paneldataindex">
        <!--首页面板-->
        <div id="list">
            <div class="qianren">
                <img style="margin-top: -180px;margin-left: 15px" src="../assets/img/fulu.png" alt="">
                <map-handle></map-handle>
            </div>
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
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
                                <div class="bing_item1" id="bing_item1" style="width: 203px;height: 180px;">

                                </div>
                                <div class="bing_item2" id="bing_item2" style="width: 203px;height: 180px;">

                                </div>
                                <div class="bing_item3" id="bing_item3" style="width: 203px;height: 180px;">

                                </div>
                                <div class="bing_item4" id="bing_item4" style="width: 203px;height: 180px;">

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
                                    <div class="item-table2" style="height: 40px;line-height: 40px">环保局</div>
                                    <div class="item-table3" style="height: 40px;line-height: 40px">
                                        <p>接入TVOC视频监控50个，正常49个，离线1个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 200px;line-height: 200px">2</div>
                                    <div class="item-table2" style="height: 200px;line-height: 200px">开发区管委会</div>
                                    <div class="item-table3" style="height: 200px;">
                                        <p>接入TVOC视频监控50个，正常49个，离线1个</p>
                                        <p>接入小散乱污视频15个，正常10个，离线5个</p>
                                        <p>接入空气质量传感器60个，正常50个，离线10个</p>
                                        <p>接入扬尘传感器60个，正常50个，离线10个</p>
                                        <p>接入TVOC传感器50个，离线50个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 80px;line-height: 80px">3</div>
                                    <div class="item-table2" style="height: 80px;line-height: 80px">广阳区政府</div>
                                    <div class="item-table3" style="height: 80px;">
                                        <p>接入TVOC视频监控50个，正常49个，离线1个</p>
                                        <p>接入小散乱污视频15个，正常10个，离线5个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 200px;line-height: 200px">4</div>
                                    <div class="item-table2" style="height: 200px;line-height: 200px">安次区政府</div>
                                    <div class="item-table3" style="height: 200px;">
                                        <p>接入TVOC视频监控50个，正常49个，离线1个</p>
                                        <p>接入小散乱污视频15个，正常10个，离线5个</p>
                                        <p>接入空气质量传感器60个，正常50个，离线10个</p>
                                        <p>接入扬尘传感器60个，正常50个，离线10个</p>
                                        <p>接入TVOC传感器50个，离线50个</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-table1" style="height: 80px;line-height: 80px">5</div>
                                    <div class="item-table2" style="height: 80px;line-height: 80px">市建设局</div>
                                    <div class="item-table3" style="height: 80px;">
                                        <p>接入工地视频监控60个，正常50个，离线10个</p>
                                        <p>煤改气数据最近跟新时间：2017-10-16</p>
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
    import MapHandle from '@/map/controls/MapHandle'
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
            }
        },

        created(){
            api.GetXhHbPoints().then(res => {
                console.log('')
                let data = res.data;
                data = typeof data === 'string' ? JSON.parse(data) : data;
                data = {
                    status: data.hasOwnProperty('status') ? data.status : data.Status,
                    obj: data.obj || data.ExtraData
                };
                this.Statistics = data.obj;

            })
            this.GetEcharsData()
        },
        mounted(){
            //右侧收放
            let that = this;
            var flag = true;
            //
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
            //
            $('#list #shrink').on('click', function () {
                if (flag) {
                    that.zuo = true;
                    that.you = false;
                    $('#list').animate({
                        'right': '-437px'
                    });
                    flag = false;
                } else {
                    that.zuo = false;
                    that.you = true;
                    $('#list').animate({
                        'right': '0px'
                    });
                    flag = true;
                }
            })
        },
        methods: {
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
            yuantuset1(){
                let data = this.AirPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item1'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '空气传感器占比',
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        },
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        top: 50
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '60%',
                            center: ['30%', '60%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
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
                    legend: {
                        data: data.map(function (v) {
                            return v.name
                        })
                    },
                    series: [{
                        data: data
                    }]
                })
            },
            //视频类型占比
            yuantuset2(){
                let data = this.VideoPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item2'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '视频类型占比',
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        },
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        textStyle: {
                            fontSize: '10',
                            fontWeight: 'bold'
                        },
                        top: 50
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '60%',
                            center: ['30%', '60%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
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
                    legend: {
                        data: data.map(function (v) {
                            return v.name
                        })
                    },
                    series: [{
                        data: data
                    }]
                })
            },
            //网络类型占比
            yuantuset3(){
                let data = this.GridPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item3'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '网络类型占比',
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        },
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        top: 50
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '60%',
                            center: ['30%', '50%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
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
                    legend: {
                        data: data.map(function (v) {
                            return v.name
                        })
                    },
                    series: [{
                        data: data
                    }],
                })
            }
            ,
            //网格员占比
            yuantuset4(){
                let data = this.GridMemberPie.map(function (v) {
                        return {value: v.count, name: v.name}
                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item4'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '网络员占比',
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        },
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        top: 50
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '60%',
                            center: ['30%', '50%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
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
                    legend: {
                        data: data.map(function (v) {
                            return v.name
                        })
                    },
                    series: [{
                        data: data
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
                    t.yuantuset1();
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
                    t.yuantuset2();
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
                    t.yuantuset3();
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
                    t.yuantuset4();
                })
            }
            ,
            //时间转换
            dateFtt(fmt, date)
            {
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
            }
            ,
            //fangfa

        },
        components: {MapHandle}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .Paneldataindex {
        width: 410px;
        height: auto;
        background-color: #666;
        position: absolute;
        top: 50px;
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
            top: 51px;
            right: 0;
            z-index: 9;
            box-shadow: 0 0 15px #333333;

            .qianren {
                position: absolute;
                left: -80px;
                top: 64%;
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
                    background: #f0f7ff;

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

                    .bing_item1 {
                        width: 203px;
                        height: 180px;
                        float: left;

                    }

                    .bing_item2 {
                        width: 203px;
                        height: 180px;
                        float: left;
                        overflow: hidden;
                    }

                    .bing_item3 {
                        margin-top: 20px;
                        width: 203px;
                        height: 180px;
                        float: left;

                    }

                    .bing_item4 {
                        margin-top: 20px;
                        width: 203px;
                        height: 180px;
                        float: left;

                    }

                }
            }
        }
    }


</style>
