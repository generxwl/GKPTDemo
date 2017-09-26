<template>
    <div class="Paneldatavideo">
        <!--企业监测-->
        <div id="list">
            <div class="qianren"><map-handle></map-handle></div>
            <div class="panel">
                <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
                <img id="shrink" src="../assets/img/右.png" v-if="you"/>
                <div class="main">
                    <div class="tables">
                        <!--选项-->
                        <a id="shishi" >网络污染源数量超标统计</a>
                        <div class="xian"></div>
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
              bus.$emit('cameraEvent',{CamName:this.currentRow.VideoName},longitude, latitude);
            },
            //页码变更
            handleCurrentChange(val) {
                this.setPageTable(10,val);
                //console.log(val)
            },
            //分页部分功能
            getPointByType(type){
                let rtValue = [];
                let dt = this.data;
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
//                        if (item.type === type) {
//                            rtValue.push(dt[i]);
//                        }
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
                this.data = data;
                this.ALLdata = [];
                let i = 1;
                this.data.forEach(item => {
                    const tableData = {};
                    tableData.SerialNumber = i++;//序号
                    tableData.VideoName = item.CamName;//行业
                    tableData.MonitoringType = item.TypeName;//类型
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
            search(){//搜索
                let _this=this;
                if(this.filters.name){
                   let data = _this.data;
                    _this.tableData = [];
                    let i = 1;
                        data.forEach(item => {
                            const Data = {};
                            if(item.CamName == _this.filters.name) {
                                Data.SerialNumber = i++;//序号
                                Data.VideoName = item.CamName;//行业
                                Data.MonitoringType = item.TypeName;//类型
                                Data.Id = item.Id;//城市id
                                Data.Latitude = item.Latitude;//纬度
                                Data.Longitude = item.Longitude;//经度
                            _this.tableData.push(Data);
                            }
                        })

                }else{
                    _this.$message({
                        message: '请输入筛选条件!',
                        type: 'success'
                    });
                };
            }
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
                        margin-left: -200px;
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
            }
        }
    }


</style>
