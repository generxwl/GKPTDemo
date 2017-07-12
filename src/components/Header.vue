<template>
    <div class="header">
        <div class="left"></div>
        <div class="right">
            <div class="navbox">
                <div class="nav">
                    <!--环境监测-->
                    <li class="drop-menu-effect"><a href="#"><span>环境监测</span></a>
                        <div class="submenu">
                            <div class="mj_menu_pro_bg">
                                <div class="mj_menu_pro_main">

                                    <div class="mj_menu_news_li3">
                                        <div class="mj_menu_li_txt">
                                            <a href="#">污染地图</a>
                                        </div>
                                    </div>
                                    <div class="mj_menu_news_li3">
                                        <div class="mj_menu_li_txt">
                                            <a href="#">超级站</a>
                                        </div>
                                    </div>
                                    <div class="mj_menu_news_li3">
                                        <div class="mj_menu_li_txt">
                                            <font>监测点</font><br/>
                                            <a href="#">国控点</a><br/>
                                            <a href="#">省控点</a>
                                        </div>
                                    </div>

                                    <div style="clear:both; height:0px; overflow:hidden;"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!--传感网溯源-->
                    <li class="drop-menu-effect"><a href="#"><span>传感网溯源</span></a>
                        <div class="submenu">
                            <div class="mj_menu_news_bg">
                                <div class="mj_menu_news_main">
                                    <div class="mj_menu_news_li">
                                        <div class="mj_menu_li_txt">
                                            <a href="#">视频监控</a><br/>
                                            <a href="#">城市热点</a>
                                        </div>
                                    </div>
                                    <div style="clear:both; height:0px; overflow:hidden;"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!--污染源管控-->
                    <li class="drop-menu-effect"><a href="#"><span>污染源管控</span></a>
                        <div class="submenu">
                            <div class="mj_menu_news_bg">
                                <div class="mj_menu_news_main">
                                    <div class="mj_menu_news_li">
                                        <div class="mj_menu_li_txt">
                                            <font>污染源监测</font><br/>
                                            <a href="#">点源</a><br/>
                                            <a href="#">移动源</a><br/>
                                            <a href="#">扬尘面源</a>
                                         </div>
                                    </div>
                                    <div class="mj_menu_news_li">
                                        <div class="mj_menu_li_txt">
                                            <font>源清单地图</font><br/>
                                            <a href="#">源清单地图</a>
                                        </div>
                                    </div>
                                    <div style="clear:both; height:0px; overflow:hidden;"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!--气象预报-->
                    <li class="drop-menu-effect"><a href="#"><span>气象预报</span></a>
                        <div class="submenu">
                            <div class="mj_menu_news_bg">
                                <div class="mj_menu_news_main">
                                    <div class="mj_menu_news_li">
                                        <div class="mj_menu_li_txt">
                                            <a href="#">气象站</a><br/>
                                            <a href="#">网格预测</a><br/>
                                            <a href="#">动态风场</a><br/>
                                            <a href="#">城市天气预报</a>
                                        </div>
                                    </div>

                                    <div style="clear:both; height:0px; overflow:hidden;"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!--全民举报-->
                    <li class="drop-menu-effect"><a href="#"><span>全民举报</span></a>
                        <div class="submenu" style="left:-347px;">
                            <div class="mj_menu_news_bg">
                                <div class="mj_menu_news_main">
                                    <div class="mj_menu_news_li2">
                                        <div class="mj_menu_li_txt">
                                            <a href="#">群众举报</a><br/>
                                            <a href="#">巡查员举报</a>
                                        </div>
                                    </div>

                                    <div style="clear:both; height:0px; overflow:hidden;"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!--数据研判-->
                    <li class="drop-menu-effect"><a href="#"><span>数据研判</span></a>
                        <div class="submenu" style="left:-347px;">
                            <div class="mj_menu_news_bg">
                                <div class="mj_menu_news_main">
                                    <div class="mj_menu_news_li3">
                                        <div class="mj_menu_li_txt">
                                            <font>传感网统计</font><br/>
                                            <a href="#">曲线对比</a><br/>
                                            <a href="#">均值比</a><br/>
                                            <a href="#">环比分析</a>
                                        </div>
                                    </div>
                                    <div class="mj_menu_news_li3">
                                        <div class="mj_menu_li_txt">
                                            <font>数据对比</font><br/>
                                            <a href="#">小时均值比</a><br/>
                                            <a href="#">日均值比</a><br/>
                                            <a href="#">污染物对比</a><br/>
                                            <a href="#">固定源统计</a><br/>
                                            <a href="#">扬尘源统计</a><br/>
                                            <a href="#">区县打分</a>
                                        </div>
                                    </div>
                                    <div class="mj_menu_news_li3">
                                        <div class="mj_menu_li_txt">
                                            <font>城市排名</font><br/>
                                            <a href="#">城市排名</a><br/>
                                            <a href="#">同期变化率</a><br/>
                                            <a href="#">百分位对比</a>
                                        </div>
                                    </div>
                                    <div style="clear:both; height:0px; overflow:hidden;"></div>
                                </div>
                            </div>
                        </div>
                    </li>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'header',
        data () {
            return {
                msg: 'App'
            }
        },
        mounted(){
            this.lanrenzhijia(".drop-menu-effect");
        },
        methods: {
            lanrenzhijia(_this){
                $(_this).each(function () {
                    var $this = $(this);
                    var theMenu = $this.find(".submenu");
                    var tarHeight = theMenu.height();
                    theMenu.css({height: 0});
                    $this.hover(
                        function () {
                            $(this).addClass("mj_hover_menu");
                            theMenu.stop().show().animate({height: tarHeight}, 400);
                        },
                        function () {
                            $(this).removeClass("mj_hover_menu");
                            theMenu.stop().animate({height: 0}, 400, function () {
                                $(this).css({display: "none"});
                            });
                        }
                    );
                });
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .header{
        width: 100%;
        height:60px;
        background-color: rgba(0, 0, 254, 1);
        line-height: 60px;
    }
    .navbox {
        height: 60px;
        position: relative;
        z-index: 9;
        margin: auto;
        font-family: '微软雅黑';
    }

    .nav {
        width: 1002px;
        margin: 0 auto;
        height: 60px;
        list-style: none;
    }

    .nav li {
        float: left;
        height: 60px;
        position: relative;
        list-style: none;
    }

    .nav li.last {
        background: none;
    }

    .nav li a {
        text-decoration: none;
    }

    .nav li a span {
        float: left;
        display: block;
        line-height: 60px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        width: 143px;
        text-align: center;
    }

    .mj_hover_menu {
        text-decoration: none;
        width: 143px;

        height: 60px;
    }

    .nav li.selected .submenu {
        display: block;
    }

    .nav li .submenu {
        display: none;
        position: absolute;
        top: 60px;
        left: -9px;
    }

    .nav li .submenu li {
        float: none;
        padding: 0;
        background: none;
        height: auto;
        border-bottom: dotted 0px #BEBEBE;
    }

    .mj_menu_pro_bg {
        width: 325px;
        height: 235px;
        background: #fff;
        border:solid 1px #666 ;
        border-top: none;
    }

    .mj_menu_pro_main {
        width: 305px;
        margin: auto;
        padding-top: 12px;
    }

    .mj_menu_pro_li {
        float: left;
    }

    .mj_menu_li_txt {
        line-height: 22px;
        font-size: 12px;
        color: #696969;
    }

    .mj_menu_li_txt font {
        font-size: 14px;
        color: #bb1721;
    }

    .mj_menu_li_txt a {
        color: #696969;
        text-decoration: none;
    }

    .mj_menu_li_txt a:hover {
        color: #696969;
        text-decoration: underline;
    }

    .mj_menu_news_bg {
        width: 480px;
        height: 185px;
        background: #fff;
        border:solid 1px #666 ;
        border-top: none;
    }

    .mj_menu_news_main {
        width: 440px;
        margin: auto;
        padding-top: 12px;
    }

    .mj_menu_news_li {
        padding: 0px 30px;
        margin-right: 30px;
        height: 150px;
        float: left;
        border-right: solid 1px #cccccc;
    }

    .mj_menu_news_img {
        float: left;
        text-align: left;
        color: #bb1721;
        line-height: 30px;
        font-size: 14px;
    }

    .mj_menu_news_li2 {
        padding: 0px 30px;
        height: 150px;
        float: right;
        border-left: solid 1px #cccccc;
    }

    .mj_menu_news_img2 {
        float: left;
        margin-left: 30px;
        text-align: left;
        color: #bb1721;
        line-height: 30px;
        font-size: 14px;
    }

    .mj_menu_news_li3 {
        padding: 0px 25px;
        height: 150px;
        float: right;
        border-left: solid 1px #cccccc;
    }

    .mj_menu_news_img3 {
        float: left;
        margin-left: 10px;
        text-align: left;
        color: #bb1721;
        line-height: 30px;
        font-size: 14px;
    }

</style>
