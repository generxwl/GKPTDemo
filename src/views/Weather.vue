<template>
    <div class="YBweather">
        <!--城市天气预报-->
        <v-header></v-header>
        <div class="forecast_container">
            <div class="row ">
                <div class="forecast_left">
                    <div class="col-md-6" style="border-right:1px solid rgba(0,0,0,0.2);">
                        <span style="font-weight:bold;" class="forecast_div">区域切换:</span>
                        <div class="region btn-group" style="padding:10px;">
                            <button type="button" class="btn btn-default  btnitemgroup1" value="all">全国</button>
                            <button type="button" class="btn btn-default btn-info btnitemgroup1" value="current">当前城市
                            </button>
                        </div>

                        <div class="model btn-group" style="float:right;padding:10px;">
                            <button type="button" class="btn btn-default btn-info btntypegroup" value="CUACE">
                                CUACE
                            </button>
                            <button type="button" class="btn btn-default btntypegroup" value="horse">
                                矮马
                            </button>
                        </div>

                        <div style="float:right;padding:15px;font-weight:bold;" class="forecast_div">模式切换:</div>
                        <div class="showImages" style="padding:18px;border-top:1px solid rgba(0,0,0,0.2);">
                            <img id="l-img" width="100%;" height="100%" sytle='min-height:452.7px' src=""/>
                            <div class="showImage" style="margin:0 auto;">
                                <div class="air-time">
                                    <div class="air-time-title" style="color:white">
                                        时间：
                                    </div>
                                    <div class="forecast_clearfix course_nr" style="float: left">
                                        <ul class="course_nr2">
                                        </ul>
                                    </div>
                                    <div class="air-time-control" style="float: left;margin-top:14px;">
                                        <a href="javascript:void(0)" class="start" id="play">
                                            <img id="playicon" style="margin-top: 0px;" src="resource/img/play.png">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6" style="padding:0;padding-left:5px">
                    <div class="col-md-2" style="padding:0">
                        <div class="ybtable table table-hover" style="width:100%;margin-top:54px;">
                            <!--<tr style="font-weight: bold;text-align:center"><td>日期</td><td>浓度值</td></tr>-->
                        </div>
                    </div>
                    <div class="col-md-10" style="">
                        <div class="forecast_top forecast_clearfix">

                            <div class="col-md-12 btn-group" style="padding-top:10px;margin-left:0em;">
                                <!--<div style="float:left;">六项污染物切换:</div>-->
                                <input type="hidden" name="airtype" id="airtype" value="AQI"/>

                                <button type="button" class="btn btn-default btn-info btnitemgroup2" value="AQI">
                                    AQI
                                </button>
                                <button type="button" class="btn btn-default btnitemgroup2" value="PM2.5">
                                    PM2.5
                                </button>
                                <button type="button" class="btn btn-default btnitemgroup2 btnhid" value="PM10">
                                    PM10
                                </button>
                                <button type="button" class="btn btn-default btnitemgroup2 btnhid" value="SO2">
                                    SO2
                                </button>
                                <button type="button" class="btn btn-default btnitemgroup2 btnhid" value="NO2">
                                    NO2
                                </button>
                                <button type="button" class="btn btn-default btnitemgroup2 btnhid" value="CO">
                                    CO
                                </button>
                                <button type="button" class="btn btn-default btnitemgroup2" value="O3">
                                    O3
                                </button>
                            </div>
                        </div>
                        <div>
                            <h2 id="forecast_text" style="text-align:center;"></h2>
                            <div id="bars" style="width:100%;height:250px;margin-top: -20px ;margin-left: -20px;">
                            </div>
                        </div>
                        <div style="color:#999;margin-top: -30px;margin-left: 5px">(当日小时值会逐小时滚动预报)</div>
                        <div id="hourDetails" style="margin-top: -8px;">
                            <h3 class="forecast_h3">小时预报气象要素:&nbsp;&nbsp;<span class="keyInfo"
                                                                               style="font-size:16px"></span>
                            </h3>
                            <table id="tableDetails" class="table table-bordered" style="width:90%;text-align:center">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'YBweather',
        data () {
            return {}
        },
        mounted(){

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .YBweather {
        width: 100%;
        height: 100%;
    }
</style>
