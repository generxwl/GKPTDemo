<template>
  <div class="PaneldataStaticDust">
    <!--静态原清单测面板-->
    <div id="list">
      <div class="gensui">
        <div class="line_top">
          <toolbar @RightslideToggle="togleclick">
            <map-handle slot="toors"></map-handle>
          </toolbar>
        </div>
      </div>
      <div class="panel">
        <img class="shrink" src="../assets/img/左.png" v-if="zuo"/>
        <img class="shrink" src="../assets/img/右.png" v-if="you"/>
        <div class="main">
          <!---->
          <div class="tables">
            <!--选项-->
            <a id="shishi" >污染源分类</a>
            <font id="context">收起∧</font>
          </div>
          <div class="symume" id="content">
            <div class="YuanType">
              <input @click='changeChecked(1)' :class="checked.ps1 ? 'checked1' : 'bg1'" type="checkbox" name="code" value="ps001" id="male" />
              <label for="male">工业企业源</label>
            </div>
            <div class="YuanType">
              <input @click='changeChecked(2)' :class="checked.ps2 ? 'checked2' : 'bg2'" type="checkbox" name="code" value="ps002" id="male1" />
              <label for="male1">干洗</label>
            </div>
            <div class="YuanType">
              <input @click='changeChecked(3)' :class="checked.ps3 ? 'checked3' : 'bg3'" type="checkbox" name="code" value="ps003" id="male2" />
              <label for="male2">汽修</label>
            </div>
            <div class="YuanType">
              <input @click='changeChecked(4)' :class="checked.ps4 ? 'checked4' : 'bg4'" type="checkbox" name="code" value="ps004" id="male4" />
              <label for="male4">施工扬尘源</label>
            </div>
            <div class="YuanType">
              <input @click='changeChecked(5)' :class="checked.ps5 ? 'checked5' : 'bg5'" type="checkbox" name="code" value="ps005" id="male5" />
              <label for="male5">餐饮油烟</label>
            </div>
            <div class="YuanType">
              <input @click='changeChecked(6)' :class="checked.ps6 ? 'checked6' : 'bg6'" type="checkbox" name="code" value="ps006" id="male6" />
              <label for="male6">加油站</label>
            </div>

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
              <el-input v-model="filters.name" placeholder="名称"></el-input>
            </div>
            <div class="sright">
              <el-button type="primary" @click="searchAsName">搜索</el-button>
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
                      width="120">
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
  import Toolbar from '@/components/Toolbar'
  //import MapHandle from '@/map/controls/MapHandle'
  export default {
    name: 'PaneldataStaticDust',
    data () {
      return {
        zuo: false,
        you: true,
        type: 'SO2',
        labelType: 'SO2',
        ALLdata: [],
        filters: {
              name: ''
          },
        tableData: [],
        allData: [],
        currentRow: null,
        pagesize: 10,
        currentPage: 1,
        totalCount: 0,
        value1: '',
        value2: '',
        //用来存储搜索后的数据
        choiceData: [],
        //用来存储全部数据(变化)
        totolData: [],
        //用来存储全部数据(不变)
        dataL: [],
        checked: {
          ps1: false,
          ps2: false,  
          ps3: false,  
          ps4: false,  
          ps5: false,  
          ps6: false,  
        },
        flag:true
      }
    },
    created(){
        bus.$on('setStaticTarget',this.switchRender);
        bus.$on('setStaticData',this.initlistData);
        // this.ChenageGetDataList()
    },
    mounted(){
      //右侧收放
      let that = this;
      $('.shrink').on('click', function () {
          if (this.flag) {
              that.zuo = true;
              that.you = false;
              $('#list').animate({
                  'right': '-437px'
              });
              this.flag = false;
          } else {
              that.zuo = false;
              that.you = true;
              $('#list').animate({
                  'right': '0px'
              });
              this.flag = true;
          }
      })
        //
        $("#context").click(function() {
            $(this).text($("#content").is(":hidden") ? "收起∧" : "展开∨");
            $("#content").slideToggle();
        });
      //饼图
        setTimeout(function () {
            that.yuantuset1();
        }, 500);
    },
    methods: {
        togleclick(){
            let that = this;
            if (this.flag) {
                that.zuo = true;
                that.you = false;
                $('#list').animate({
                    'right': '-437px'
                });
                this.flag = false;
            } else {
                that.zuo = false;
                that.you = true;
                $('#list').animate({
                    'right': '0px'
                });
                this.flag = true;
            }
        },
      //多选请求
        GetcheckboxData(){
            let Newdata = [];
            let student = $(".YuanType input[name='code']:checked").serialize();
            let Ayydata = student.split('&code=').join(',')
            // console.log(Ayydata)
            this.ChenageGetDataList(Ayydata)
        },
      //排序
      compare (propertyName) {
        return function (object1, object2) {
          let value1 = object1[propertyName]
          let value2 = object2[propertyName]
           return value2 - value1
        }
      },
      initlistData(data, type){
        // console.log(data)
        this.type = type;
        let sudata = data;
        this.SetDataList(sudata, type)
        this.totalCount = this.ALLdata.length;
        this.allData = this.ALLdata;
        this.totolData = this.allData
        this.dataL = this.allData
        this.setPageTable(10, 1);
      },
      getPollution(type){
        let rtValue = type;
        switch (type) {
          case 'PM2.5':
            rtValue = 'm2';
            break;
          case 'PM10':
            rtValue = 'm1';
            break;
          case 'NH3':
            rtValue = 'nh3';
            break;
            case 'SO2':
                rtValue = 'so2';
                break;
            case 'NO2':
                rtValue = 'no';
                break;
          case 'BC':
            rtValue = 'bc';
            break;
            case 'CO':
                rtValue = 'co';
                break;
          case 'OC':
            rtValue = 'oc';
            break;
          case 'VOC':
            rtValue = 'voc';
            break;
        }
        //console.log(rtValue);
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
        let t = this;
        data = typeof data === 'string' ? JSON.parse(data) : data;
        this.data = data;
        this.ALLdata = [];
        let i = 1;
          let dt1 = this.getPointByType(type);
          let dt2 = dt1.sort(this.getPollution(type));
        dt2.forEach(item => {
          const tableData = {};
          tableData.ranking = i++;//排名
          tableData.NetworkName = '---';//网格名称
          tableData.Name = item.e;//名称
          tableData.Industry = item.po;//行业
          tableData.Emission = t.labelType;//排放物
          tableData.EmissionAmount = item.p[(t.getPollution(type))] ? item.p[(t.getPollution(type))] : '--';//排放量
          tableData.citygid = item.i;//城市id
          tableData.lo = item.lo;//城市经度
          tableData.la = item.la;//城市纬度
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
                        hoverAnimation:false,
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
                myChart.setOption({
                    series: [{
//                        data: [
//                            {value: Datavlue, name: '占比'},
//                            {value: Bianvlue, name: 'api'}
//
//                        ],
                        color: [
                            '#08a1ed',
                            '#a2c73b',
                            '#f2cd49',
                            '#85dbce',
                            '#ce93e3',
                            '#6c68e1',
                            '#e5763f'
                        ]
                    }]
                })
        },
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
        let t = this;
        let rtValue = [];
        let dt = this.data;
        if (dt) {
          for (let i = 0, length = dt.length; i < length; i++) {
            let item = dt[i];
            //if (item.jdjcBasGyqySn.co === type) {
              rtValue.push(dt[i]);
            //}
          }
        }
        return rtValue;
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
          // console.log(type)
          this.type = type;
          this.labelType = type;
          this.SetDataList(this.data, this.type)
      },
      //获取后台分类数据
      ChenageGetDataList(typeid){
          api.GetsourcetypeAllInfo(typeid).then(res => {
              let data = res.data.ExtraData;
              this.initlistData(data, this.type);
               setTimeout(() => {
                this.searchAsName()
              },50)
          })
      },
      //通过输入名称获取数据
      searchAsName() {
        // console.log(this.totolData)
        if(this.filters.name == '') {
          this.allData = this.dataL
          this.totalCount = this.dataL.length;
          this.setPageTable(10, 1);
        } else {
          this.choiceData = []
          for(var i = 0; i < this.totolData.length; i++) {
            // console.log(this.totolData[1].Name,this.filters.name)
            if(this.totolData[i].Name.indexOf(this.filters.name) >= 0) {
              this.choiceData.push(this.totolData[i])
            }
          }
          this.totalCount = this.choiceData.length;
          this.allData = this.choiceData
          this.setPageTable(10, 1);
          // console.log(this.choiceData)
        }
      },
      //点击切换复选框背景图片
      changeChecked (index) {
        switch (index) {
          case 1:
            this.checked.ps1 = !this.checked.ps1;
            break;
          case 2:
            this.checked.ps2 = !this.checked.ps2;
            break;
          case 3:
            this.checked.ps3 = !this.checked.ps3;
            break;
          case 4:
            this.checked.ps4 = !this.checked.ps4;
            break;
          case 5:
            this.checked.ps5 = !this.checked.ps5;
            break;
          case 6:
            this.checked.ps6 = !this.checked.ps6;
            break;
        }
      },
    },
      components: {Toolbar}
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
        height: 68px;
        padding-left: 17px;
        padding-bottom: 15px;
        .YuanType{
          width: 30%;
          height: 28px;
          float: left;
          text-align: left;
          padding-left: 8%;
          label {
            margin: 0;
            vertical-align: middle;
          }
          input {
            width: 15px;
            height: 15px;
            background-size: 15px 15px;
            background-repeat: no-repeat;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            vertical-align: middle;
            margin: 0;
          }
          .bg1 {
            background-image: url('../../static/imgs/originallist/ps001.png');
          }
          .bg2 {
            background-image: url('../../static/imgs/originallist/ps002.png');
          }
          .bg3 {
            background-image: url('../../static/imgs/originallist/ps003.png');
          }
          .bg4 {
            background-image: url('../../static/imgs/originallist/ps004.png');
          }
          .bg5 {
            background-image: url('../../static/imgs/originallist/ps005.png');
          }
          .bg6 {
            background-image: url('../../static/imgs/originallist/ps006.png');
          }
          .checked1 {
            background-image: url('../../static/imgs/originallist/ps001checked.png');
          }
          .checked2 {
            background-image: url('../../static/imgs/originallist/ps002checked.png');
          }
          .checked3 {
            background-image: url('../../static/imgs/originallist/ps003checked.png');
          }
          .checked4 {
            background-image: url('../../static/imgs/originallist/ps004checked.png');
          }
          .checked5 {
            background-image: url('../../static/imgs/originallist/ps005checked.png');
          }
          .checked6 {
            background-image: url('../../static/imgs/originallist/ps006checked.png');
          }
        }
        border-bottom:solid 1px #ccc;
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
      .gensui {
        .line_top{
          position: absolute;
          left: -368px;
          top: 24px;
          width: 352px;
          height: 46px;
          background: #fff;
          border:solid 1px #ccc;
        }
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
