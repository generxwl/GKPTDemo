<template>
    <div class="PaneldataCgw">
        <!--传感网面板-->
        <div id="list">
            <img class="qianren" src="../assets/img/千人计划logo.png" alt="">
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <div class="kbiaoti">监测点排名</div>
                    <div class="bluexian"></div>
                    <!--选项查询-->
                    <div class="first">
                        <div class="tables">
                            <!--选项-->
                            <a id="shishi" @click="RealTimeFatch()" class="bai">实时</a>
                            <a id="leiji" @click="CumulativeFatch()">累计</a>
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
                            <button @click="ChaXunJianCe()">查询</button>
                        </div>
                    </div>
                    <!--排名-->
                    <div class="table_container">
                        <el-table
                                :data="tableData"
                                border
                                stripe
                                highlight-current-row
                                @current-change="RowCurrentChange"
                                style="width: 400px">
                            <el-table-column
                                    property="ranking"
                                    label="排名"
                                    width="80">
                            </el-table-column>
                            <el-table-column
                                    property="InControl"
                                    label="名称"
                                    width="220">
                            </el-table-column>
                            <el-table-column
                                    property="aqi"
                                    :label="type"
                                    width="100">
                            </el-table-column>
                        </el-table>
                        <div class="Pagination" style="text-align: left;margin-top: 10px;">
                            <el-pagination
                                    @size-change="handleSizeChange"
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
    export default {
        name: 'PaneldataCgw',
        data () {
            return {
                zuo:false,
                you:true,
                ALLdata:[],
                tableData:[],
                allData:[],
                type: 'AQI',
                currentRow: null,
                pagesize: 10,
                currentPage: 1,
                totalCount:0,
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
            }
        },
        created(){
            //初始化地图数据监听展示页面
            bus.$on('loadMarkerData', this.initlistData);
            bus.$on('refreshTarget', this.refreshTable);
        },
        mounted(){
            //右侧收放
            let that = this;
            var flag = true;
            //实时累计切换样式
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
            //右边伸缩框加载动画
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
            //
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
            //初始数据
            initlistData(data,type){
                    this.type = type;
                    let sudata = data;
                    this.SetDataList(sudata, type)
                    this.totalCount = this.ALLdata.length;
                    this.allData = this.ALLdata;
                    this.setPageTable(10,1);
            },
            //type更改
            refreshTable(type){
                this.type = type;
                if(this.type == 'PM25'){
                    this.type = this.type.replace('PM25','PM2.5')
                }
                //console.log(this.type)
                this.SetDataList(this.data, type);
                this.totalCount = this.ALLdata.length;
                this.allData = this.ALLdata;
                this.setPageTable(10,1);
            },
            //设置分页所需要数据
            SetDataList(data, type){
                this.data = data;
                this.ALLdata = [];
                let i = 1;
                let dt1 = this.getPointByType(this.ptType);
                let dt2 = dt1.sort(this.compare(type.toLowerCase()));
                dt2.forEach(item => {
                    const tableData = {};
                    tableData.ranking = i++;//排名
                    tableData.InControl = item.stationname;//类型
                    tableData.citygid = item.stationid;//城市id
                    tableData.latitude = item.latitude;//纬度
                    tableData.longitude = item.longitude;//经度
                    tableData.aqi = item[type.toLowerCase()];//数值
                   // console.log(this.getPollution(tableData.aqi))
                    this.ALLdata.push(tableData);
                })
            },
//            getPollution(type){
//                let rtValue = type;
//                switch(type){
//                    case 'PM25':
//                        rtValue = 'PM2.5';
//                        break;
//                }
//                return rtValue;
//            },
            //查询
            ChaXunJianCe(){
                let t = this;
                let time = this.dateFtt('yyyy-MM-dd hh:00:00',this.value2);
                api.ChaxunGetFcStationList(time).then(res=>{
                    console.log('时间查询数据')
                    let shoulist = JSON.parse(res.data);
                    let sudata = shoulist.obj;
                    this.SetDataList(sudata, this.type)
                    this.totalCount = this.ALLdata.length;
                    this.allData = this.ALLdata;
                    this.setPageTable(10,1);
                })
            },
            //实时
            RealTimeFatch(){
                    api.GetFcStationList().then(res=>{
                    let shoulist = JSON.parse(res.data);
                    let sudata = shoulist.obj;
                    this.SetDataList(sudata, this.type)
                    this.totalCount = this.ALLdata.length;
                    this.allData = this.ALLdata;
                    this.setPageTable(10,1);
                })
            },
            //累计
            CumulativeFatch(){
                this.$notify({
                    title: '温馨提示！',
                    message: '此功能正在开发中！敬请期待',
                    type: 'warning'
                });
            },
            //table点击事件
            RowCurrentChange(val){
                this.currentRow = val;
               let citygid = this.currentRow.citygid;//城市id
               let latitude = this.currentRow.latitude;//纬度
               let longitude = this.currentRow.longitude;//经度
               bus.$emit('loadChart',longitude, latitude,citygid);
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
            //分页部分功能
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
            //渲染部分
            switchRender(type){
                this.type = type;
                this.setdata(this.data, this.type)
            },
            //分页部分功能
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
            //时间转换
            dateFtt(fmt, date){
                var o = {
                    "M+": date.getMonth() + 1,   //月份
                    "d+": date.getDate(),        //日
                    "h+": date.getHours(),       //小时
                    "m+": date.getMinutes(),     //分
                    "s+": date.getSeconds(),     //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()   //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .PaneldataCgw {
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
                        #shishi{
                            border-bottom-right-radius: 0;
                            border-top-right-radius: 0;
                        }
                        #leiji{
                            border-bottom-left-radius: 0;
                            border-top-left-radius: 0;
                        }
                        .bai {
                            background: #f1f1f1
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
                            background: #fff;
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
                .table_container{
                    margin-left: 16px;
                }
            }
        }
    }


</style>
