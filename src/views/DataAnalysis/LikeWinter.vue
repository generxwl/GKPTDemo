<template>
    <!--冬防战报页面-->
    <div class="Like-winter htt-winter">
        <div class="title htt-title">
            <h1>廊坊市空气质量智能管控平台冬防战报</h1>
            <el-button class="goback" @click="$router.go(-1)">返回上级</el-button>
        </div>
        <div class="warp_box htt-all">
            <div class="Window_one htt-one">
                <div class="item_text1">
                    <font>距下次更新时间：{{LfAirWinterPre.nextDataTime}}分钟</font>
                </div>
                <div class="item_text2">
                    <div class="item_box1 htt-one-up">
                        <p style="border-right: solid 1px #ccc">廊坊市实时AQI<span>{{LfAirWinterPre.aqi}}</span></p>
                        <p>74城市AQI倒数排名<span>{{LfAirWinterPre.dayrank_74}}</span></p>
                    </div>
                    <div class="item_box1 htt-one-up">
                        <p style="border-right: solid 1px #ccc">74城市年倒排<span>{{LfAirWinterPre.yearrank_74}}</span></p>
                        <p>74城市月倒排<span>{{LfAirWinterPre.monthrank_74}}</span></p>
                    </div>
                </div>
                <div class="item_text3 htt-one-middle">
                    今日控制目标：<a v-for="(data,index) in SouData.alertItem">{{data}}</a>
                </div>
                <div class="item_text4">
                    <el-carousel indicator-position="outside">
                        <el-carousel-item v-if="SouData.coPro">
                            <div class="pm">
                                <h2>{{SouData.coPro.ItemName}}
                                    <span style="font-size: 14px">控制值：{{SouData.coPro.AlertVaue}}</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：{{SouData.coPro.PointName}}↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="parseInt(SouData.coPro.ControlProgess.replace('%',''))"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item v-if="SouData.no2Pro">
                            <div class="pm">
                                <h2>{{SouData.no2Pro.ItemName}}
                                    <span style="font-size: 14px">控制值：{{SouData.no2Pro.AlertVaue}}</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：{{SouData.no2Pro.PointName}}↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="parseInt(SouData.no2Pro.ControlProgess.replace('%',''))"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item v-if="SouData.o3Pro">
                            <div class="pm">
                                <h2>{{SouData.o3Pro.ItemName}}
                                    <span style="font-size: 14px">控制值：{{SouData.o3Pro.AlertVaue}}</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：{{SouData.o3Pro.PointName}}↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="parseInt(SouData.o3Pro.ControlProgess.replace('%',''))"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item v-if="SouData.pm10Pro">
                            <div class="pm">
                                <h2>{{SouData.pm10Pro.ItemName}}
                                    <span style="font-size: 14px">控制值：{{SouData.pm10Pro.AlertVaue}}</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：{{SouData.pm10Pro.PointName}}↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="parseInt(SouData.pm10Pro.ControlProgess.replace('%',''))"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item v-if="SouData.pm25Pro">
                            <div class="pm">
                                <h2>{{SouData.pm25Pro.ItemName}}
                                    <span style="font-size: 14px">控制值：{{SouData.pm25Pro.AlertVaue}}</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：{{SouData.pm25Pro.PointName}}↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="parseInt(SouData.pm25Pro.ControlProgess.replace('%',''))"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item v-if="SouData.so2Pro">
                            <div class="pm">
                                <h2>{{SouData.so2Pro.ItemName}}
                                    <span style="font-size: 14px">控制值：{{SouData.so2Pro.AlertVaue}}</span>
                                </h2>
                            </div>
                            <div class="yujing">
                                <p>预警站点：{{SouData.so2Pro.PointName}}↑</p>
                            </div>
                            <div class="Progress">
                                <p style="float:left;width: 26%;margin-left: 15%">
                                    控制进度：
                                </p>
                                <div class="el-jindu" style="float:left;width: 64%">
                                    <el-progress :percentage="parseInt(SouData.so2Pro.ControlProgess.replace('%',''))"></el-progress>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="Window_Two htt-two" style="margin-left: 20px">
                <battle-map style="width: 100%;height: 100%"></battle-map>
            </div>
            <div class="Window_Three htt-three" style="margin-left: 20px">
                <el-tabs v-model="activeName_s" @tab-click="">
                    <el-tab-pane label="廊坊市秋冬季采暖期考核" name="first_s">
                        <el-tabs v-model="activeName_a" @tab-click="">
                            <el-tab-pane label="全期" name="first_a">
                                <div class="item_banyuan">
                                    <div class="obay_1">
                                        <p class="title_baay">225</p>
                                        <p>秋冬季</p>
                                        <p>采暖期PM2.5累计值</p>
                                        <cprogressl class="pro_l" :height="50"></cprogressl>
                                    </div>
                                    <div class="obay_2">
                                        <p class="title_baay">15</p>
                                        <p>2+26城市倒排</p>
                                        <img src="../../../static/imgs/mues/cainuan/dp1-3.png" alt="">
                                    </div>
                                    <div class="obay_3">
                                        <p class="title_baay">4</p>
                                        <p>下降率</p>
                                        <cprogressr class="pro_r" :height="50"></cprogressr>
                                    </div>
                                </div>
                                <div class="item_banyuan">
                                    <div class="obay_1">
                                        <p class="title_baay">225</p>
                                        <p>秋冬季</p>
                                        <p>采暖期PM2.5累计值</p>
                                    </div>
                                    <div class="obay_2">
                                        <p class="title_baay">15</p>
                                        <p>2+26城市倒排</p>
                                        <img src="../../../static/imgs/mues/cainuan/dp4-8.png" alt="">
                                    </div>
                                    <div class="obay_3">
                                        <p class="title_baay">4</p>
                                        <p>下降率</p>
                                    </div>
                                </div>
                                <div class="item_banyuan">
                                   <div class="line_top">
                                       <p>10月1日至10月30日，PM2.5秋季任务未完成：</p>
                                       <div>
                                           <b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b>
                                       </div>
                                   </div>
                                    <div class="line_bottom">
                                        <p>10月1日至10月30日，PM2.5秋季任务未完成：</p>
                                        <div>
                                            <b>广阳区</b><b>广阳区</b><b>广阳区</b>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="月度" name="second_a">
                                <div class="item_banyuan">
                                    <div class="obay_1">
                                        <p class="title_baay">115</p>
                                        <p>秋冬季</p>
                                        <p>采暖期PM2.5累计值</p>
                                        <cprogressl class="pro_l" :height="50"></cprogressl>
                                    </div>
                                    <div class="obay_2">
                                        <p class="title_baay">15</p>
                                        <p>2+26城市倒排</p>
                                        <img src="../../../static/imgs/mues/cainuan/dp1-3.png" alt="">
                                    </div>
                                    <div class="obay_3">
                                        <p class="title_baay">4</p>
                                        <p>下降率</p>
                                        <cprogressr class="pro_r" :height="50"></cprogressr>
                                    </div>
                                </div>
                                <div class="item_banyuan">
                                    <div class="obay_1">
                                        <p class="title_baay">225</p>
                                        <p>秋冬季</p>
                                        <p>采暖期PM2.5累计值</p>
                                    </div>
                                    <div class="obay_2">
                                        <p class="title_baay">15</p>
                                        <p>2+26城市倒排</p>
                                        <img src="../../../static/imgs/mues/cainuan/dp4-8.png" alt="">
                                    </div>
                                    <div class="obay_3">
                                        <p class="title_baay">4</p>
                                        <p>下降率</p>
                                    </div>
                                </div>
                                <div class="item_banyuan">
                                    <div class="line_top">
                                        <p>10月1日至10月30日，PM2.5秋季任务未完成：</p>
                                        <div>
                                            <b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b>
                                        </div>
                                    </div>
                                    <div class="line_bottom">
                                        <p>10月1日至10月30日，PM2.5秋季任务未完成：</p>
                                        <div>
                                            <b>广阳区</b><b>广阳区</b><b>广阳区</b>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="季度" name="third_a">
                                <div class="item_banyuan">
                                    <div class="obay_1">
                                        <p class="title_baay">85</p>
                                        <p>秋冬季</p>
                                        <p>采暖期PM2.5累计值</p>
                                        <cprogressl class="pro_l" :height="50"></cprogressl>
                                    </div>
                                    <div class="obay_2">
                                        <p class="title_baay">15</p>
                                        <p>2+26城市倒排</p>
                                        <img src="../../../static/imgs/mues/cainuan/dp1-3.png" alt="">
                                    </div>
                                    <div class="obay_3">
                                        <p class="title_baay">4</p>
                                        <p>下降率</p>
                                        <cprogressr class="pro_r" :height="50"></cprogressr>
                                    </div>
                                </div>
                                <div class="item_banyuan">
                                    <div class="obay_1">
                                        <p class="title_baay">225</p>
                                        <p>秋冬季</p>
                                        <p>采暖期PM2.5累计值</p>
                                    </div>
                                    <div class="obay_2">
                                        <p class="title_baay">15</p>
                                        <p>2+26城市倒排</p>
                                        <img src="../../../static/imgs/mues/cainuan/dp4-8.png" alt="">
                                    </div>
                                    <div class="obay_3">
                                        <p class="title_baay">4</p>
                                        <p>下降率</p>
                                    </div>
                                </div>
                                <div class="item_banyuan">
                                    <div class="line_top">
                                        <p>10月1日至10月30日，PM2.5秋季任务未完成：</p>
                                        <div>
                                            <b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b><b>广阳区</b>
                                        </div>
                                    </div>
                                    <div class="line_bottom">
                                        <p>10月1日至10月30日，PM2.5秋季任务未完成：</p>
                                        <div>
                                            <b>广阳区</b><b>广阳区</b><b>广阳区</b>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="县市区考核" name="second_s">
                        <el-tabs v-model="activeName_z" @tab-click="">
                            <el-tab-pane label="周考核" name="first_z">
                                <div class="table_kaohe_sanqu">
                                    <div class="lable_title">
                                        <a>市三区周考核</a> <a style="margin-left: 20px">本周预处罚名单：<span>开发区</span></a>
                                    </div>
                                    <div class="tubiao_warp">
                                        <div class="warp_left htt-left">
                                            <div id="kaohe_1" style="width: 209px;height: 80px"></div>
                                        </div>
                                        <div class="warp_chenter">
                                            <ul>
                                                <li style="color: green">1.开发区</li>
                                                <li style="color: yellow">2.广阳区</li>
                                                <li style="color: red">3.安次区</li>
                                            </ul>
                                        </div>
                                        <div class="warp_right htt-right">
                                            <div id="kaohe_2" style="width: 182px;height: 80px"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table_kaohe_baxian">
                                    <div class="lable_title">
                                        <a>市三区周考核</a> <a style="margin-left: 20px">本周预处罚名单：<span>霸州市 永清县 香河县</span></a>
                                    </div>
                                    <div class="tubiao_warp">
                                        <div class="warp_left">
                                            <div id="kaohe_3" style="width: 209px;height: 165px"></div>
                                        </div>
                                        <div class="warp_chenter">
                                            <ul>
                                                <li style="color: green">1.霸州市</li>
                                                <li style="color: green">2.永清县</li>
                                                <li style="color: green">3.香河县</li>
                                                <li style="color: yellow">4.固安县</li>
                                                <li style="color: yellow">5.文安县</li>
                                                <li style="color: red">6.大厂县</li>
                                                <li style="color: red">7.三河县</li>
                                                <li style="color: red">8.大城县</li>
                                            </ul>
                                        </div>
                                        <div class="warp_right">
                                            <div id="kaohe_4" style="width: 198px;height: 165px"></div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="月考核" name="second_z">
                                <div class="table_kaohe_sanqu">
                                    <div class="lable_title">
                                        <a>市三区月考核</a> <a style="margin-left: 20px">本月预处罚名单：<span>开发区</span></a>
                                    </div>
                                    <div class="tubiao_warp">
                                        <div class="warp_left">
                                            <div id="kaohe_5" style="width: 209px;height: 80px"></div>
                                        </div>
                                        <div class="warp_chenter">
                                            <ul>
                                                <li style="color: green">1.开发区</li>
                                                <li style="color: yellow">2.广阳区</li>
                                                <li style="color: red">3.安次区</li>
                                            </ul>
                                        </div>
                                        <div class="warp_right">
                                            <div id="kaohe_6" style="width: 182px;height: 80px"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table_kaohe_baxian">
                                    <div class="lable_title">
                                        <a>市三区月考核</a> <a style="margin-left: 20px">本周预处罚名单：<span>霸州市 永清县 香河县</span></a>
                                    </div>
                                    <div class="tubiao_warp">
                                        <div class="warp_left">
                                            <div id="kaohe_7" style="width: 209px;height: 165px"></div>
                                        </div>
                                        <div class="warp_chenter">
                                            <ul>
                                                <li style="color: green">1.霸州市</li>
                                                <li style="color: green">2.永清县</li>
                                                <li style="color: green">3.香河县</li>
                                                <li style="color: yellow">4.固安县</li>
                                                <li style="color: yellow">5.文安县</li>
                                                <li style="color: red">6.大厂县</li>
                                                <li style="color: red">7.三河县</li>
                                                <li style="color: red">8.大城县</li>
                                            </ul>
                                        </div>
                                        <div class="warp_right">
                                            <div id="kaohe_8" style="width: 198px;height: 165px"></div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="Window_Four htt-four" style="margin-top: -54px">
                <el-tabs v-model="activeName_t" @tab-click="">
                    <el-tab-pane label="市政数据" name="first_t">
                        <div class="renwu-box">
                            <div class="e_users" style="border-right: solid 1px #ccc">
                                <p>211,<span>342</span></p>
                                <a>煤改电任务用户</a>
                            </div>
                            <div class="e_users">
                                <h5>94% </h5>
                                <a>煤改电进度</a>
                            </div>
                            <div class="e_users" style="border-right: solid 1px #ccc">
                                <p>187,<span>674</span></p>
                                <a>煤改气任务用户</a>
                            </div>
                            <div class="e_users">
                                <h5>94% </h5>
                                <a>煤改气进度</a>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="用电量数据" name="second_t">
                        <div class="" style="padding: 10px 0">区县9月14日用电量</div>
                        <div id="dian_1" style="width: 366px;height: 200px;color: #fff!important;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="经济数据" name="third_t">
                        <div class=""  style="padding: 10px 0">区县9月14日经济数据</div>
                        <div id="dian_2" style="width: 366px;height: 200px;color: #fff!important;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="数据接入进度" name="fourth_t">
                        <div class="">区县9月14日数据接入进度</div>
                        <div class="prog_box">
                            <ul class="item_progrs_left">
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                                <li>市建设局</li>
                            </ul>
                            <div class="item_progrs">
                                <el-progress :percentage="10"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="20"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="30"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="40"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="50"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="60"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="70"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="80"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="90"></el-progress>
                            </div>
                            <div class="item_progrs">
                                <el-progress :percentage="100"></el-progress>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="Window_Five htt-five" style="margin-left: 20px;margin-top: -54px">
                <el-tabs v-model="activeName_f" @tab-click="">
                    <el-tab-pane label="空气质量检测" name="first_f">
                        <div class="table_container">
                            <el-table
                                    :data="kongqiData"
                                    border
                                    stripe
                                    highlight-current-row
                                 >
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
                        <el-tabs v-model="activeName_w" @tab-click="">
                            <el-tab-pane label="PM2.5" name="first_w">
                                <div class="table_container">
                                    <el-table
                                            :data="PM25Data"
                                            border
                                            stripe
                                            highlight-current-row
                                           >
                                        <el-table-column
                                                property="ranking"
                                                label="排名"
                                                width="58">
                                        </el-table-column>
                                        <el-table-column
                                                property="wlname"
                                                label="网格名称"
                                                width="130">
                                        </el-table-column>
                                        <el-table-column
                                                property="ConstructionSite"
                                                label="工地"
                                                width="110">
                                        </el-table-column>
                                        <el-table-column
                                                property="PM25"
                                                label="PM2.5"
                                        >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="PM10" name="second_w">
                                <div class="table_container">
                                    <el-table
                                            :data="PM10Data"
                                            border
                                            stripe
                                            highlight-current-row
                                            >
                                        <el-table-column
                                                property="ranking"
                                                label="排名"
                                                width="58">
                                        </el-table-column>
                                        <el-table-column
                                                property="wlname"
                                                label="网格名称"
                                                width="130">
                                        </el-table-column>
                                        <el-table-column
                                                property="ConstructionSite"
                                                label="工地"
                                                width="110">
                                        </el-table-column>
                                        <el-table-column
                                                property="PM10"
                                                label="PM10"
                                        >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="企业在线监测" name="third_f">
                        <div class="table_container">
                            <el-table
                                    :data="EnterpriseData"
                                    border
                                    stripe
                                    highlight-current-row
                                    >
                                <el-table-column
                                        property="SerialNumber"
                                        label="序号"
                                        width="58">
                                </el-table-column>
                                <el-table-column
                                        property="wlname"
                                        label="网格名称"
                                        width="130">
                                </el-table-column>
                                <el-table-column
                                        property="Enterprise"
                                        label="企业"
                                        width="110">
                                </el-table-column>
                                <el-table-column
                                        property="OverQuota"
                                        label="超标指标"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="散乱污视频" name="fourth_f">
                        散乱污视频正在开发中！
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="Window_six htt-six" style="margin-left: 20px;margin-top: 20px">
                <!--aqiColor-->
                <div class="data_water1">
                    <p v-if="WeatherWinterPre[0].date">{{WeatherWinterPre[0].date}}</p>
                    <a>AQI日报范围<span>{{WeatherWinterPre[0].minaqi}}-{{WeatherWinterPre[0].maxaqi}}</span></a><br/>
                    <a>级别<span><img :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[0].minQuality)+'.png'" alt="">~<img :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[0].maxQuality)+'.png'" alt=""></span></a><br/>
                    <a>首要污染物<span>{{WeatherWinterPre[0].mainpoll}}</span></a>
                    <p>{{WeatherWinterPre[0].tq}}</p>
                    <a>{{WeatherWinterPre[0].temp_low}}-{{WeatherWinterPre[0].temp_high}}℃，{{WeatherWinterPre[0].ws}}，{{WeatherWinterPre[0].wd}}</a>
                </div>
                <div class="data_water2">
                    <p v-if="WeatherWinterPre[1].date">{{WeatherWinterPre[1].date}}</p>
                    <a>AQI日报范围<span>{{WeatherWinterPre[1].minaqi}}-{{WeatherWinterPre[1].maxaqi}}</span></a><br/>
                    <a>级别<span><img :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[1].minQuality)+'.png'" alt="">~<img :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[1].maxQuality)+'.png'" alt=""></span></a><br/>
                    <a>首要污染物<span>{{WeatherWinterPre[1].mainpoll}}</span></a>
                    <p>{{WeatherWinterPre[1].tq}}</p>
                    <a>{{WeatherWinterPre[1].temp_low}}-{{WeatherWinterPre[1].temp_high}}℃，{{WeatherWinterPre[1].ws}}，{{WeatherWinterPre[1].wd}}</a>
                </div>
                <div class="data_water3">
                    <p v-if="WeatherWinterPre[2].date">{{WeatherWinterPre[2].date}}</p>
                    <a>AQI日报范围<span>{{WeatherWinterPre[2].minaqi}}-{{WeatherWinterPre[2].maxaqi}}</span></a><br/>
                    <a>级别<span><img :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[2].minQuality)+'.png'" alt="">~<img :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[2].maxQuality)+'.png'" alt=""></span></a><br/>
                    <a>首要污染物<span>{{WeatherWinterPre[2].mainpoll}}</span></a>
                    <p>{{WeatherWinterPre[2].tq}}</p>
                    <a>{{WeatherWinterPre[2].temp_low}}-{{WeatherWinterPre[2].temp_high}}℃，{{WeatherWinterPre[2].ws}}，{{WeatherWinterPre[2].wd}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../api/index'
    import BattleMap from '@/map/BattleMap'
    import Cprogressl from '@/components/Cainprogress-l'
    import Cprogressr from '@/components/Cainprogress-r'
    export default {
        name: 'likewinter',
        data(){
            return {
                //页面数据
                activeName_s:'first_s',//默认选项
                activeName_t:'first_t',//默认选项
                activeName_f:'first_f',//默认选项
                activeName_z:'first_z',//
                activeName_a:'first_a',//
                activeName_w:'first_w',//
                currentRow: null,
                pagesize: 5,
                currentPage: 1,
                totalCount:0,
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
                ],
                PM25Data:[
                    {
                        ranking:'1',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM25:'22'
                    },
                    {
                        ranking:'2',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM25:'22'
                    },
                    {
                        ranking:'3',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM25:'22'
                    },
                    {
                        ranking:'4',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM25:'22'
                    }
                ],
                PM10Data:[
                    {
                        ranking:'1',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM10:'22'
                    },
                    {
                        ranking:'2',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM10:'22'
                    },
                    {
                        ranking:'3',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM10:'22'
                    },
                    {
                        ranking:'4',
                        wlname:'开发区梨园村一区',
                        ConstructionSite:'特价商城',
                        PM10:'22'
                    }
                ],
                EnterpriseData:[
                    {
                        SerialNumber:'1',
                        wlname:'广阳区达美商业区',
                        Enterprise:'特价商城',
                        OverQuota:'烟尘'
                    },
                    {
                        SerialNumber:'2',
                        wlname:'广阳区达美商业区',
                        Enterprise:'特价商城',
                        OverQuota:'烟尘'
                    },
                    {
                        SerialNumber:'3',
                        wlname:'广阳区达美商业区',
                        Enterprise:'特价商城',
                        OverQuota:'烟尘'
                    },
                    {
                        SerialNumber:'4',
                        wlname:'广阳区达美商业区',
                        Enterprise:'特价商城',
                        OverQuota:'二氧化硫'
                    },
                    {
                        SerialNumber:'5',
                        wlname:'广阳区达美商业区',
                        Enterprise:'特价商城',
                        OverQuota:'烟尘'
                    }
                ],
                SouData:{},
                LfAirWinterPre:{},
                WeatherWinterPre:[]
            };
        },
        beforeCreate() {
            //beforeCreate 创建前状态====
        },
        created() {
            //created 创建完毕状态====
           this.GETDataList()
        },
        beforeMount() {
            //beforeMount 挂载前状态===
        },
        mounted() {
            //mounted 挂载结束状态=====
            setTimeout(()=>{
                this.ElectricityConsumption();
                this.EconomicsConsumption();
                this.DataConsumption();
                this.DataZongConsumption();
                this.DataBXConsumption();
                this.DataBXZongConsumption();
            },500)
        },
        methods: {
            // 用电量
            ElectricityConsumption(){
//                let data = this.VideoPie.map(function (v) {
//                        return {value: v.count, name: v.name}
//                    }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('dian_1'));
                // 指定图表的配置项和数据
                let option = {

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['用电量','增长率'],
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['广阳区','安次区','开发区','香河县','大厂县','三河市','固安县','永清县','霸州市','文安县','大城县'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位(万千瓦时)',
                            min: 0,
                            max: 800,
                            interval: 200,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff',
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        },
                        {
                            type: 'value',
                            name: '单位（%）',
                            min: -10,
                            max: 10,
                            interval: 5,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        }
                    ],
                    series: [
                        {
                            name:'用电量',
                            type:'bar',
                            data:[200.6, 500.9, 239.0, 296.4, 699.7, 470.7, 175.6, 182.2, 648.7, 718.8, 360.0],
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                        },
                        {
                            name:'增长率',
                            type:'line',
                            yAxisIndex: 1,
                            data:[1.0, 2.2, 3.3, 4.5, 6.3, 8.2, 9, 9.4, 5.0, 6.5, 2.0]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
//                    series: [{
//                        data: data
//                    }]
                })
            },
            // 经济数据
            EconomicsConsumption(){
//
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('dian_2'));
                // 指定图表的配置项和数据
                let option = {

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['产值','增长率'],
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['工业增加值','轻工业','重工业'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位(万)',
                            min: 0,
                            max: 500,
                            interval: 100,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        },
                        {
                            type: 'value',
                            name: '单位(%)',
                            min: -4,
                            max: 6,
                            interval: 2,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            nameTextStyle: {
                                color: '#fff'
                            },
                        }
                    ],
                    series: [
                        {
                            name:'产值',
                            type:'bar',
                            data:[200.6, 500.9, 239.0],
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                        },
                        {
                            name:'增长率',
                            type:'line',
                            yAxisIndex: 1,
                            data:[1.0, 2.2, 3.3]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
//                    series: [{
//                        data: data
//                    }]
                })
            },
            // 横向表格数据接入01
            DataConsumption(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('kaohe_2'));
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'value',
                        min: 0,
                        max: 500,
                        interval: 100,
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    yAxis: {
                        type: 'category',
                        data: ['开发区','广阳区','安次区'],
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#20243d'
                            }
                        },
                    },
                    series: [
                        {
                            type: 'bar',
                            data: [112, 212, 316],
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                        }

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
//                    series: [{
//                        data: data
//                    }]
                })
            },
            // 变化率表格数据接入02
            DataZongConsumption(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('kaohe_1'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    grid:{
                        left:40
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['变化率']
                    },
                    toolbox: {
                        show: true,
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['开发区','广阳区','安次区'],
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        min: -20,
                        max: 20,
                        interval: 10,
                        axisLabel: {
                            formatter: '{value} %',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    series: [
                        {
                            type:'line',
                            data:[-10, 10, 18]
                        },
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
//                    series: [{
//                        data: data
//                    }]
                })
            },
            // 横向表格数据接入03
            DataBXConsumption(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('kaohe_4'));
                // 指定图表的配置项和数据
                let option = {
                    grid:{
                        bottom:22,
                        y:16,
                    },
                    tooltip: {
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'value',
                        min: 0,
                        max: 500,
                        interval: 100,
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    yAxis: {
                        type: 'category',
                        data: ['霸州市','永清县','香河县','固安县','文安县','大厂县','三河县','大城县'],
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#20243d'
                            }
                        },
                    },
                    series: [
                        {
                            type: 'bar',
                            data: [111, 122, 216,311, 412, 316,211, 212, 316,411, 312],
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                        }

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
//                    series: [{
//                        data: data
//                    }]
                })
            },
            // 变化率表格数据接入04
            DataBXZongConsumption(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('kaohe_3'));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    grid:{
                        bottom:28,
                        y:16,
                        left:40
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['变化率']
                    },
                    toolbox: {
                        show: true,

                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['霸州市','永清县','香河县','固安县','文安县','大厂县','三河县','大城县'],
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        min: -20,
                        max: 20,
                        interval: 10,
                        axisLabel: {
                            formatter: '{value} %',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    series: [
                        {
                            type:'line',
                            data:[20, 18, 15, 13, 10, 6,-10, -15]
                        },
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
//                    legend: {
//                        data: data.map(function (v) {
//                            return v.name
//                        })
//                    },
//                    series: [{
//                        data: data
//                    }]
                })
            },
            //战报模块02数据
            GETDataList(){
                //01警报值
                api.GetLfAirAlert().then(res => {
                    let data = res.data;
                    this.SouData = data;
                    //console.log(this.SouData)
                })
                //01空气排名
                api.GetLfAirWinterPre().then(res => {
                    let data = res.data;
                    this.LfAirWinterPre = data;
                    //console.log(this.LfAirWinterPre)
                })
                //未来三天天气
                api.GetWeatherWinterPre().then(res => {
                    let data = res.data;
                    this.WeatherWinterPre = data.obj;
                    //console.log(this.WeatherWinterPre)
                })

            },
            //图片背景跟换
            getImagesTarget(type){
                let rtValue = type;
                switch(type){
                    case '严重':
                        rtValue = 'du-yz';
                        break;
                    case '中度':
                        rtValue = 'du-zd';
                        break;
                    case '优':
                        rtValue = 'zd-y';
                        break;
                    case '良':
                        rtValue = 'du-l';
                        break;
                    case '轻度':
                        rtValue = 'du-qd';
                        break;
                    case '重度':
                        rtValue = 'du-zd';
                        break;
                }
                return rtValue;
            },
        },
        components: {BattleMap,Cprogressl,Cprogressr}

    };
</script>
<style lang="scss" scoped>
    @import "../../styles/carousel";//轮播图样式
    .Like-winter{
        width: 100%;
        /*min-height: 800px;*/
        height: auto;
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
                    span{
                        margin-left: 2px;
                        font-weight: bold;
                        font-size: 18px;
                        color: magenta;
                    }
                }

            }
            .item_text3{
                width: 100%;
                height: 24px;
                margin-top: 20px;
                line-height: 34px;
                text-align: left;
                padding-left: 20px;
                border-top: solid 1px #ccc;
                a{
                    padding: 0 4px;
                    color: #ccc;
                }
            }
            .item_text4{
                .pm{
                    h2{
                        font-size: 18px;
                        padding: 6px 4px 0 0;
                        text-align: left;
                        margin: 0 0 0 26px;
                    }
                }
                .yujing{
                    text-align: left;
                    margin-left: 24px;
                    font-size: 16px;
                    padding: 6px 0;
                }
                .Progress{
                    width: 100%;
                    height: 40px;
                    margin-left: 22px;
                    padding: 0 10px 0 0;
                }
            }
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
            //采暖考核模块
            .item_banyuan{
                width: 460px;
                height: 88px;
                margin-top: 9px;
                border:solid 1px #7c7056;
                margin-left: 9px;
                .obay_1{
                    float: left;
                    width: 186px;
                    height: 88px;
                    overflow: hidden;
                    background: url("../../../static/imgs/mues/cainuan/l-bg2.png") no-repeat;
                    position: relative;
                    .title_baay{
                        font-size: 24px;
                        font-weight: bold;
                    }
                    p{
                        padding-right: 37px;
                    }
                    .pro_l{
                        height:88px;
                        width:70px;
                        position: absolute;
                        bottom: -5px;
                        right: -8px;
                    }
                }
                .obay_2{
                    float: left;
                    width: 88px;
                    height: 88px;
                    overflow: hidden;
                    p{
                        font-size: 12px;
                    }
                    .title_baay{
                        font-size: 26px;
                        font-weight: bold;
                    }
                }
                .obay_3{
                    float: left;
                    width: 184px;
                    height: 88px;
                    overflow: hidden;
                    background: url("../../../static/imgs/mues/cainuan/r-bg2.png") no-repeat;
                    position: relative;
                    .title_baay{
                        font-size: 24px;
                        font-weight: bold;
                    }
                    p{
                        padding-left: 35px;
                    }
                    .pro_r{
                        height:88px;
                        width:70px;
                        position: absolute;
                        bottom: -5px;
                        left: 0;
                    }
                }
            }
            .table_kaohe_sanqu{
                width: 450px;
                height:110px;
                margin: 0 auto;
                .lable_title{
                    text-align: left;
                    height: 28px;
                    width: 100%;
                    color: #fff;
                    //background: #777;
                    a{
                        color: #fff;
                        display: inline-block;
                    }
                }
                .tubiao_warp{
                    .warp_left{
                        float: left;
                        height: 80px;
                        width: 209px;
                       // border: solid 1px #1080cc;
                    }
                    .warp_chenter{
                        float: left;
                        height: 80px;
                        width: 59px;
                       // border: solid 1px #1080cc;
                        ul{
                            li{
                                list-style: none;
                            }
                        }
                    }
                    .warp_right{
                        float: right;
                        height: 80px;
                        width: 182px;
                       // border: solid 1px #1080cc;
                    }
                }
            }
            .table_kaohe_baxian{
                width: 100%;
                height:190px;
                margin: 0 auto;
                .lable_title{
                    text-align: left;
                    height: 28px;
                    width: 100%;
                    color: #fff;
                    padding-left: 16px;
                    //background: #777;
                    a{
                        color: #fff;
                        display: inline-block;
                    }
                }
                .tubiao_warp{
                    .warp_left{
                        float: left;
                        height: 165px;
                        width: 219px;
                       // border: solid 1px #1080cc;
                    }
                    .warp_chenter{
                        float: left;
                        height: 165px;
                        width: 59px;
                       // border: solid 1px #1080cc;
                        ul{
                            li{
                                list-style: none;
                            }
                        }
                    }
                    .warp_right{
                        float: right;
                        height: 165px;
                        width: 200px;
                        //border: solid 1px #1080cc;
                    }
                }
            }
        }
        .Window_Four{
            width: 370px;
            height: 276px;
            border:solid 1px #428bca;
            background: #1d2339;
            float: left;
            overflow: hidden;
            .prog_box{
                .item_progrs_left{
                    width: 20%;
                    float: left;
                    padding-left: 4%;
                    margin-right: 5%;
                    li{
                        list-style: none;
                    }
                }
                .item_progrs{
                    margin-top: 2.5px;
                    width: 70%;
                    float: left;
                }
            }
            .renwu-box{
                width: 300px;
                height: auto;
                margin: 0 auto;
                .e_users{
                    width: 150px;
                    height: 60px;
                    margin-top: 35px;
                    float: left;
                    p{
                        margin: 0;
                        color: #8079eb;
                        font-size: 22px;
                        font-weight:bold;
                        padding: 3px;
                        span{
                            font-size: 14px;
                        }
                    }
                    h5{
                        margin: 6px;
                        color: #45edf8;
                        font-size: 22px;
                    }
                }
            }

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
                   display: inline-block;
                }
            }
        }
    }
</style>