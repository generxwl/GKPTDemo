<template>
    <!--冬防战报页面-->
    <div class="Like-winter">
        <div class="title">
            <h1>廊坊市空气质量智能管控平台冬防战报</h1>
            <el-button class="goback" @click="$router.go(-1)">返回上级</el-button>
        </div>
        <div class="warp_box">
            <div class="Window_one">
                <div class="item_text1">
                    <font>距下次跟新时间：15分钟</font>
                </div>
                <div class="item_text2">
                    <div class="item_box1">
                        <p style="border-right: solid 1px #ccc">廊坊市实时AQI<span>333</span></p>
                        <p>74城市AQI倒数排名<span>74</span></p>
                    </div>
                    <div class="item_box1">
                        <p style="border-right: solid 1px #ccc">74城市年倒排<span>22</span></p>
                        <p>74城市月倒排<span>22</span></p>
                    </div>
                </div>
                <div class="item_text3">
                    今日控制目标：PM2.5 PM10 SO2 NO2 O3
                </div>
                <div class="item_text4">
                    <el-carousel indicator-position="outside">
                        <el-carousel-item>
                            <div class="pm">
                                <h2>O3
                                    <span style="font-size: 14px">控制值：35</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：北华航天工业学院↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="70"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="pm">
                                <h2>SO2
                                    <span style="font-size: 14px">控制值：35</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：廊坊市政府↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="70"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="pm">
                                <h2>PM2.5
                                    <span style="font-size: 14px">控制值：35</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：廊坊技术学院↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="70"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="Window_Two" style="margin-left: 20px">
                地图部分
            </div>
            <div class="Window_Three" style="margin-left: 20px">
                <el-tabs v-model="activeName_s" @tab-click="">
                    <el-tab-pane label="廊坊市秋冬季采暖期考核" name="first_s">
                        <el-tabs v-model="activeName_a" @tab-click="">
                            <el-tab-pane label="全期" name="first_a">
                                <div class="item_banyuan"></div>
                                <div class="item_banyuan"></div>
                                <div class="item_banyuan">
                                    全期部分
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="月度" name="second_a">
                                <div class="item_banyuan"></div>
                                <div class="item_banyuan"></div>
                                <div class="item_banyuan">
                                    月度部分
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="季度" name="third_a">
                                <div class="item_banyuan"></div>
                                <div class="item_banyuan"></div>
                                <div class="item_banyuan">
                                    季度部分
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="县市区考核" name="second_s">
                        <el-tabs v-model="activeName_z" @tab-click="">
                            <el-tab-pane label="周考核" name="first_z">
                                周内容
                            </el-tab-pane>
                            <el-tab-pane label="月考核" name="second_z">
                                月内容
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="Window_Four" style="margin-top: -54px">
                <el-tabs v-model="activeName_t" @tab-click="">
                    <el-tab-pane label="市政数据" name="first_t">
                        <div class="renwu-box">
                            <div class="e_users" style="border-right: solid 1px #ccc">
                                <p>211,<span>342</span></p>
                                <a>煤改电任务用户</a>
                            </div>
                            <div class="e_users">
                                <h5>94% </h5>
                                <a>煤改电进度</a>
                            </div>
                            <div class="e_users" style="border-right: solid 1px #ccc">
                                <p>187,<span>674</span></p>
                                <a>煤改气任务用户</a>
                            </div>
                            <div class="e_users">
                                <h5>94% </h5>
                                <a>煤改气进度</a>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="用电量数据" name="second_t">
                        <div class="" style="padding: 10px 0">区县9月14日用电量</div>
                        <div id="dian_1" style="width: 366px;height: 200px;color: #fff!important;"></div>
                        <!--<div class="">-->
                            <!--<a>广阳区</a>-->
                            <!--<a>安次区</a>-->
                            <!--<a>开发区</a>-->
                            <!--<a>香河县</a>-->
                            <!--<a>大厂县</a>-->
                            <!--<a>三河市</a>-->
                            <!--<a>固安县</a>-->
                            <!--<a>永清县</a>-->
                            <!--<a>霸州市</a>-->
                            <!--<a>文安县</a>-->
                            <!--<a>大城县</a>-->
                        <!--</div>-->
                    </el-tab-pane>
                    <el-tab-pane label="经济数据" name="third_t">
                        <div class=""  style="padding: 10px 0">区县9月14日经济数据</div>
                        <div id="dian_2" style="width: 366px;height: 200px;color: #fff!important;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="数据接入进度" name="fourth_t">
                        <div class="">区县9月14日数据接入进度</div>
                        <div class="prog_box">
                            <ul class="item_progrs_left">
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                            </ul>
                            <div class="item_progrs">
                                <el-progress :percentage="10"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="20"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="30"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="40"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="50"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="60"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="70"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="80"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="90"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="100"></el-progress>
                            </div>
                        </div>

                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="Window_Five" style="margin-left: 20px;margin-top: -54px">
                <el-tabs v-model="activeName_f" @tab-click="">
                    <el-tab-pane label="空气质量检测" name="first_f">
                        <div class="table_container">
                            <el-table
                                    :data="kongqiData"
                                    border
                                    stripe
                                    highlight-current-row
                                    style="width: 400px">
                                <el-table-column
                                        property="xuhao"
                                        label="序号"
                                        width="58">
                                </el-table-column>
                                <el-table-column
                                        property="wlname"
                                        label="网格名称"
                                        width="130">
                                </el-table-column>
                                <el-table-column
                                        property="jiancedian"
                                        label="监测点"
                                        width="110">
                                </el-table-column>
                                <el-table-column
                                        property="chaowrw"
                                        label="超预警值污染物"
                                        >
                                </el-table-column>
                            </el-table>
                            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                                <el-pagination
                                        :current-page="currentPage"
                                        :page-size="pagesize"
                                        layout="total, prev, pager, next"
                                        :total="totalCount">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="工地扬尘监测" name="second_f">
                            表格22222
                    </el-tab-pane>
                    <el-tab-pane label="企业在线监测" name="third_f">
                        表格33333
                    </el-tab-pane>
                    <el-tab-pane label="散乱污视频" name="fourth_f">
                        表格44444
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="Window_six" style="margin-left: 20px;margin-top: 20px">
                <div class="data_water1">
                    <p>今天（09月04日）</p>
                    <a>AQI日报范围<span>{{20-100}}</span></a><br/>
                    <a>级别<span>{{wather}}</span></a><br/>
                    <a>首要污染物<span>{{wuranwu}}</span></a>
                    <p>晴</p>
                    <a>18-28度，微风，西南风</a>
                </div>
                <div class="data_water2">
                    <p>明天（09月05日）</p>
                    <a>AQI日报范围<span>{{20-100}}</span></a><br/>
                    <a>级别<span>{{wather}}</span></a><br/>
                    <a>首要污染物<span>{{wuranwu}}</span></a>
                    <p>晴</p>
                    <a>18-28度，微风，西南风</a>
                </div>
                <div class="data_water3">
                    <p>后天（09月06日）</p>
                    <a>AQI日报范围<span>{{20-100}}</span></a><br/>
                    <a>级别<span>{{wather}}</span></a><br/>
                    <a>首要污染物<span>{{wuranwu}}</span></a>
                    <p>晴</p>
                    <a>18-28度，微风，西南风</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'likewinter',
        data(){
            return {
                //页面数据
                activeName_s:'first_s',//默认选项
                activeName_t:'first_t',//默认选项
                activeName_f:'first_f',//默认选项
                activeName_z:'first_z',//
                activeName_a:'first_a',
                currentRow: null,
                pagesize: 5,
                currentPage: 1,
                totalCount:0,
                wather:'优~良',
                wuranwu:'PM2.5',
                kongqiData:[
                    {
                        xuhao:'1',
                        wlname:'开发区梨园村一区',
                        jiancedian:'特价商城',
                        chaowrw:'SO2'
                    },
                    {
                        xuhao:'2',
                        wlname:'开发区梨园村一区',
                        jiancedian:'特价商城',
                        chaowrw:'SO2'
                    },
                    {
                        xuhao:'3',
                        wlname:'开发区梨园村一区',
                        jiancedian:'特价商城',
                        chaowrw:'SO2'
                    },
                    {
                        xuhao:'4',
                        wlname:'开发区梨园村一区',
                        jiancedian:'特价商城',
                        chaowrw:'SO2'
                    },
                    {
                        xuhao:'5',
                        wlname:'开发区梨园村一区',
                        jiancedian:'特价商城',
                        chaowrw:'SO2'
                    }
                ]
            };
        },
        beforeCreate() {
            //beforeCreate 创建前状态====

        },
        created() {
            //created 创建完毕状态====

        },
        beforeMount() {
            //beforeMount 挂载前状态===

        },
        mounted() {
            //mounted 挂载结束状态=====
            setTimeout(()=>{
                this.ElectricityConsumption();
                this.EconomicsConsumption();
                //this.DataConsumption();
            },500)
        },
        methods: {
            // 用电量
            ElectricityConsumption(){
//                let data = this.VideoPie.map(function (v) {
//                        return {value: v.count, name: v.name}
//                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('dian_1'));
                // 指定图表的配置项和数据
                let option = {

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['用电量','增长率'],
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['广阳区','安次区','开发区','香河县','大厂县','三河市','固安县','永清县','霸州市','文安县','大城县'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位(万千瓦时)',
                            min: 0,
                            max: 800,
                            interval: 200,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff',
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        },
                        {
                            type: 'value',
                            name: '单位（%）',
                            min: -10,
                            max: 10,
                            interval: 5,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        }
                    ],
                    series: [
                        {
                            name:'用电量',
                            type:'bar',
                            data:[200.6, 500.9, 239.0, 296.4, 699.7, 470.7, 175.6, 182.2, 648.7, 718.8, 360.0],
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                        },
                        {
                            name:'增长率',
                            type:'line',
                            yAxisIndex: 1,
                            data:[1.0, 2.2, 3.3, 4.5, 6.3, 8.2, 9, 9.4, 5.0, 6.5, 2.0]
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
//                    series: [{
//                        data: data
//                    }]
                })
            },
            // 经济数据
            EconomicsConsumption(){
//                let data = this.VideoPie.map(function (v) {
//                        return {value: v.count, name: v.name}
//                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('dian_2'));
                // 指定图表的配置项和数据
                let option = {

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['产值','增长率'],
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['工业增加值','轻工业','重工业'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位(万)',
                            min: 0,
                            max: 500,
                            interval: 100,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        },
                        {
                            type: 'value',
                            name: '单位(%)',
                            min: -4,
                            max: 6,
                            interval: 2,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        }
                    ],
                    series: [
                        {
                            name:'产值',
                            type:'bar',
                            data:[200.6, 500.9, 239.0],
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                        },
                        {
                            name:'增长率',
                            type:'line',
                            yAxisIndex: 1,
                            data:[1.0, 2.2, 3.3]
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
//                    series: [{
//                        data: data
//                    }]
                })
            },
            // 数据接入
            DataConsumption(){
//                let data = this.VideoPie.map(function (v) {
//                        return {value: v.count, name: v.name}
//                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('dian_3'));
                // 指定图表的配置项和数据

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
//                    series: [{
//                        data: data
//                    }]
                })
            },
        }

    };
</script>
<style lang="scss" scoped>
    @import "../../styles/carousel";//轮播图样式
    .Like-winter{
        width: 100%;
        min-height: 800px;
        height: 100%;
        color: #fff;
        background: #242953;
        .title{
            width: 1324px;
            height: auto;
            margin: 0 auto;
            position: relative;
            h1{
                margin: 0;
                font-size: 24px;
                line-height: 80px;
                color:#b0d6fa ;
            }
            .goback{
                top:20px;
                right:10px;
                position: absolute;
                color: #fcfcfc;
                background: #0b598e;
                border: none;
            }
        }
        .warp_box{
            width: 1324px;
            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: 20px;
            margin: 0 auto;
        }
        .Window_one{
            width: 370px;
            height: 305px;
            border:solid 1px #428bca;
            background: #1d2339;
            float: left;
            overflow: hidden;
            .item_text1{
                width: 100%;
                height: 24px;
                font{
                    float: right;
                    padding-right: 10px;
                    padding-top: 4px;
                }
            }
            .item_text2{
                .item_box1{
                    width: 100%;
                    height: 18px;
                    text-align: left;
                    margin-top: 12px;

                    p{
                        width: 180px;
                        height: 18px;
                        padding-left: 20px;
                        float: left;
                    }
                    span{
                        margin-left: 2px;
                        font-weight: bold;
                        font-size: 18px;
                        color: magenta;
                    }
                }

            }
            .item_text3{
                width: 100%;
                height: 24px;
                margin-top: 20px;
                line-height: 34px;
                text-align: left;
                padding-left: 20px;
                border-top: solid 1px #ccc;
            }
            .item_text4{
                .pm{
                    h2{
                        font-size: 18px;
                        padding: 6px 4px 0 0;
                        text-align: left;
                        margin: 0 0 0 26px;
                    }
                }
                .yujing{
                    text-align: left;
                    margin-left: 24px;
                    font-size: 16px;
                    padding: 6px 0;
                }
                .Progress{
                    width: 100%;
                    height: 40px;
                    margin-left: 22px;
                    padding: 0 10px 0 0;
                }
            }
        }
        .Window_Two{
            width: 428px;
            height: 305px;
            border:solid 1px #428bca;
            background: #1d2339;
            float: left;
            overflow: hidden;
        }
        .Window_Three{
            width: 480px;
            height: 378px;
            border:solid 1px #428bca;
            background: #1d2339;
            float: left;
            overflow: hidden;
            //采暖考核模块
            .item_banyuan{
                width: 460px;
                height: 88px;
                margin-top: 9px;
                border:solid 1px #7c7056;
                margin-left: 9px;
            }
        }
        .Window_Four{
            width: 370px;
            height: 276px;
            border:solid 1px #428bca;
            background: #1d2339;
            float: left;
            overflow: hidden;
            .prog_box{
                .item_progrs_left{
                    width: 20%;
                    float: left;
                    padding-left: 4%;
                    margin-right: 5%;
                    li{
                        list-style: none;
                    }
                }
                .item_progrs{
                    margin-top: 2.5px;
                    width: 70%;
                    float: left;
                }
            }
            .renwu-box{
                width: 300px;
                height: auto;
                margin: 0 auto;
                .e_users{
                    width: 150px;
                    height: 60px;
                    margin-top: 35px;
                    float: left;
                    p{
                        margin: 0;
                        color: #8079eb;
                        font-size: 22px;
                        font-weight:bold;
                        padding: 3px;
                        span{
                            font-size: 14px;
                        }
                    }
                    h5{
                        margin: 6px;
                        color: #45edf8;
                        font-size: 22px;
                    }
                }
            }

        }
        .Window_Five{
            width: 428px;
            height: 276px;
            border:solid 1px #428bca;
            background: #1d2339;
            float: left;
            overflow: hidden;
        }
        .Window_six{
            width: 480px;
            height: 202px;
            border:solid 1px #428bca;
            background: #1d2339;
            overflow: hidden;
            float: left;
            .data_water1{
                margin-top: 18px;
                width: 158px;
                height: auto;
                border-right: solid 1px #1080cc;
                float: left;
                p{
                    color: #fff;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                a{
                    display: inline-block;
                    width: 100%;
                    margin-top: 4px;
                    padding-left: 14px;
                    color: #9ea9c7;
                    font-size:12px ;
                    line-height: 20px;
                    text-align: left;
                }
                span{
                    color: #fff;
                }
            }
            .data_water2{
                margin-top: 18px;
                width: 158px;
                height: auto;
                border-right: solid 1px #1080cc;
                float: left;
                p{
                    color: #fff;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                a{
                    display: inline-block;
                    width: 100%;
                    margin-top: 4px;
                    padding-left: 14px;
                    color: #9ea9c7;
                    font-size:12px ;
                    line-height: 20px;
                    text-align: left;
                }
                span{
                    color: #fff;
                }
            }
            .data_water3{
                margin-top: 18px;
                float: left;
                width: 158px;
                height: auto;
                p{
                    color: #fff;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                a{
                    display: inline-block;
                    width: 100%;
                    margin-top: 4px;
                    padding-left: 14px;
                    color: #9ea9c7;
                    font-size:12px ;
                    line-height: 20px;
                    text-align: left;
                }
                span{
                    color: #fff;
                }
            }
        }
    }
</style>