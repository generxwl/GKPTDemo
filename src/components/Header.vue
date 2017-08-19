<template>
    <div class="header">
        <div class="navbox">
            <!--环境监测-->
            <div class="logo">
                <img src="../assets/img/logo.png" alt="logo">
            </div>
            <ul class="bnav">
                <li>
                    <a>环境监测网</a>
                    <div class="Oneitem">
                        <a href="#/">监测点</a><br/>
                        <a href="#/superstation">超级站</a>
                    </div>
                </li>
                <li>
                    <a>传感网</a>
                    <div class="Twoitem">
                        <a>视频监控</a><br/>
                        <a href="#/SensorNetwork">传感器</a>
                    </div>
                </li>
                <li>
                    <a>在线源清单</a>
                    <div class="Threeitem">
                        <div>
                            <font>动态源清单</font><br/>
                            <a>企业在线监测</a><br/>
                            <a>机动车</a><br/>
                            <a href="#/DustOnline">扬尘在线监测</a>
                        </div>
                        <div>
                            <font>静态源清单</font>
                        </div>
                    </div>
                </li>
                <li>
                    <a>气象预报</a>
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
                    <a>数据研判</a>
                    <div class="Fiveitem">
                        <div>
                            <font>城市排名</font><br/>
                            <a>城市排名</a><br/>
                            <a>同期变化率</a><br/>
                            <a>百分比对比</a>
                        </div>
                        <div>
                            <font>数据对比</font><br/>
                            <a>小时均值比</a><br/>
                            <a>日均值比</a><br/>
                            <a>污染物对比</a><br/>
                            <a>固定源统计</a><br/>
                            <a href="#/DustEmissionStatistics">扬尘源统计</a><br/>
                            <a href="#/DistrictsCounties">区县打分</a>
                        </div>
                        <div>
                            <font>传感网统计</font><br/>
                            <a>曲线打分</a><br/>
                            <a>均值比</a><br/>
                            <a>环比分析</a>
                        </div>
                    </div>
                </li>
                <li>
                    <i class="iconfont icon-shezhi"></i>
                    <div class="Sixitem">
                        <a><i class="iconfont icon-fangzi-copy"></i>进入后台</a><br/>
                        <a v-on:click="exit"><i class="iconfont icon-kaiguan"></i>退出系统</a>
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
        height: 60px;
        background: #1080cc;
        border-bottom: solid 2px #0b598e;
        .logo {
            float: left;
            width: auto;
            height: 60px;
            img {
                margin-top: 12px;
                margin-left: 20px;
            }
        }
        .bnav {
            float: right;
            height: 60px;
            margin-right: 0px;
            li {
                float: left;
                width: 120px;
                height: 60px;
                list-style: none;
                line-height: 60px;
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
                    color: #fff;
                    padding: 0 10px;
                    font-size: 20px;
                    font-family: '宋体';
                    cursor: pointer;
                }
                :hover {
                    text-decoration: none;
                }
                //
                .Oneitem {
                    display: none;
                    z-index: 100;
                    width: 120px;
                    position: absolute;
                    top: 60px;
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
                    :hover {
                        color: #1080cc;
                    }
                }
                .Twoitem {
                    display: none;
                    z-index: 100;
                    width: 120px;
                    position: absolute;
                    top: 60px;
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
                    :hover {
                        color: #1080cc;
                    }
                }
                .Threeitem {
                    display: none;
                    z-index: 100;
                    width: 260px;
                    position: absolute;
                    top: 60px;
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
                            font-size: 14px;
                            font-family: "Microsoft YaHei";
                            cursor: pointer;
                        }
                        :hover {
                            color: #1080cc;
                        }
                        font {
                            color: #a94442;
                        }
                    }
                }
                .Fouritem {
                    display: none;
                    z-index: 100;
                    width: 120px;
                    position: absolute;
                    top: 60px;
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
                    :hover {
                        color: #1080cc;
                    }
                }
                .Fiveitem {
                    display: none;
                    z-index: 100;
                    width: 350px;
                    position: absolute;
                    top: 60px;
                    right: 0px;
                    background: #fff;
                    line-height: 25px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px #1080cc;
                    div {
                        float: left;
                        margin-left: 19px;
                        a {
                            text-align: center;
                            color: #666;
                            font-size: 14px;
                            font-family: "Microsoft YaHei";
                            cursor: pointer;
                        }
                        :hover {
                            color: #1080cc;
                        }
                        font {
                            color: #a94442;
                        }
                    }
                }
                .Sixitem {
                    display: none;
                    z-index: 100;
                    width: 120px;
                    position: absolute;
                    top: 60px;
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
                        color: #1080cc;
                    }
                }
                .none{
                    display: none;
                }
            }
            .active {
                background: url("../assets/img/菜单栏选中后背景.png") no-repeat center #fff;
                a {
                    color: #1080cc;
                }
                i {
                    color: #1080cc;
                }
            }
        }
    }

</style>
