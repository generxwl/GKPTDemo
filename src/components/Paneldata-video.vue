<template>
    <div class="Paneldatavideo">
        <!--视频监测-->
        <div id="list">
            <div class="qianren"><map-handle></map-handle></div>
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <div class="tables">
                        <!--选项-->
                        <a id="shishi" >视频设备统计</a>
                        <div class="xian"></div>
                    </div>
                    <div class="yuanzhan">
                        <div class="jdflaot" style="margin-left: 30px">
                            <div id="guang1" style="width: 90px;height: 90px;"></div>
                            <div class="texts">0</div>
                            <p>开发区</p>
                        </div>
                        <div class="jdflaot">
                            <div id="guang2" style="width: 90px;height: 90px"></div>
                            <div class="texts">10</div>
                            <p>广阳区</p>
                        </div>
                        <div class="jdflaot">
                            <div id="guang3" style="width: 90px;height: 90px"></div>
                            <div class="texts">0</div>
                            <p>建设局</p>
                        </div>
                        <div class="jdflaot">
                            <div id="guang4" style="width: 90px;height: 90px"></div>
                            <div class="texts">0</div>
                            <p>安次区</p>
                        </div>
                    </div>
                    <div class="sousuo">
                        <div class="sleft">
                            <el-input v-model="filters.name" placeholder="请输入地址"></el-input>
                        </div>
                        <div class="sright">
                            <el-button type="primary" @click="searchData()">搜索</el-button>
                        </div>

                    </div>
                    <div class="table_video">
                        <el-table
                                :data="tableData"
                                border
                                @current-change="RowCurrentChange"
                                style="width: 100%">
                            <el-table-column
                                    prop="SerialNumber"
                                    label="序号"
                                    width="80">
                            </el-table-column>
                            <el-table-column
                                    prop="CamName"
                                    label="视频名称"
                                    width="220">
                            </el-table-column>
                            <el-table-column
                                    prop="TypeName"
                                    label="监控类型">
                            </el-table-column>
                        </el-table>
                        <!--分页条-->
                        <div class="Pagination" style="text-align: left;margin-top: 10px;">
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-size="pagesize"
                                    layout="total, prev, pager, next"
                                    :total="totalCount">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="zhichi">
                        <p style="color: #666;padding-top: 10px">技术支持单位：开发区管委会，广阳区政府，安次区政府</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import MapHandle from '@/map/controls/MapHandle'
    export default {
        name: 'PaneldataGrid',
        data () {
            return {
                zuo:false,
                you:true,
                tableData:[],
                allData:[],
                currentRow: null,
                pagesize: 10,
                currentPage: 1,
                totalCount:0,
                value2: '',
                type:'VOC企业',
                filters: {
                    name: ''
                },
            }
        },
        created(){
            bus.$on('loadVideoData', this.initlistData);
        },
        mounted(){
            //右侧收放
            let that = this;
            var flag = true;
            //
            $('.first .tables a').on('click', function () {
                $(this).addClass('bai').siblings().removeClass('bai')
            })
            $('#list #shrink').on('click', function () {
                if (flag) {
                    that.zuo=true;
                    that.you=false;
                    $('#list').animate({
                        'right': '-437px'
                    });
                    flag = false;
                } else {
                    that.zuo=false;
                    that.you=true;
                    $('#list').animate({
                        'right': '0px'
                    });
                    flag = true;
                }
            })
            //视频进度图
            setTimeout(function () {
                that.yuantuset1();
                that.yuantuset2();
                that.yuantuset3();
                that.yuantuset4()
            }, 500)
          $("body").keydown(function(evt) {
            if (event.keyCode == "13") {
              that.searchData();
            }
          });
        },
        methods: {
            initlistData(data){
                let sudata = data;
                this.SetDataList(sudata)
                this.totalCount = this.ALLdata.length;
                this.allData = this.ALLdata;
                this.setPageTable(10,1);
            },
            //排序
            compare (propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName]
                    let value2 = object2[propertyName]
                    return value2 - value1
                }
            },
            //table行点击
            RowCurrentChange(val){
              this.currentRow = val;
              let latitude = this.currentRow.Latitude;//纬度
              let longitude = this.currentRow.Longitude;//经度
              //bus.$emit('cameraEvent',{CamName:this.currentRow.VideoName},longitude, latitude);
              bus.$emit('cameraEvent',this.currentRow,longitude, latitude);
            },
            //开发区进度
            yuantuset1(){
//                let Datavlue = 500 - this.Datalist.aqi;
//                let Bianvlue = this.Datalist.aqi;
//                let Color = this.Datalist.aqiColor;
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('guang1'));
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

                    },
                    series: [
                        {
                            name: '在线监测',
                            type: 'pie',
                            radius: ['100%', '80%'],
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
                            {value: 100, name: '未铺设'},
                            {value:0, name: '设备'}

                        ],
                        color: [
                            '#ccc',
                            "#00e401"
                        ]
                    }]
                })
            },
            //广阳区进度
            yuantuset2(){
//                let Datavlue = 500 - this.Datalist.aqiAccu;
//                let Bianvlue = this.Datalist.aqiAccu;
//                let Color = this.Datalist.accuAqiColor;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('guang2'));
                app.title = '';
                // 指定图表的配置项和数据

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                    },
                    series: [
                        {
                            name: '在线监测',
                            type: 'pie',
                            radius: ['100%', '80%'],
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
                            {value: 90, name: '未铺设'},
                            {value:10, name: '设备'}

                        ],
                        color: [
                            '#ccc',
                            "#00e401"
                        ]
                    }]
                })
            },
            //建设局进度
            yuantuset3(){
//                let Datavlue = 112.53 - this.Datalist.ComplexIndex;
//                let Bianvlue = this.Datalist.ComplexIndex;
//                let Color = this.Datalist.aqiColor;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('guang3'));
                app.title = '';
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',

                    },
                    series: [
                        {
                            name: '在线监测',
                            type: 'pie',
                            radius: ['100%', '80%'],
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
                            {value: 100, name: '未铺设'},
                            {value: 0, name: '设备'}

                        ],
                        color: [
                            '#ccc',
                            "#00e401"
                        ]
                    }]
                })
            },
            //安次区进度
            yuantuset4(){
//                let Datavlue = 112.53 - this.Datalist.ComplexIndex;
//                let Bianvlue = this.Datalist.ComplexIndex;
//                let Color = this.Datalist.aqiColor;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('guang4'));
                app.title = '';
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',

                    },
                    series: [
                        {
                            name: '在线监测',
                            type: 'pie',
                            radius: ['100%', '80%'],
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
                            {value: 100, name: '未铺设'},
                            {value: 0, name: '设备'}

                        ],
                        color: [
                            '#ccc',
                            "#00e401"
                        ]
                    }]
                })
            },
            //页码变更
            handleCurrentChange(val) {
                this.setPageTable(10,val);
                //console.log(val)
            },
            //分页部分功能
            getPointByType(type,data){
                let rtValue = [];
                let dt = data;
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
                        if (item.TypeName === type) {
                            rtValue.push(dt[i]);
                        }
                    }
                }
                return rtValue;
            },
            //
            setPageTable(pageSize,pageNum){
                let rtValue = [];
                let startNum = pageSize*(pageNum-1);
                for(let i=0;i<pageSize;i++){
                    if((startNum+i+1) > this.allData.length)
                        break;
                    rtValue.push(this.allData[startNum+i]);
                }
                this.tableData = rtValue;
            },
            //设置分页所需要数据
            SetDataList(data){
                this.data = this.getPointByType(this.type,data);
                this.ALLdata = [];
                let i = 1;
                this.data.forEach(item => {
                    const tableData = {};
                    tableData.SerialNumber = i++;//序号
                    tableData.CamName = item.CamName;//行业
                    tableData.TypeName = item.TypeName;//类型
                    tableData.Id = item.Id;//城市id
                    tableData.Latitude = item.Latitude;//纬度
                    tableData.Longitude = item.Longitude;//经度
                    this.ALLdata.push(tableData);
                })
            },
            //时间转换
            dateFtt(fmt, date){
                var o = {
                    "M+": date.getMonth() + 1,                 //月份
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
            searchData() {
              // 声明变量
              let filter, table, tr, td, i;
              filter = this.filters.name;
              table = document.getElementsByClassName("el-table__body")[0];
              tr = table.getElementsByTagName("tr");
              // 循环表格每一行，查找匹配项
              for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                  if (td.innerHTML.indexOf(filter) > -1) {
                    tr[i].style.display = "";
                  } else {
                    tr[i].style.display = "none";
                  }
                }
              }
            },

        },
//        filters: {
//            two (value){
//                if (!value) {
//                    return ''
//                };
//                return value.toFixed(2);
//            }
//        },
        components: {MapHandle}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .Paneldatavideo {
        width: 410px;
        height: auto;
        background-color: #666;
        position: absolute;
        top: 50px;
        right: 0;
        .mapdw{
            width: 25px;
            height: 25px;
            display: block;
            margin: -5px 43px;
        }
        #list {
            background: #fff;
            position: fixed;
            width: 437px;
            height: 100%;
            top: 51px;
            right: 0;
            z-index: 9;
            box-shadow: 0 0 15px #333333;
            .qianren {
                position: absolute;
                left: -90px;
                top:64%;
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
                .tables{
                    width: 100%;
                    line-height: 38px;
                    a{
                        margin-left: -270px;
                        display: inline-block;
                        font-size: 16px;
                        border-bottom: solid 2px #1080cc;
                        padding: 0 20px;
                        margin-bottom: -2px;
                    }
                    .xian{
                        width: 100%;
                        border:solid 1px #ccc;
                    }
                }
                .sousuo{
                    width: 96%;
                    margin-top: 10px;
                    margin-left: 4%;
                    border-top:solid 1px #ccc;
                    margin-bottom: 25px;
                    height: 40px;
                    padding-top: 15px;
                    .sleft{
                        float: left;
                    }
                    .sright{
                        margin-left: 10px;
                        float: left;
                    }
                }
                .yuanzhan {
                    /*APP写进去*/
                    width: 100%;
                    height: 150px;
                    .jdflaot {
                        margin-top: 25px;
                        margin-bottom: 25px;
                        float: left;
                        margin-left: 8px;
                        p {
                            text-align: center;
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }
                    div {
                        margin-bottom: 8px;
                        position: relative;
                        .texts {
                            width: 100%;
                            height: 30px;
                            position: absolute;
                            top: 32px;
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }


</style>
