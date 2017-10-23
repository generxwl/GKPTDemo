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
                        <el-carousel-item v-for="item in 4" :key="item">
                            <div class="pm">
                                <h2>PM2.5
                                    <span style="font-size: 14px">控制值：35</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：北华航天工业学院↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 100%">
                                    控制进度：
                                    <el-progress :percentage="70"></el-progress>
                                </p>
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
                                全期内容图表
                            </el-tab-pane>
                            <el-tab-pane label="月度" name="second_a">
                                月度内容图表
                            </el-tab-pane>
                            <el-tab-pane label="季度" name="third_a">
                                季度内容图表
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

                    </el-tab-pane>
                    <el-tab-pane label="用电量数据" name="second_t">

                    </el-tab-pane>
                    <el-tab-pane label="经济数据" name="third_t">

                    </el-tab-pane>
                    <el-tab-pane label="数据接入进度" name="fourth_t">

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

        },
        methods: {
            // 所有方法
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
                }

            }
            .item_text3{
                width: 100%;
                height: 24px;
                padding-top: 15px;
                text-align: left;
                padding-left: 20px;
            }
            .item_text4{}
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
        }
        .Window_Four{
            width: 370px;
            height: 276px;
            border:solid 1px #428bca;
            background: #1d2339;
            float: left;
            overflow: hidden;
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