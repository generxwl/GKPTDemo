<template>
  <div class="PaneldataStaticDust">
    <!--静态原清单测面板-->
    <div id="list">
      <div class="qianren">
        <map-handle></map-handle>
      </div>
      <div class="panel">
        <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
        <img id="shrink" src="../assets/img/右.png" v-if="you"/>
        <div class="main">
          <!---->
          <div class="tables">
            <!--选项-->
            <a id="shishi" >污染源分类</a>
            <font @click="chengeteget()">{{wall}}</font>
          </div>
          <div class="symume" v-show="symume">
            <a><strong>■</strong>工业企业源</a>
            <a><strong>▲</strong>移动源</a>
            <a>加油站</a>
            <a><strong>●</strong>餐饮油烟</a>
            <a>扬尘源 <strong>∨</strong></a>
            <a>其他溶剂使用源 <strong>∨</strong></a>
          </div>
          <div class="fenbutu">
            <div class="bing_text">总排放量：{{1998}} <span>污染总数：{{122}}</span></div>
            <div class="bing_item1" id="bing_item1" style="width: 190px;height: 180px;"></div>
            <div class="bing_item_lable">
              <ul>
                <li><i style="background: #08a1ed"></i>工业企业</li>
                <li><i style="background: #a2c73b"></i>汽修</li>
                <li><i style="background: #f2cd49"></i>干洗</li>
                <li><i style="background: #85dbce"></i>餐饮油烟</li>
                <li><i style="background: #ce93e3"></i>移动源</li>
                <li><i style="background: #6c68e1"></i>加油站</li>
                <li><i style="background: #e5763f"></i>施工扬尘源</li>
              </ul>
            </div>
          </div>
          <!---->
          <div class="sousuo">
            <div class="sleft">
              <el-input v-model="filters.name" placeholder="请输入地址"></el-input>
            </div>
            <div class="sright">
              <el-button type="primary" @click="searchData()">搜索</el-button>
            </div>

          </div>
          <!---->
          <div class="table_container">
            <el-table
                    :data="tableData"
                    border
                    stripe
                    highlight-current-row
                    @current-change="RowCurrentChange"
                    style="width: 400px">
              <el-table-column
                      property="NetworkName"
                      label="网络名称"
                      width="90">
              </el-table-column>
              <el-table-column
                      property="Name"
                      label="名称"
                      width="110">
              </el-table-column>
              <el-table-column
                      property="Industry"
                      label="行业"
                      width="70">
              </el-table-column>
              <el-table-column
                      property="Emission"
                      label="排放物"
                      width="65">
              </el-table-column>
              <el-table-column
                      property="EmissionAmount"
                      label="排放量"
                      width="65"
              >
              </el-table-column>
            </el-table>
            <!--分页条-->
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
              <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-size="pagesize"
                      layout="total, prev, pager, next"
                      :total="totalCount">
              </el-pagination>
            </div>
          </div>
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
    name: 'PaneldataStaticDust',
    data () {
      return {
        zuo: false,
        you: true,
        type: 'PM2.5',
        labelType: 'PM2.5',
        ALLdata: [],
        filters: {
              name: ''
          },
        tableData: [],
        symume:true,
        wall:'收起∧',
        allData: [],
        currentRow: null,
        pagesize: 10,
        currentPage: 1,
        totalCount: 0,
        value1: '',
        value2: '',
      }
    },
    created(){
        //原清单
        api.GetsourcetypeAllInfo().then(res => {
            // [
            //  {
            //    "code": "ps001",
            //    "id": 1,
            //    "name": "工业企业源",
            //    "timetamp": 1509004260000
            //  }
            // ]
            let data = res.data.sourcetype;
            //this.SouData = data;
            console.log(data)
        })
        //
        this.ChenageGetDataList()
    },
    mounted(){
      //右侧收放
      let that = this;
      var flag = true;
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
      //
        setTimeout(function () {
            that.yuantuset1();
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
      initlistData(data, type){
        this.type = type;
        let sudata = data;
        this.SetDataList(sudata, type)
        this.totalCount = this.ALLdata.length;
        this.allData = this.ALLdata;
        this.setPageTable(10, 1);
      },
      getPollution(type){
        let rtValue = type;
        switch (type.toUpperCase()) {
          case 'PM2.5':
            rtValue = 'pm25';
            break;
          case 'PM10':
            rtValue = 'pm10';
            break;
          case 'TEMP':
            rtValue = 'temp';
            break;
          case 'HUMI':
            rtValue = 'humi';
            break;
          case 'WINDSPEED':
            rtValue = 'windspeed';
            break;
          case 'WINDDIRECTION':
            rtValue = 'winddirection';
            break;
        }
        //console.log(rtValue);
        return rtValue;
      },
      getPollutionTarget(type){
        let rtValue = type;
        switch (type.toUpperCase()) {
          case 'INDEX':
            rtValue = '综指';
            break;
          case 'TEMP':
            rtValue = '温度';
            break;
          case 'HUMI':
            rtValue = '湿度';
            break;
          case 'WINDSPEED':
            rtValue = '风级';
            break;
          case 'WINDDIRECTION':
            rtValue = '风向';
            break;
        }
        console.log(rtValue);
        return rtValue;
      },
      //table点击事件
      RowCurrentChange(val){
        this.currentRow = val;
//        let citygid = this.currentRow.citygid;//城市id
//        let latitude = this.currentRow.latitude;//纬度
//        let longitude = this.currentRow.longitude;//经度
//        //console.log(this.currentRow)
//        bus.$emit('showDustInfoWindow', longitude, latitude, citygid);
      },
      //
      SetDataList(data, type){
        //console.log(data)
        data = typeof data === 'string' ? JSON.parse(data) : data;
        this.data = data;
        this.ALLdata = [];
        let i = 1;
 //       let dt2 = this.getPointByType(this.type);
//        let dt2 = dt1.sort(this.compare(this.getPollution(type)));
        data.forEach(item => {
          const tableData = {};
          tableData.ranking = i++;//排名
          tableData.NetworkName = '---';//网格名称
          tableData.Name = item.entname;//名称
          tableData.Industry = '---';//行业
          tableData.Emission = '---';//排放物
          tableData.EmissionAmount = '---';//排放量
          tableData.citygid = item.id;//城市id
          this.ALLdata.push(tableData);
        })
      },
      //每页显示数据量变更
      handleSizeChange(val) {
        //this.pagesize = val;
      },
      //页码变更
      handleCurrentChange(val) {
        this.setPageTable(10, val);
        //console.log(val)
      },
      //行业排放量分布图
      yuantuset1(){

            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('bing_item1'));
            // 指定图表的配置项和数据
//
            let option = {
                title : {
                    text: '行业排放量分布图',
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    },
                    x:'left'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '70%',
                        center: ['50%', '60%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data:[
                            {value:335, name:'工业企业'},
                            {value:310, name:'汽修'},
                            {value:234, name:'干洗'},
                            {value:135, name:'餐饮油烟'},
                            {value:548, name:'移动源'},
                            {value:500, name:'加油站'},
                            {value:500, name:'施工扬尘源'}
                        ],

                    }
                ]
            };


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            //动态设置参数
//                myChart.setOption({
//                    series: [{
//                        data: [
//                            {value: Datavlue, name: '占比'},
//                            {value: Bianvlue, name: 'api'}
//
//                        ],
//                        color: [
//                            '#ccc',
//                            Color
//                        ]
//                    }]
//                })
        },
      //
      setPageTable(pageSize, pageNum){
        let rtValue = [];
        let startNum = pageSize * (pageNum - 1);
        for (let i = 0; i < pageSize; i++) {
          if ((startNum + i + 1) > this.allData.length)
            break;
          rtValue.push(this.allData[startNum + i]);
        }
        this.tableData = rtValue;
      },
      //分页部分功能
      getPointByType(type){
        let rtValue = [];
        let dt = this.data;
        if (dt) {
          for (let i = 0, length = dt.length; i < length; i++) {
            let item = dt[i];
            if (item.type === type) {
              rtValue.push(dt[i]);
            }
          }
        }
        return rtValue;
      },
      //改变收起状态
      chengeteget(){
          this.symume = !this.symume;
          if(this.symume == false ){
              this.wall = '展开∨'
          }else {
              this.wall = '收起∧'
          }
      },
      //type更改
      refreshTable(type){
        this.type = type;
        this.labelType = this.getPollutionTarget(type);
        this.SetDataList(this.data, type);
        this.totalCount = this.ALLdata.length;
        this.allData = this.ALLdata;
        this.setPageTable(10, 1);
      },
      switchRender(type){
        this.type = type;
        this.labelType = this.getPollutionTarget(type);
        this.setdata(this.data, this.type)
      },
      ChenageGetDataList(typeid){
          api.GetallInfoBySourceType(typeid).then(res => {
              let data = res.data.ExtraData;
              this.initlistData(data)
          })
      }
    },
   components: {MapHandle}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .PaneldataStaticDust {
    width: 410px;
    height: auto;
    background-color: #666;
    position: absolute;
    top: 56px;
    right: 0;

    #list {
      background: #fff;
      position: fixed;
      width: 437px;
      height: 100%;
      top: 56px;
      right: 0;
      z-index: 9;
      box-shadow: 0px 5px 15px #333333;
      .tables{
        font{
          float: right;
          margin-right: 30px;
        }
      }
      .symume{
        width: 100%;
        padding-left: 20px;
        padding-bottom: 15px;
        strong{
          font-size: 18px;
          font-weight: bold;
        }
        a{
          display:inline-block;
          color: #666;
          width: 120px;
          text-align: left;
          margin-top: 10px;
        }
        :hover{
          color: #1080cc;
        }
        border-bottom:solid 1px #ccc ;
      }
      .fenbutu{
        padding-top: 20px;
        width: 90%;
        height: 220px;
        .bing_text{
          text-align: left;
          padding-left: 25px;
          font-weight: bold;
        }
        .bing_item1{
          width: 180px;
          margin-left: 20px;
          float: left;
        }
        .bing_item_lable{
          float: left;
          width: 160px;
          padding-top: 58px;
          ul{
            li{
              text-align: left;
              font-size: 12px;
              width: 80px;
              list-style: none;
              margin-top: 5px;
              float: left;
              i{
                display: inline-block;
                width: 18px;
                height: 8px;
                border-radius: 5px;
              }
            }
          }
        }
      }
      .qianren {
        position: absolute;
        left: -96px;
        top: 64%;
      }
      img {
        position: absolute;
        top: 40%;
        left: -17px;
        cursor: pointer;
        float: left;
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
      .table_container {
        margin-top: 30px;
        margin-left: 16px;
      }
      .main {
        height: auto;
          .tables{
            width: 100%;
            line-height: 38px;
            a{
              margin-left: -248px;
              display: inline-block;
              font-weight: bold;
              font-size: 16px;
              padding: 0 20px;
              margin-bottom: -2px;
            }
          }

      }
    }
  }


</style>
