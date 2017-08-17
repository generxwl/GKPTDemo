<template>
    <div class="PaneldataGrid">
        <!--网格预测-->
        <div id="list">
            <img class="qianren" src="../assets/img/千人计划logo.png" alt="">
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
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
                                <template scope="scope">
                                    <el-button @click="ChakanClick" type="text" size="small">
                                        <i class="iconfont icon-31dingwei"></i>
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
           this.initlistData()
        },
        mounted(){
            //右侧收放
            let that = this;
            var flag = true;
            //
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
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
            initlistData(){
                this.$axios({
                    url: '/static/data/tables.json',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: {}
                }).then(res => {
                    let dt = res.data.datas.chuangan.recommend_goods;
                    this.totalCount = dt.length;
                    this.allData = dt;
                    this.setPageTable(10,1);
                    console.log(dt);

                }, res=> {
                    this.$message.error('数据读取失败哦！');
                })
            },
            //table
            RowCurrentChange(val){
                this.currentRow = val;
                console.log(this.currentRow)
            },
            //
            ChakanClick(){
                console.log('查看')
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
