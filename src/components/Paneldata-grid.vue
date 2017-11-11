<template>
    <div class="PaneldataGrid">
        <!--网格预测-->
        <div id="list">
            <div class="panel">
                <img class="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img class="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <div class="kbiaoti">京津冀地区污染排放对廊坊的影响贡献及重点源分布</div>
                    <div class="bluexian"></div>

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
                                    property="InControl"
                                    label="名称"
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    property="hangye"
                                    label="行业"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    property="actions"
                                    label="查看地址"
                                    width="80">
                                <template slot-scope="scope">
                                    <el-button @click="ChakanClick(scope.$index, scope.row)" type="text" size="small">
                                        <img class="mapdw" src="../assets/img/map.png" alt="">

                                    </el-button>
                                </template>
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
    //import api from '../api/index'
    export default {
        name: 'PaneldataGrid',
        data () {
            return {
                zuo:false,
                you:true,
                tableData:[],
                allData:[],
                currentRow: null,
                pagesize: 10,
                currentPage: 1,
                totalCount:0,
                value2: '',
            }
        },
        created(){
            bus.$on('getGridData',this.initlistData);
        },
        mounted(){
            //右侧收放
            let that = this;
            var flag = true;
            //
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
            $('.shrink').on('click', function () {
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
                this.currentRow = val;
                //console.log(this.currentRow)
            },
            //查看地址
            ChakanClick(index,item){
                //console.log('查看地址')
               // console.log(index)
               // console.log(item)
                let citygid = item.citygid;//城市id
                let latitude = item.latitude;//纬度
                let longitude = item.longitude;//经度
                bus.$emit('locationGridPoint',longitude, latitude,citygid);
            },
            //每页显示数据量变更
            handleSizeChange(val) {
                //this.pagesize = val;
            },
            //页码变更
            handleCurrentChange(val) {
                this.setPageTable(10,val);
                //console.log(val)
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
                    //tableData.ranking = i++;//排名
                    tableData.InControl = item.companyname;//类型
                    tableData.hangye = item.industry;//行业
                    //tableData.actions = item.address;//地址
                    tableData.citygid = item.id;//城市id
                    tableData.latitude = item.point_lat;//纬度
                    tableData.longitude = item.point_lng;//经度
                    this.ALLdata.push(tableData);
                })
            },
            //时间转换
            dateFtt(fmt, date){
                var o = {
                    "M+": date.getMonth() + 1,                 //月份
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .PaneldataGrid {
        width: 410px;
        height: auto;
        background-color: #666;
        position: absolute;
        top: 56px;
        right: 0;
        .mapdw{
            width: 25px;
            height: 25px;
            display: block;
            margin: -5px 43px;
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
                    margin-bottom: 16px;
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
