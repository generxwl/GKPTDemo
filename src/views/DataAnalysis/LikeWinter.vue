<template>
    <!--冬防战报页面-->
    <div class="Like-winter">
        <div class="title">
            <h1>廊坊市空气质量智能管控平台冬防战报</h1>
        </div>
        <div class="warp_box">
            <div class="Window_one">
                <div class="">距下次跟新时间：15分钟</div>
                <div class="">
                    <p>廊坊市实时AQI<span>333</span></p>
                    <p>74城市AQI倒数排名<span>74</span></p>
                    <p>74城市年倒排<span>22</span></p>
                    <p>74城市月倒排<span>22</span></p>
                </div>
                <div class="">
                    今日控制目标：PM2.5 PM10 SO2 NO2 O3
                </div>
                <div class="">
                    进度条部分
                </div>
            </div>
            <div class="Window_Two" style="margin-left: 20px">
                地图部分
            </div>
            <div class="Window_Three" style="margin-left: 20px">
                <el-tabs v-model="activeName_s" @tab-click="">
                    <el-tab-pane label="廊坊市秋冬季采暖期考核" name="first_s">
                        廊坊市秋冬季采暖期考核内容
                    </el-tab-pane>
                    <el-tab-pane label="县市区考核" name="second_s">
                        县市区考核内容
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

                    </el-tab-pane>
                    <el-tab-pane label="工地扬尘监测" name="second_f">

                    </el-tab-pane>
                    <el-tab-pane label="企业在线监测" name="third_f">

                    </el-tab-pane>
                    <el-tab-pane label="散乱污视频" name="fourth_f">

                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="Window_six" style="margin-left: 20px;margin-top: 20px">
                <div class="data_water1">
                    <p>今天（09月04日）</p>
                    <a>AQI日报范围<span>{{20-100}}</span></a><br/>
                    <a>级别<span>{{优良}}</span></a><br/>
                    <a>首要污染物<span>{{PM25}}</span></a>
                    <p>晴</p>
                    <a>18-28度，微风，西南风</a>
                </div>
                <div class="data_water2">
                    <p>明天（09月05日）</p>
                    <a>AQI日报范围<span>{{20-100}}</span></a><br/>
                    <a>级别<span>{{优良}}</span></a><br/>
                    <a>首要污染物<span>{{PM25}}</span></a>
                    <p>晴</p>
                    <a>18-28度，微风，西南风</a>
                </div>
                <div class="data_water3">
                    <p>后天（09月06日）</p>
                    <a>AQI日报范围<span>{{20-100}}</span></a><br/>
                    <a>级别<span>{{优良}}</span></a><br/>
                    <a>首要污染物<span>{{PM25}}</span></a>
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
    .Like-winter{
        width: 100%;
        height: 100%;
        background: #242953;
        .title{
            h1{
                margin: 0;
                font-size: 24px;
                line-height: 80px;
                color:#b0d6fa ;
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