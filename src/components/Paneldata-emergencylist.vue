<template>
    <div class="emergencylist">
        <!--企业监测-->
        <div id="list">
            <div class="gensui">
                <div class="line_top">
                    <toolbar @RightslideToggle="togleclick">
                        <map-handle slot="toors"></map-handle>
                    </toolbar>
                </div>
                <div class="line_bottom">
                    <div class="tuli_02">
                        <ul>
                            <li>
                                <img style="position: inherit;margin: 12px 4px;" src="../../static/imgs/yingji/icon_1.png" alt="">
                                <span>采暖期错峰企业</span>
                            </li>
                            <li>
                                <img style="position: inherit;margin: 12px 6px;" src="../../static/imgs/yingji/icon_2.png" alt="">
                                <span>应急企业</span>
                            </li>
                        </ul>
                    </div>
                    <div class="tuli_01">
                        <dl>
                            <dt style="background: #2a92eb"></dt>
                            <dt style="background: #ffb246"></dt>
                            <dt style="background: #ff5b22"></dt>
                            <dt style="background: #d31213"></dt>
                            <dd>蓝色预警</dd>
                            <dd>黄色预警</dd>
                            <dd>橙色预警</dd>
                            <dd>红色预警</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="panel">
                <img class="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img class="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <div class="tables">
                        <!--选项-->
                        <a style="margin-left: -280px;">应急污染源统计</a>
                        <strong id="context" style="position: absolute;right: 20px">收起∧</strong>
                        <div class="xian"></div>
                    </div>
                    <!--饼图-->
                    <div class="bing" id="content">
                        <div class="look">
                            <div class="bing_item1" id="bing_item1" style="width: 203px;height: 180px;"></div>
                            <div class="tuli">
                                <ul>
                                    <li><img style="position: inherit" src="../../static/imgs/piebiao/icon_lan1.png" alt="">应急企业</li>
                                    <li style="width: 120px"><img style="position: inherit" src="../../static/imgs/piebiao/icon_huang2.png" alt="">采暖期错峰企业</li>
                                </ul>
                            </div>
                        </div>
                        <div class="look">
                            <div class="bing_item2" id="bing_item2" style="width: 203px;height: 180px;"></div>
                            <div class="tuli">
                                <ul>
                                    <li style="margin-left: 30px"><img style="position: inherit" src="../../static/imgs/piebiao/icon_lan1.png" alt="">开发区</li>
                                    <li><img style="position: inherit" src="../../static/imgs/piebiao/icon_huang2.png" alt="">文安县</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!---->
                    <div class="tables">
                        <!--选项-->
                        <a >已启动应急污染数量:55/75</a>
                        <div class="xian"></div>
                    </div>
                    <!---->
                    <div class="table_container">
                        <el-table
                                :data="tableData"
                                border
                                stripe
                                highlight-current-row
                                @current-change="RowCurrentChange"
                                style="width: 400px">
                            <el-table-column
                                    property="NetworkName"
                                    label="污染源名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    property="StartingState"
                                    label="启动状态"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    property="Statues"
                                    label="行业"
                                    width="100"
                                    >
                            </el-table-column>
                            <el-table-column
                                    property="WanggeName"
                                    label="所属网格"
                                    >
                            </el-table-column>
                        </el-table>
                        <!--分页条-->
                        <div class="Pagination" style="text-align: left;margin-top: 10px;">
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-size="pagesize"
                                    layout="total, prev, pager, next"
                                    :total="totalCount">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    import Toolbar from '@/components/Toolbar'
    export default {
        name: 'emergencylist',
        data () {
            return {
                zuo:false,
                you:true,
                tableData:[],
                allData:[],
                labelType:"----",
                currentRow: null,
                pagesize: 10,
                currentPage: 1,
                totalCount:0,
                value2: '',
                filters: {name: ''},
                flag:true
            }
        },
        created(){
            //bus.$on('loadVideoData', this.initlistData);
            this.GetListqyData()
        },
        mounted(){
            //右侧收放
            let that = this;
            //
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
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
//                $("#list").toggleClass('sidebar');
//                return false;
            })
            //
            $("#context").click(function() {
                $(this).text($("#content").is(":hidden") ? "收起∧" : "展开∨");
                $("#content").slideToggle();
            });
            //
            setTimeout(function () {
                that.EmergencyEnterprisePie();
                that.RegionalStatisticsPie()
            },400)
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
            initlistData(data){
                let sudata = data;
                this.SetDataList(sudata)
                this.totalCount = this.ALLdata.length;
                this.allData = this.ALLdata;
                this.setPageTable(10,1);
            },
            //排序
            compare (propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName]
                    let value2 = object2[propertyName]
                    return value2 - value1
                }
            },
            //table行点击
            RowCurrentChange(val){
             // this.currentRow = val;
             // let latitude = this.currentRow.Latitude;//纬度
             // let longitude = this.currentRow.Longitude;//经度
             // bus.$emit('cameraEvent',{CamName:this.currentRow.VideoName},longitude, latitude);
            },
            //页码变更
            handleCurrentChange(val) {
               this.setPageTable(10,val);
                //console.log(val)
            },
            handleSizeChange(){},
            //分页部分功能
            getPointByType(type){
                let rtValue = [];
                let dt = this.data;
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
//                        if (item.type === type) {
                          rtValue.push(dt[i]);
//                        }
                    }
                }
                return rtValue;
            },
            //应急企业图1
            EmergencyEnterprisePie(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item1'));
                // 指定图表的配置项和数据
                let option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series : [
                        {
                            name:'---',
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
                    series: [{
                       data: [
                            {value:27, name:'应急企业'},
                            {value:4, name:'采暖期错峰企业'},
                        ],
                        color:[
                            '#5A95F0',
                            '#FB9B42'
                        ]
                    }]
                })
            },
            //分区图2
            RegionalStatisticsPie(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item2'));
                // 指定图表的配置项和数据
                let option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series : [
                        {
                            name:'---',
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
                    series: [{
                        data: [
                            {value:4, name:'开发区'},
                            {value:27, name:'文安县'},
                        ],
                        color:[
                            '#5A95F0',
                            '#FB9B42'
                        ]
                    }]
                })
            },
            //
            setPageTable(pageSize,pageNum){
                let rtValue = [];
                let startNum = pageSize*(pageNum-1);
                for(let i=0;i<pageSize;i++){
                    if((startNum+i+1) > this.allData.length)
                        break;
                    rtValue.push(this.allData[startNum+i]);
                }
                this.tableData = rtValue;
            },
            //设置分页所需要数据
            SetDataList(data){
                this.data = data;
                this.ALLdata = [];
                let i = 1;
                this.data.forEach(item => {
                    const tableData = {};
                    tableData.SerialNumber = i++;//序号
                    tableData.NetworkName = item.companyname;//企业名称
                    tableData.pscode = item.id;//城市id
                    tableData.Statues = '----';//行业
                    tableData.StartingState = item.buttonstate ? '启动' : '关闭';//状态
                    tableData.WanggeName =  item.threeGridName ? item.threeGridName : '----' ;//网格名称item.WanggeName
                    tableData.latitude = item.latitude;//纬度
                    tableData.longitude = item.longitude;//经度
                    this.ALLdata.push(tableData);
                })
            },
            //数据
            GetListqyData(){
                //污染企业列表
                api.GetEmergencyList().then(res => {
                    let data = res.data.ExtraData;
                    //console.log(data)
                    this.initlistData(data)
                })
            },

        },
        components: {Toolbar}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .emergencylist {
        width: 410px;
        height: auto;
        background-color: #666;
        position: absolute;
        top: 56px;
        right: 0;
        .table_container {
            margin-left: 10px;
            margin-top: 20px;
        }
        .bing {
            width: 420px;
            height: 200px;
            margin: 0 auto;
            margin-top: 20px;
            .look{
                width: 49%;
                height: auto;
                float: left;
                ul{
                    li{
                        list-style: none;
                        font-size: 10px;
                        width:80px ;
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
                    left: -368px;
                    top: 24px;
                    width: 352px;
                    height: 46px;
                    background: #fff;
                    border:solid 1px #ccc;
                }
                .line_bottom{
                    position: absolute;
                    width: 610px;
                    height:44px ;
                    //background: rgba(0,0,0,0.6);
                    bottom: 56px;
                    left:-610px;
                    .tuli_01{
                        width: 340px;
                        height: 44px;

                        float:left;
                        dl{
                            width: 100%;
                            height: 44px;
                            dt{
                                float: left;
                                height: 6px;
                                width: 85px;
                            }
                            dd{
                                float: left;
                                width: 85px;
                                height: 38px;
                                line-height: 38px;
                                background: rgba(0,0,0,0.6);
                                color: #fff;
                            }
                        }
                    }
                    .tuli_02{
                        width: 240px;
                        height: 38px;
                        background: rgba(0,0,0,0.6);
                        float:left;
                        margin-top: 6px;
                        margin-right: 30px;
                        ul{
                            li{
                                list-style: none;
                                height: 38px;
                                width: 50%;
                                line-height: 38px;
                                text-align: left;
                                float: left;
                                color: #fff;
                                padding-left:10px;
                                img{}
                                span{}
                            }
                        }
                    }
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
                .tables{
                    width: 100%;
                    line-height: 38px;
                    a{
                        margin-left: -200px;
                        display: inline-block;
                        font-size: 16px;
                        border-bottom: solid 2px #1080cc;
                        padding: 0 20px;
                        margin-bottom: -2px;
                    }
                    .xian{
                        width: 100%;
                        border:solid 1px #ccc;
                    }
                }
            }
        }
    }


</style>
