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
                    <a>监测调度<i></i></a>
                    <div class="Twoitem submenu same">
                        <div>
                            <h3>监测网</h3>
                            <a href="#/Monitor">国省控点监测</a>
                          <div class="line"></div>
                            <a href="#/superstation">超级站</a>
                          <div class="line"></div>
                            <a href="#/SensorNetwork">传感网</a>
                        </div>
                        <div>
                            <h3>散乱污监控</h3>
                            <a href="#/ScatteredDirtVideos">散乱污企业监控</a>
                          <div class="line"></div>
                            <a href="#/Videos">VOCs企业监控</a>
                          <div class="line"></div>
                            <a>高点监控</a>
                        </div>
                        <div>
                            <h3>GPS监控</h3>
                            <a>渣土车</a>
                          <div class="line"></div>
                            <a>环卫车</a>
                        </div>
                    </div>
                </li>
                <li>
                    <a>源清单<i></i></a>
                    <div class="Threeitem submenu same">
                        <div>
                            <h3>动态源清单</h3>
                            <a href="#/EnterpriseEonitoring">企业在线监测</a>
                          <div class="line"></div>
                            <a href="#/DustOnline">扬尘在线监测</a>
                          <div class="line"></div>
                            <a>机动车路况</a>
                        </div>
                        <div>
                            <h3>静态源清单</h3>
                            <a href="#/StaticOriginalList" >污染源清单</a>
                          <div class="line"></div>
                            <a >应急清单</a>
                        </div>
                    </div>
                </li>
                <li>
                    <a>气象监测与预报<i></i></a>
                    <div class="Fouritem submenu same">
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
                    <div class="Fiveitem submenu same">
                        <div>
                            <h3>城市排名</h3>
                            <a>城市排名</a>
                          <div class="line"></div>
                            <a>同期变化率</a>
                          <div class="line"></div>
                            <a>百分比对比</a>
                        </div>
                        <div>
                            <h3>数据对比</h3>
                            <a>小时均值比</a>
                          <div class="line"></div>
                            <a>日均值比</a>
                          <div class="line"></div>
                            <a>污染物对比</a>
                          <div class="line"></div>
                            <a>固定源统计</a>
                          <div class="line"></div>
                            <a href="#/DustEmissionStatistics">扬尘源统计</a>
                          <div class="line"></div>
                            <a href="#/DistrictsCounties">区县打分</a>
                        </div>
                        <div>
                            <h3>传感网统计</h3>
                            <a>曲线对比</a>
                          <div class="line"></div>
                            <a>均值比</a>
                          <div class="line"></div>
                            <a>环比分析</a>
                        </div>
                        <div>
                            <h3>市政及经济数据</h3>
                            <a>煤改电</a>
                          <div class="line"></div>
                            <a>煤改气</a>
                          <div class="line"></div>
                            <a>用电量</a>
                          <div class="line"></div>
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
                        <a class="houtai"><img src="../assets/img/btn_Backstage1.png" alt="">进入后台</a><br/>
                        <a class="tuichu" v-on:click="exit"><img src="../assets/img/btn_quit1.png" alt="">退出系统</a>
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
                msg: 'App',
                houtaiSrc:'../../static/imgs/mues/header/btn_Backstage2.png',
                houtaiChesSrc:'../../static/imgs/mues/header/btn_Backstage1.png',
                tuichuSrc:'../../static/imgs/mues/header/btn_quit2.png',
                tuichuChesSrc:'../../static/imgs/mues/header/btn_quit1.png'
            }
        },
        mounted(){
            let t = this;
            $(".houtai").hover(function(){
                $(".houtai img").attr('src', t.houtaiSrc);
            },function(){
                $(".houtai img").attr('src', t.houtaiChesSrc);
            });
            //
            $(".tuichu").hover(function(){
                $(".tuichu img").attr('src', t.tuichuSrc);
            },function(){
                $(".tuichu img").attr('src', t.tuichuChesSrc);
            });
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
                    color: #0070CE;
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
               /* .Oneitem {
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
                }*/
              .line{
                height:10px;
                width:1px;
               background:#DDDDDD;
                margin:0 13px;
                display:inline-block;
              }
                .same{
                  z-index: 100;
                  display:none;
                  background: #fff;
                  box-shadow:#ccc;
                  border:1px solid #ccc;
                  border-radius: 0 0 4px 4px;
                  padding:4px 20px 20px 20px;
                  text-align:left;
                  line-height:20px;
                  div{
                    text-align:left;
                    padding:0;
                  }
                    a {
                      color: #666;
                      font-size: 14px;
                      padding: 0;
                      font-family: "Microsoft YaHei";
                      cursor: pointer;
                      font-weight:normal;
                    }
                    h3{
                      margin:16px 0 8px 0;
                      color:#333333;
                      font-size:14px;
                      font-weight:bold;
                    }
                    :hover:not(h3){
                        color: #0070CE;
                    }
                }
              .Twoitem {
                position: absolute;
                top: 56px;
                left: 0;
                width:264px;
              }
              .Threeitem{
                position: absolute;
                top: 56px;
                left: 0;
                width:264px;
              }
                .Fouritem {
                    text-align: left;
                    display: none;
                    z-index: 100;
                    width: 184px;
                    position: absolute;
                    top: 56px;
                    left: 0;
                    background: #fff;
                    line-height: 30px;
                    box-shadow: 0 0 5px #ccc;
                  padding:10px 20px 30px;
                    a {
                      padding-left:10px;
                        color: #666;
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        cursor: pointer;

                    }
                    :hover {
                        color: #0070CE;
                    }
                }
                /*.Fiveitem {
                    text-align: left;
                    display: none;
                    z-index: 100;
                    width: 460px;
                    position: absolute;
                    top: 56px;
                    right: 0px;
                    background: #fff;
                  box-shadow:#ccc;
                  border:1px solid #ccc;
                  border-radius: 0 0 4px 4px;
                  padding:4px 20px 20px 20px;
                  line-height:14px;
                    div {
                      text-align:left;
                        a {
                          color: #666;
                          font-size: 14px;
                          padding: 0;
                          font-family: "Microsoft YaHei";
                          cursor: pointer;
                          font-weight:normal;
                          margin-right:28px;
                          line-height:20px;
                        }
                        :hover:not(h3) {
                            color: #1080cc;
                        }
                        h3 {
                          margin:16px 0 8px 0;
                          !*margin-bottom:12px;
                          margin-top:20px;*!
                          color:#333333;
                          font-size:14px;
                          font-weight:bold;
                        }
                    }
                }*/
              .Fiveitem{
                width: 460px;
                position: absolute;
                top: 56px;
                right: 0px;
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
