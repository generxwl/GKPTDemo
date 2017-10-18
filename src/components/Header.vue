<template>
    <div class="header">
        <div class="navbox">
            <!--环境监测-->
            <div class="logo">
                <img src="../assets/img/logo.png" alt="logo">
            </div>
            <div style="color: #fff;float: left;height: 50px;line-height: 72px">2017版</div>
            <ul class="bnav">
                <li>
                    <a href="#/">首页</a>
                </li>
                <li>
                    <a>监测调度</a>
                    <div class="Twoitem">
                        <div>
                            <p>监测网</p>
                            <a href="#/Monitor">国省控点监测</a>
                            <a href="#/superstation">超级站</a>
                            <a href="#/SensorNetwork">传感网</a>
                        </div>
                        <div>
                            <p>散乱污监控</p>
                            <a href="#/ScatteredDirtVideos">散乱污监控</a>
                            <a href="#/Videos">企业及工地监控</a>
                        </div>
                        <div>
                            <p>GPS监控</p>
                            <a>渣土车</a>
                            <a>环卫车</a>
                        </div>
                    </div>
                </li>
                <li>
                    <a>源清单</a>
                    <div class="Threeitem">
                        <div>
                            <p>动态源清单</p>
                            <a href="#/EnterpriseEonitoring">企业在线监测</a>
                            <a href="#/DustOnline">扬尘在线监测</a>
                            <a>机动车路况</a>
                        </div>
                        <div>
                            <p>静态源清单</p>
                            <a href="#/StaticOriginalList" style="font-family:宋体">污染源清单</a>
                        </div>
                    </div>
                </li>
                <li>
                    <a>气象监测与预报</a>
                    <div class="Fouritem">
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
                    <a>大数据资源</a>
                    <div class="Fiveitem">
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
                        </div>
                    </div>
                </li>
                <li>
                    <i class="iconfont icon-shezhi"></i>
                    <div class="Sixitem">
                        <a><i class="iconfont icon-fangzi-copy" style="color: #999"></i>进入后台</a><br/>
                        <a v-on:click="exit"><i class="iconfont icon-kaiguan" style="color: #999"></i>退出系统</a>
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
            $('.bnav li').on('click', function () {
                $(this).addClass('active').siblings().attr("class", "");
                $(this).addClass('active').siblings().children('div').css('display', 'none')
                $(this).children('div').css('display', 'block')
            });
            $('.bnav li').on('mouseleave', function () {
                $(this).children('div').css('display', 'none')
            });
            //
            $('.Oneitem').on('mouseleave',function () {
                $('.Oneitem').css('display', 'none')
            });
            $('.Twoitem').on('mouseleave',function () {
                $('.Twoitem').css('display', 'none')
            });
            $('.Threeitem').on('mouseleave',function () {
                $('.Threeitem').css('display', 'none')
            });
            $('.Fouritem').on('mouseleave',function () {
                $('.Fouritem').css('display', 'none')
            });
            $('.Fiveitem').on('mouseleave',function () {
                $('.Fiveitem').css('display', 'none')
            });
            $('.Sixitem').on('mouseleave',function () {
                $('.Sixitem').css('display', 'none')
            });
            //
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
        		}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 50px;
        background: #1080cc;
        border-bottom: solid 2px #0b598e;
        .logo {
            float: left;
            width: auto;
            height: 50px;
            img {
                margin-top: 6px;
                margin-left: 20px;
            }
        }
        .bnav {
            float: right;
            height: 50px;
            margin-right: 0px;
            li {
                float: left;
                width: 120px;
                height: 50px;
                list-style: none;
                line-height: 50px;
                position: relative;
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
                    padding: 0 10px;
                    font-size: 16px;
                    font-family: '微软雅黑';
                    cursor: pointer;
                }
                :hover {
                    text-decoration: none;
                }
                &:nth-child(4){
                    width: 140px;

                }

                .Oneitem {
                    display: none;
                    z-index: 100;
                    width: 120px;
                    position: absolute;
                    top: 50px;
                    left: 0;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        text-align: center;
                        color: #666;
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
                    top: 50px;
                    left: 0;
                    background: #fff;
                    line-height: 22px;
                    text-align: left;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        display: inline-block;
                        color: #666;
                        font-size: 12px;
                        font-family: "Microsoft YaHei";
                        cursor: pointer;
                    }
                    :hover:not(p){
                        color: #1080cc;
                    }
                    p{
                      text-align: left;
                      font-weight: bold;
                      padding: 0;
                    }
                }
                .Threeitem {
                    display: none;
                    text-align: left;
                    z-index: 100;
                    width: 250px;
                    position: absolute;
                    top: 50px;
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
                    width: 120px;
                    position: absolute;
                    top: 50px;
                    left: 10px;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        text-align: left;
                        padding-left: 25px;
                        color: #666;
                        font-size: 12px;
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
                    top: 50px;
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
                    width: 120px;
                    position: absolute;
                    top: 50px;
                    left: 0;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    a {
                        color: #666;
                        font-size: 12px;
                        font-family: "Microsoft YaHei";
                        margin-left: -17px;
                        cursor: pointer;
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
            :hover{
                a{
                    color: #fff;
                    font-weight: bold;
                }
                i{
                    font-size: 18px;
                    font-weight: bold;
                }
                cursor:pointer;
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
