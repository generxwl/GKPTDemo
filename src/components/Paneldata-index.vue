<template>
    <div class="Paneldataindex">
        <!--首页面板-->
        <div id="list">
            <div class="qianren"><map-handle></map-handle></div>
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <!--切换部分-->
                    <div class=""></div>
                    <!--统计部分-->
                    <div class=""></div>
                    <!--饼图展示-->
                    <div class=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    import MapHandle from '@/map/controls/MapHandle'
    export default {
        name: 'paneldata',
        data () {
            return {
                zuo: false,
                you: true,
                //tables数据
            }
        },

        created(){
//            api.GetLfAirData().then(res => {
//                let shoulist = JSON.parse(res.data);
//                this.Datalist = shoulist.obj
//                console.log(this.Datalist)
//                bus.$on('switchRender', this.switchRender);
//            })

        },
        mounted(){
            //右侧收放
            let that = this;
            var flag = true;
            //
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
            //
            $('#list #shrink').on('click', function () {
                if (flag) {
                    that.zuo = true;
                    that.you = false;
                    $('#list').animate({
                        'right': '-437px'
                    });
                    flag = false;
                } else {
                    that.zuo = false;
                    that.you = true;
                    $('#list').animate({
                        'right': '0px'
                    });
                    flag = true;
                }
            })
            //圆进度图
            setTimeout(function () {
//                that.yuantuset1();
//                that.yuantuset2();
//                that.yuantuset3()
            }, 500)
        },
        methods: {
            //排序
            compare (propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName]
                    let value2 = object2[propertyName]
                    return value2 - value1
                }
            },
            //table点击事件
            RowCurrentChange(val){
                this.currentRow = val;
                let citygid = this.currentRow.citygid;//城市id
                let latitude = this.currentRow.latitude;//纬度
                let longitude = this.currentRow.longitude;//经度
               // console.log(this.currentRow)
                bus.$emit('showWindowInfo', longitude,latitude, citygid)
            },
            //监听数据
            setdata(data, type){
//                this.data = data;
//                this.tableData = [];
//                //console.log(type)
//                let i = 1;
//                let dt1 = this.getPointByType(this.ptType);
//                let dt2 = dt1.sort(this.compare(type.toLowerCase()));
//                dt2.forEach(item => {
//                    const tableData = {};
//                    tableData.ranking = i++;
//                    tableData.InControl = item.pointname;//item.type;//类型
//                    tableData.citygid = item.citygid;//城市id
//                    tableData.latitude = item.latitude;//纬度
//                    tableData.longitude = item.longitude;//经度
//                    tableData.AirQualityGrade = item.quality;
//                    tableData.aqi = item[this.getPollution(type.toLowerCase())];//数值
//                    tableData.PrimaryPollutant = item.primary_pollutant;
//                    this.tableData.push(tableData);
//
//                })
            },
            //渲染
            switchRender(type){
                this.type = type;
                this.labelType = this.getPollutionTarget(type);
                this.setdata(this.data, this.type)
            },
            getPollution(type){
              let rtValue = type;
              switch(type.toUpperCase()){
                case 'PM2.5':
                  rtValue = 'pm25';
                  break;
                case 'INDEX':
                  rtValue = 'complexindex';
                  break;
                case 'WS':
                  rtValue = 'windspeed';
                  break;
                case 'WD':
                  rtValue = 'windangle';
                  break;
              }
              return rtValue;
            },
            //圆图api
            yuantuset1(){
                let Datavlue = 500 - this.Datalist.aqi;
                let Bianvlue = this.Datalist.aqi;
                let Color = this.Datalist.aqiColor;
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('main1'));
                app.title = '';
                // 指定图表的配置项和数据
//
                let option = {
                  tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['API']
                    },
                    series: [
                        {
                            name: 'api',
                            type: 'pie',
                            radius: ['100%', '90%'],
                            avoidLabelOverlap: false,
                            hoverAnimation:false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
                    series: [{
                        data: [
                            {value: Datavlue, name: '占比'},
                            {value: Bianvlue, name: 'api'}

                        ],
                        color: [
                            '#ccc',
                            Color
                        ]
                    }]
                })
            },
            //每页显示数据量变更
            handleSizeChange(val) {
                //this.pagesize = val;
            },
            //实时切换请求
            RealTimeFatch(){
//                let t = this;
//                this.leiji = false;
//                this.shishi = true;
//                this.tianqiyuji = true;
//                api.GetMonitoringPointReal().then(res=>{
//                    let shoulist = JSON.parse(res.data);
//                    t.setdata(shoulist.obj, t.type)
//                    bus.$emit('refreshLayer', shoulist.obj)
//                })

            },
            //累计切换请求
            CumulativeFatch(){
//                let t = this;
//                api.GetLfAirPollution().then(res => {
//                    let shoulist = JSON.parse(res.data);
//                    this.CumulativeData = shoulist.obj
//                    //console.log(this.CumulativeData)
//                })
//                api.GetMonitoringPointAccu().then(res=>{
//                    let shoulist = JSON.parse(res.data);
//                    t.setdata(shoulist.obj, t.type)
//                    bus.$emit('refreshLayer', shoulist.obj)
//                })
//                this.leiji = true;
//                this.shishi = false;
//                this.tianqiyuji = false;
            },
            //
            TimeChaXun(){
//                let t = this;
//                let time = this.dateFtt('yyyy-MM-dd hh:00:00',this.value2);
//                api.GetMonitoringPointHour(time).then(res=>{
//                    //console.log('时间查询数据')
//                    let shoulist = JSON.parse(res.data);
//                    t.setdata(shoulist.obj, t.type)
//                    bus.$emit('refreshLayer', shoulist.obj)
//                })
            },
            //时间转换
            dateFtt(fmt, date){
                var o = {
                    "M+": date.getMonth() + 1,               //月份
                    "d+": date.getDate(),                    //日
                    "h+": date.getHours(),                   //小时
                    "m+": date.getMinutes(),                 //分
                    "s+": date.getSeconds(),                 //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            //fangfa

        },
        components: {MapHandle}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .Paneldataindex {
        width: 410px;
        height: auto;
        background-color: #666;
        position: absolute;
        top: 60px;
        right: 0;
        .border_bottom{
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
        }
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
                left: -90px;
                top: 76%;
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

            }
        }
    }


</style>
