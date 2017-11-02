<template>
    <div class="header">
        <div class="navbox">
            <!--环境监测-->
            <div class="logo">
                <img src="../assets/img/logo.png" alt="logo">
                <a style="color: #fff;font-size:21px;font-weight: 500;line-height: 56px;font-family: 'Microsoft YaHei' ">廊坊市空气质量智能管控平台</a>
            </div>
            <div style="color: #fff;float: left;height: 56px;line-height: 72px">2017版</div>
            <ul class="bnav">
                <li>
                    <a href="#/">首页</a>
                </li>
                <li>
                    <a>监测调度 <i></i></a>
                    <div class="Twoitem submenu">
                        <div>
                            <h3>监测网</h3>
                            <a href="#/Monitor">国省控点监测</a>
                            <a href="#/superstation">超级站</a>
                            <a href="#/SensorNetwork">传感网</a>
                        </div>
                        <div>
                            <h3>散乱污监控</h3>
                            <a href="#/ScatteredDirtVideos">散乱污企业监控</a>
                            <a href="#/Videos">VOCs企业监控</a>
                            <a>高点监控</a>
                        </div>
                        <div>
                            <h3>GPS监控</h3>
                            <a>渣土车</a>
                            <a>环卫车</a>
                        </div>
                    </div>
                </li>
                <li>
                    <a>源清单<i></i></a>
                    <div class="Threeitem submenu">
                        <div>
                            <p>动态源清单</p>
                            <a href="#/EnterpriseEonitoring">企业在线监测</a>
                            <a href="#/DustOnline">扬尘在线监测</a>
                            <a>机动车路况</a>
                        </div>
                        <div>
                            <p>静态源清单</p>
                            <a href="#/StaticOriginalList" style="font-family:宋体">污染源清单</a>
                            <a style="font-family:宋体;margin-left: 16px">应急清单</a>
                        </div>
                    </div>
                </li>
                <li>
                    <a>气象监测与预报<i></i></a>
                    <div class="Fouritem submenu">
                        <a href="#/weatherstation">气象站</a><br/>
                        <a href="#/GridPrediction">网格预测</a><br/>
                        <a href="#/DTweather">动态风场</a><br/>
                        <a href="#/Weather">城市天气预报</a>
                    </div>
                </li>
                <li>
                    <a>全民举报</a>
                </li>
                <li>
                    <a>大数据资源<i></i></a>
                    <div class="Fiveitem submenu">
                        <div>
                            <h3>城市排名</h3>
                            <a>城市排名</a>
                            <a>同期变化率</a>
                            <a>百分比对比</a>
                        </div>
                        <div>
                            <h3>数据对比</h3>
                            <a>小时均值比</a>
                            <a>日均值比</a>
                            <a>污染物对比</a>
                            <a>固定源统计</a>
                            <a href="#/DustEmissionStatistics">扬尘源统计</a><br/>
                            <a href="#/DistrictsCounties">区县打分</a>
                        </div>
                        <div>
                            <h3>传感网统计</h3>
                            <a>曲线对比</a>
                            <a>均值比</a>
                            <a>环比分析</a>
                        </div>
                        <div>
                            <h3>市政及经济数据</h3>
                            <a>煤改电</a>
                            <a>煤改气</a>
                            <a>用电量</a>
                            <a>经济运行</a>
                        </div>
                        <div>
                            <h3>综合统计</h3>
                            <a href="#/LikeWinter">冬防战报</a>
                            <!--<a>冬防战报</a>-->
                        </div>
                    </div>
                </li>
                <li>
                    <img style="padding: 0 20px" src="../assets/img/btn_intercalate.png" alt="">
                    <div class="Sixitem submenu">
                        <a><img src="../assets/img/btn_Backstage1.png" alt="">进入后台</a><br/>
                        <a v-on:click="exit"><img src="../assets/img/btn_quit1.png" alt="">退出系统</a>
                    </div>
                </li>
            </ul>
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
            //导航部分
//            $('.bnav li').on('click', function () {
//                $(this).addClass('active').siblings().attr("class", "");
//                $(this).addClass('active').siblings().children('div').css('display', 'none')
//                $(this).children('div').css('display', 'block')
//            });
//            $('.bnav li').on('mouseleave', function () {
//                $(this).children('div').css('display', 'none')
//            });
            //
//            $('.Oneitem').on('mouseleave',function () {
//                $('.Oneitem').css('display', 'none')
//            });
//            $('.Twoitem').on('mouseleave',function () {
//                $('.Twoitem').css('display', 'none')
//            });
//            $('.Threeitem').on('mouseleave',function () {
//                $('.Threeitem').css('display', 'none')
//            });
//            $('.Fouritem').on('mouseleave',function () {
//                $('.Fouritem').css('display', 'none')
//            });
//            $('.Fiveitem').on('mouseleave',function () {
//                $('.Fiveitem').css('display', 'none')
//            });
//            $('.Sixitem').on('mouseleave',function () {
//                $('.Sixitem').css('display', 'none')
//            });
            //
            this.lanrenzhijia('li');
        },
        methods: {
        		exit(){
        			this.$cookies.remove('auth')
        			setTimeout(() => {
//                        this.$message({
//                            message: '恭喜你，成功退出系统！',
//                            type: 'success'
//                        });
        				this.$router.push('/login')
        			})
        		},
                lanrenzhijia(_this){
                    $(_this).each(function(){
                        var $this = $(this);
                        var theMenu = $this.find(".submenu");
                        var tarHeight = theMenu.height()+20;
                        theMenu.css({height:0});
                        $this.hover(
                            function(){
                               // $(this).addClass("mj_hover_menu");
                                theMenu.stop().show().animate({height:tarHeight},400);
                            },
                            function(){
                               // $(this).removeClass("mj_hover_menu");
                                theMenu.stop().animate({height:0},400,function(){
                                    $(this).css({display:"none"});
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
    .header {
        width: 100%;
        height: 56px;
        background: #2494F2;
        //border-bottom: solid 2px #0b598e;
        .logo {
            float: left;
            width: auto;
            img {
                width: 40px;
                height: 40px;
                margin-top: -9px;
                margin-left: 20px;
                margin-right: 10px;
            }
        }
        .bnav {
            float: right;
            height: 56px;
            margin-right: 0px;
            li {
                float: left;
                width: auto;
                height: 56px;
                list-style: none;
                line-height: 56px;
                position: relative;
                img{
                    transition: all 2s;
                }
                :hover{
                    transform:rotate(3600deg);
                }
                p {
                    margin: 0;
                }
                i {
                    color: #fff;
                    padding: 0 15px;
                }
                :active {
                    color: #1080cc;
                }
                a {
                    color: #dee9f5 ;
                    padding: 0 20px;
                    font-size: 16px;
                    font-family: '微软雅黑';
                    cursor: pointer;
                    i{
                        display:inline-block;
                        width: 9px;
                        height: 6px;
                        margin-left: 2px;
                       background: url("../assets/img/icon_sanjiao.png") no-repeat;
                    }
                }
                :hover {
                    text-decoration: none;
                }
                .Oneitem {
                    display: none;
                    z-index: 100;
                    width: 120px;
                    position: absolute;
                    top: 56px;
                    left: 0;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        text-align: center;
                        color: #666;
                        padding: 0 10px;
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        cursor: pointer;
                    }
                    :hover{
                        color: #1080cc;
                    }
                }
                .Twoitem {
                    display: none;
                    z-index: 100;
                    width: 265px;
                    padding: 10px 0;
                    padding-left: 22px;
                    position: absolute;
                    top: 56px;
                    left: 0;
                    background: #fff;
                    line-height: 22px;
                    text-align: left;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        display: inline-block;
                        color: #666;
                        font-size: 12px;
                        padding: 0 10px;
                        font-family: "Microsoft YaHei";
                        cursor: pointer;
                    }
                    h3{
                      text-align: left;
                      font-weight: bold;
                      font-size: 14px;
                        margin: 4px;
                      padding: 0;
                    }
                    :hover:not(h3){
                        color: #1080cc;
                    }
                }
                .Threeitem {
                    display: none;
                    text-align: left;
                    z-index: 100;
                    width: 256px;
                    position: absolute;
                    top: 56px;
                    left: 0;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 20px;
                    box-shadow: 0 0 5px #1080cc;
                    div {
                        float: left;
                        margin-left: 10px;
                        a {
                            text-align: center;
                            color: #666;
                            font-size: 12px;
                            padding: 0 10px;
                            font-family: "Microsoft YaHei";
                            cursor: pointer;
                        }
                        :hover:not(p){
                            color: #1080cc;
                        }
                        p{
                            font-weight: bold;
                        }
                        font {
                            color: #a94442;
                        }
                    }
                }
                .Fouritem {
                    text-align: left;
                    display: none;
                    z-index: 100;
                    width: 184px;
                    position: absolute;
                    top: 56px;
                    left: 0px;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        text-align: left;
                        color: #666;
                        font-size: 12px;
                        padding: 0 52px;
                        font-family: "Microsoft YaHei";
                        cursor: pointer;
                    }
                    :hover {
                        color: #1080cc;
                    }
                }
                .Fiveitem {
                    text-align: left;
                    display: none;
                    z-index: 100;
                    width: 460px;
                    position: absolute;
                    top: 56px;
                    right: 0px;
                    background: #fff;
                    line-height: 20px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    div {
                        margin-left: 19px;
                        a {
                            text-align: left;
                            display: inline-block;
                            width: 80px;
                            color: #666;
                            padding: 0 10px;
                            font-size: 12px;
                            font-family: "Microsoft YaHei";
                            cursor: pointer;
                        }
                        :hover:not(h3) {
                            color: #1080cc;
                        }
                        h3 {
                            color: #000;
                            margin: 4px!important;
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }
                }
                .Sixitem {
                    display: none;
                    z-index: 100;
                    width: 100px;
                    position: absolute;
                    top: 56px;
                    right: 0;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        color: #666;
                        font-size: 12px;
                        padding: 0 10px;
                        font-family: "Microsoft YaHei";
                        margin-left: -17px;
                        cursor: pointer;
                        img{
                            vertical-align: middle;
                            padding-right: 6px;
                            padding-left: 18px;
                            margin-top: -2px;
                        }
                    }
                    :hover {
                        cursor:pointer;
                        color: #1080cc;
                    }
                }
                .none{
                    display: none;
                }
            }
            >:hover{
                a{
                    color: #fff;
                    font-weight: bold;
                }
                i{
                    font-size: 18px;
                    font-weight: bold;
                }
                cursor:pointer;
                background:#0070CE;
            }
            .active {

                a {
                    color: #FFFFFF;
                    font-weight: bold;
                }
                i {
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
    }

</style>
