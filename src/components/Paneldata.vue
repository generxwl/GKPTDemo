<template>
    <div class="Paneldata">
        <div id="list">
            <img class="qianren" src="../assets/img/千人计划logo.png" alt="">
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <div class="kbiaoti">大气监测点排名</div>
                    <div class="bluexian"></div>
                    <!--选项查询-->
                    <div class="first">
                        <div class="tables">
                            <!--选项-->
                            <a href="##" class="bai">实时</a>
                            <a href="##">累计</a>
                        </div>
                        <div class="shijian">
                            <!--时间选择-->
                            <div class="block">
                                <el-date-picker
                                        v-model="value2"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        align="right"
                                        :picker-options="pickerOptions1">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="btnns">
                            <button>查询</button>
                        </div>
                    </div>
                    <!--详细天气-->
                    <div class="tqbiaoti">廊坊市空气质量</div>
                    <div class="Second">
                        <div class="tianqi">
                            <!--天气-->

                            <div class="tqbj">

                            </div>
                            <p>温度：{{}}</p>
                            <p>湿度：{{}}</p>
                            <p>风力：{{}}</p>
                            <p>降雨量：{{}}</p>
                        </div>
                        <div class="yuanjindu">
                            <div class="jdflaot">
                                <el-progress type="circle" :percentage="33"></el-progress>
                                <p>小时AQI</p>
                            </div>
                            <div class="jdflaot">
                                <el-progress type="circle" :percentage="25"></el-progress>
                                <p>当日累计AQI</p>
                            </div>
                            <div class="jdflaot">
                                <el-progress type="circle" :percentage="86"></el-progress>
                                <p>小时综合指数</p>
                            </div>
                        </div>
                        <div class="ph">
                            <ul>
                                <li style="background:#00e400;">PM2.5</li>
                                <li style="background:#ffff00;">PM10</li>
                                <li style="background:#ff7e00;">SO2</li>
                                <li style="background:#ff0000;color: #fff">CO</li>
                                <li style="background:#99004c;color: #fff">NO2</li>
                                <li style="background:#7e0023;color: #fff">O3</li>
                            </ul>
                            <ol>
                                <li>53</li>
                                <li>98</li>
                                <li>16</li>
                                <li>1.100</li>
                                <li>42</li>
                                <li>72</li>
                            </ol>
                        </div>
                        <div class="wrjingdu">
                            <p>主要污染物PM2.5</p>
                            <div class="jdhezi">
                                <div class="font">日</div>
                                <div class="tiaojd">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="20"></el-progress>
                                </div>
                            </div>
                            <div class="jdhezi">
                                <div class="font">月</div>
                                <div class="tiaojd">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="20"></el-progress>
                                </div>
                            </div>
                            <div class="jdhezi">
                                <div class="font">年</div>
                                <div class="tiaojd">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="20"></el-progress>
                                </div>
                            </div>
                            <strong>今日空气质量预计为：良{{}}</strong>
                        </div>
                    </div>
                    <!--table表格-->
                    <div class="table">
                        <el-tabs type="border-card">
                            <el-tab-pane label="国控点">
                                <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                    <el-table-column
                                            prop="ranking"
                                            label="排名"
                                            width="52">
                                    </el-table-column>
                                    <el-table-column
                                            prop="InControl"
                                            label="国控点"
                                            width="150"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="AirQualityGrade"
                                            label="空气质量等级"
                                            width="75"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="aqi"
                                            label="AQI"
                                            width="60"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="PrimaryPollutant"
                                            label="首要污染物"
                                            width="65"
                                    >
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <el-tab-pane label="省控点">

                            </el-tab-pane>
                            <el-tab-pane label="关心城市">

                            </el-tab-pane>
                            <el-tab-pane label="倒数前十城市">

                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    export default {
        name: 'paneldata',
        data () {
            return {
                zuo:false,
                you:true,
                tableData: [{
                    ranking: '1',//排名
                    InControl: '北华航天工业学院',//国控点
                    AirQualityGrade: '重度污染',//空气等级
                    aqi: '303',//aqi
                    PrimaryPollutant: 'PM2.5'//首要污染物
                }, {
                    ranking: '2',//排名
                    InControl: '河北工业大学',//国控点
                    AirQualityGrade: '轻度污染',//空气等级
                    aqi: '303',//aqi
                    PrimaryPollutant: 'PM2.5'//首要污染物
                }, {
                    ranking: '3',//排名
                    InControl: '廊坊第十中学',//国控点
                    AirQualityGrade: '良',//空气等级
                    aqi: '303',//aqi
                    PrimaryPollutant: 'PM2.5'//首要污染物
                }, {
                    ranking: '4',//排名
                    InControl: '新世纪中学',//国控点
                    AirQualityGrade: '良',//空气等级
                    aqi: '303',//aqi
                    PrimaryPollutant: 'PM2.5'//首要污染物
                }],
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: ''
            }
        },
        created(){
//            this.$axios({
//                url: '/static/data/tables.json',
//                method: 'GET',
//                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//                data: {}
//            }).then(res => {
//                console.log(res)
//            }, res=> {
//                console.log('失败了')
//            })
            api.GetLfAirData().then(res=>{
                console.log(res)
            })
        },
        mounted(){
            //右侧收放
            let that = this;
            var flag = true;
            $('#list #shrink').on('click', function () {
                if (flag) {
                    that.zuo=true;
                    that.you=false;
                    $('#list').animate({
                        'right': '-437px'
                    });
                    flag = false;
                } else {
                    that.zuo=false;
                    that.you=true;
                    $('#list').animate({
                        'right': '0px'
                    });
                    flag = true;
                }
            })
            //传递数据
            bus.$on('refreshRanking',this.setdata)
        },
        methods: {
            setdata(data, type){
                console.log('nnnnnnnn')
                console.log(data)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .Paneldata {
        width: 410px;
        height: auto;
        background-color: #666;
        position: absolute;
        top: 60px;
        right: 0;
        #list {
            background: #fff;
            position: fixed;
            width: 437px;
            height: 100%;
            top: 62px;
            right: 0;
            z-index: 9;
            box-shadow: 0 0 15px #333333;
            .qianren {
                position: absolute;
                left: -156px;
                top: 499px;
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
                .kbiaoti {
                    padding: 10px 0px;
                }
                .bluexian {
                    width: 26px;
                    border: 1px solid #1080cc;
                    margin: 0 auto;
                }
                .first {
                    width: 100%;
                    height: 44px;
                    margin-top: 30px;
                    .tables {
                        float: left;
                        margin-left: 14px;
                        .bai {
                            background: #fff
                        }
                        a {
                            float: left;
                            text-decoration: none;
                            color: #666;
                            display: inline-block;
                            line-height: 34px;
                            width: 60px;
                            height: 34px;
                            border: solid 1px #ccc;
                            background: #f1f1f1;
                            border-radius: 2px;
                        }
                    }
                    .shijian {
                        float: left;
                        margin-left: 6px;
                    }
                    .btnns {
                        float: left;
                        margin-left: 6px;
                        button {
                            border: none;
                            width: 80px;
                            height: 34px;
                            background: #1080cc;
                            color: #fff;
                            border-radius: 4px;
                        }
                    }
                }
                .tqbiaoti {
                    width: 100%;
                    height: 22px;
                    padding-left: 20px;
                    text-align: left;
                    margin-left: 16px;
                    border-left: solid 3px #2a6496;
                }
                .Second {
                    width: 100%;
                    height: auto;
                    .tianqi {
                        float: left;
                        margin-left: 20px;
                        margin-right: 20px;
                        .tqbj {
                            width: 64px;
                            height: 64px;
                            background: url("../assets/img/tq.png");
                        }
                        p {
                            font-size: 12px;
                            margin: 0 !important;
                        }

                    }
                    .yuanjindu {
                        /*APP写进去*/
                        width: 100%;
                        height: 150px;
                        .el-progress-circle {
                            width: 80px;
                            height: 80px;
                        }
                        .jdflaot {
                            margin-top: 30px;
                            float: left;
                            margin-left: 15px;
                            p {
                                text-align: center;
                                font-size: 14px;

                            }
                        }
                    }
                    .ph {
                        ul {
                            padding-left: 20px;
                            width: 100%;
                            height: 30px;
                            padding-bottom: 0;
                            li {
                                font-size: 14px;
                                width: 64px;
                                height: 30px;
                                line-height: 30px;
                                float: left;
                                list-style: none;
                                //border: solid 1px #ccc;
                                margin-left: 1px;
                            }
                        }
                        ol {
                            padding-left: 20px;
                            width: 100%;
                            height: 30px;
                            margin-bottom: 6px;
                            li {
                                margin-top: 1px;
                                font-size: 14px;
                                width: 64px;
                                height: 30px;
                                line-height: 30px;
                                float: left;
                                list-style: none;
                                //border: solid 1px #ccc;
                                margin-left: 1px;
                                background: #ccc;
                            }
                        }
                    }
                    .wrjingdu {
                        width: 100%;
                        height: auto;
                        p {
                            text-align: left;
                            padding: 4px 20px;
                        }
                        .jdhezi {
                            height: 24px;
                            .font {
                                margin-left: 30px;
                                text-align: center;
                                width: 30px;
                                font-size: 14px;
                                float: left;
                            }
                            .tiaojd {
                                float: left;
                                width: 300px;
                            }
                        }
                        strong{
                            width: 100%;
                            display: inherit;
                            margin-left: 18px;
                            text-align: left;
                        }
                    }
                }
                .table {
                    //表格部分
                    overflow: auto;
                    font-size: 10px !important;
                }
            }
        }
    }


</style>
