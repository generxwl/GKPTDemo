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
                                {{Datalist.weather}}
                            </div>
                            <p>温度：{{Datalist.temp}}</p>
                            <p>湿度：{{Datalist.humi}}</p>
                            <p>风力：{{Datalist.wl}}</p>
                            <p>降雨量：{{Datalist.rain}}</p>
                        </div>
                        <div class="yuanjindu">
                            <div class="jdflaot" >
                                <div id="main1" style="width: 90px;height: 90px"></div>
                                <div class="texts">{{Datalist.aqi}}</div>
                                <p>小时AQI</p>
                            </div>

                            <div class="jdflaot" >
                                <div id="main2" style="width: 90px;height: 90px"></div>
                                <div class="texts">{{Datalist.aqiAccu}}</div>
                                <p>当日累计AQI</p>
                            </div>
                            <div class="jdflaot" >
                                <div id="main3" style="width: 90px;height: 90px"></div>
                                <div class="texts">{{Datalist.ComplexIndex}}</div>
                                <p>小时综合指数</p>
                            </div>
                        </div>
                        <div class="ph" style="margin-bottom:20px">
                            <ul>
                                <li :style="{background:Datalist.pm25Color}">PM2.5</li>
                                <li :style="{background:Datalist.pm10Color}">PM10</li>
                                <li :style="{background:Datalist.so2Color}">SO2</li>
                                <li :style="{background:Datalist.coColor}">CO</li>
                                <li :style="{background:Datalist.no2Color}">NO2</li>
                                <li :style="{background:Datalist.o3Color}">O3</li>
                            </ul>
                            <ol>
                                <li>{{Datalist.pm25}}</li>
                                <li>{{Datalist.pm10}}</li>
                                <li>{{Datalist.so2}}</li>
                                <li>{{Datalist.co}}</li>
                                <li>{{Datalist.no2}}</li>
                                <li>{{Datalist.o3}}</li>
                            </ol>
                        </div>
                        <div class="wrjingdu"  style="display: none;">
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
                            <strong>今日空气质量预计为：{{Datalist.qulity}}</strong>
                        </div>
                    </div>
                    <!--table表格-->
                    <div class="table">
                        <el-tabs type="border-card"  @tab-click="handleClick">
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
                                            :label="type"
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
                                            :label="type"
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
                //国控点
                ptType: '国控点',
                type:'AQI',
                tableData: [],
                allData:[],
                //省控点
                SKtableData: [],
                SKallData:[],
                //关心城市
                GXtableData: [],
                GXallData:[],
                //倒数十名
                DStableData: [],
                DSallData:[],
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
                value2: '',
                Datalist:{}
            }
        },
        created(){
            api.GetLfAirData().then(res=>{
               let shoulist = JSON.parse(res.data);
                this.Datalist = shoulist.obj
                console.log(this.Datalist)
            })
            bus.$on('switchRender', this.switchRender);
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
            //圆进度图
            setTimeout(function () {
                that.yuantuset1();
                that.yuantuset2();
                that.yuantuset3()
            },500)
        },
        methods: {
            //排序
            compare (propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName]
                    let value2 = object2[propertyName]
                    return value1 - value2
                }
            },
            //监听数据
            setdata(data, type){
                this.data = data;
                this.tableData = [];
                console.log(type)
                let i = 1;
                let dt1 = this.getPointByType(this.ptType);
                let dt2 = dt1.sort(this.compare(type.toLowerCase()));
                dt2.forEach(item => {
                    const tableData = {};
                    tableData.ranking = i++;
                    tableData.InControl = item.type;
                    tableData.AirQualityGrade = item.quality;
                    tableData.aqi = item[type.toLowerCase()];
                    tableData.PrimaryPollutant = item.primary_pollutant;
                    this.tableData.push(tableData);

                })
            },
            switchRender(type){
                this.type = type;
                this.setdata(this.data, this.type)
            },
            //切换
            handleClick(tab, event) {
                this.ptType = tab.label
                bus.$emit('tabClick',tab.label)
                this.setdata(this.data, this.type)
            },
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
            //圆图api
            yuantuset1(){
                let Datavlue = 500-this.Datalist.aqi;
                let Bianvlue = this.Datalist.aqi;
                let Color = this.Datalist.aqiColor;
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('main1'));
                app.title = '环形图';
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['API']
                    },
                    series: [
                        {
                            name:'api',
                            type:'pie',
                            radius: ['100%', '90%'],
                            avoidLabelOverlap: false,
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
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
                    series:[{
                        data:[
                            {value:Datavlue, name:'占比'},
                            {value:Bianvlue, name:'api'}

                        ],
                        color:[
                            '#ccc',
                            Color
                        ]
                    }]
                })
            },
            //圆图累计api
            yuantuset2(){
                let Datavlue = 500-this.Datalist.aqiAccu;
                let Bianvlue = this.Datalist.aqiAccu;
                let Color = this.Datalist.accuAqiColor;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main2'));
                app.title = '环形图';
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['API']
                    },
                    series: [
                        {
                            name:'api',
                            type:'pie',
                            radius: ['100%', '90%'],
                            avoidLabelOverlap: false,
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
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
                    series:[{
                        data:[
                            {value:Datavlue, name:'占比'},
                            {value:Bianvlue, name:'api'}

                        ],
                        color:[
                            '#ccc',
                            Color
                        ]
                    }]
                })
            },
            //圆图综合
            yuantuset3(){
                let Datavlue = 112.53-this.Datalist.ComplexIndex;
                let Bianvlue = this.Datalist.ComplexIndex;
                let Color = this.Datalist.aqiColor;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main3'));
                app.title = '环形图';
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['API']
                    },
                    series: [
                        {
                            name:'api',
                            type:'pie',
                            radius: ['100%', '90%'],
                            avoidLabelOverlap: false,
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
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
                    series:[{
                        data:[
                            {value:Datavlue, name:'占比'},
                            {value:Bianvlue, name:'api'}

                        ],
                        color:[
                            '#ccc',
                            Color
                        ]
                    }]
                })
            },
            //每页显示数据量变更
            handleSizeChange(val) {
                //this.pagesize = val;
            },

            //页码变更
            handleCurrentChange(val) {
                this.setPageTable(10,val);
                console.log(val)
            },
            setPageTable(pageSize,pageNum){
                let rtValue = [];
                let startNum = pageSize*(pageNum-1);
                for(let i=0;i<pageSize;i++){
                    if((startNum+i+1) > this.allData.length)
                        break;
                    rtValue.push(this.allData[startNum+i]);
                }
                this.tableData = rtValue;
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
                        .jdflaot {
                            margin-top: 15px;
                            margin-bottom: 8px;
                            float: left;
                            margin-left: 8px;
                            p {
                                text-align: center;
                                font-size: 14px;
                            }
                        }
                        div{
                            margin-bottom: 8px;
                            position: relative;
                            .texts{
                                width: 100%;
                                height: 30px;
                                position: absolute;
                                top:32px;
                                text-align: center;
                                font-size: 18px;
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
