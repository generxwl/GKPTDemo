<template>
    <div class="PaneldataOnlineList">
        <div id="list">
            <img class="qianren" src="../assets/img/千人计划logo.png" alt="">
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <div class="kbiaoti">工地监测点排名</div>
                    <div class="bluexian"></div>
                    <!--选项查询-->
                    <div class="first">
                        <div class="tables">
                            <!--选项-->
                            <a href="##" class="bai">当前时间</a>
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
                    <!--排名-->
                    <div class="table_container">
                        <el-table
                                :data="tableData"
                                border
                                stripe
                                highlight-current-row
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
                                    property="pm"
                                    label="PM2.5"
                                    width="100">
                            </el-table-column>
                        </el-table>
                        <!--分页条-->
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
        name: 'PaneldataOnlineList',
        data () {
            return {
                zuo:false,
                you:true,
                tableData: [],
                allData:[],
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
            //console.log(123)
            this.initlistData()
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
                    let dt = res.data.datas.yangchen.recommend_goods;
                    this.totalCount = dt.length;
                    this.allData = dt;
                    this.setPageTable(10,1);
                    console.log(dt);

                }, res=> {
                    console.log('失败了')
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

    .PaneldataOnlineList {
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
                            width: 90px;
                            margin-right: 30px;
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
                .table_container{
                    margin-left: 16px;
                }
            }
        }
    }


</style>
