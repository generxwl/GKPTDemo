<template>
  <div class="DustEmissionStatistics">
    <!--扬尘源统计-->
    <v-header></v-header>
    <div class="chaxun">
      <div class="chaxunkuang">
        <div class="wbiaoti"><a>查询条件</a></div>
        <div class="input">
          <strong>工地名称</strong>
          <input type="text">
        </div>
        <div class="cxtyope">
          <span>所属区域</span>
          <el-select v-model="value4" clearable placeholder="请选择">
          <el-option
                  v-for="item in oneoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        </div>
        <div class="cxtime">
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option
                    v-for="item in oneoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="startend">
          <el-time-select
                  placeholder="起始时间"
                  v-model="startTime"
                  :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }">
                      </el-time-select>
                      <el-time-select
                              placeholder="结束时间"
                              v-model="endTime"
                              :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime
                }">
          </el-time-select>
        </div>
        <div class="button">
        <el-button type="primary">查询</el-button>
      </div>
      </div>
    </div>
    <!--table-->
    <div class="tables">
      <div class="wbiaoti"><a>列表</a></div>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                prop="Construction"
                label="工地名称"
                width="320">
        </el-table-column>
        <el-table-column
                prop="position"
                label="位置"
                width="400">
        </el-table-column>
        <el-table-column
                prop="pm10"
                label="PM10"
                width="200">
        </el-table-column>
        <el-table-column
                prop="pm25"
                label="PM2.5"
                width="200">
        </el-table-column>
        <el-table-column
                prop="windDirection"
                label="风向统计"
        >
          <template scope="scope">
            <el-button @click="tanchukuang()" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹出框-->
    <div class="tanchukuang" v-if="tanchu">
      <div class="fadess"></div>
      <div class="succ-pop">
        <div class="title">
          <a>风向占比</a><div class="el-icon-close" @click="guanbitanchukuang"></div>
        </div>
        <!---->
        <canvas id="wcanvas">
          抱歉，您的浏览器不支持Canvas。请升级您的浏览器！
        </canvas>
        <!---->
        <ul>
          <li><i style="background:#2fc7ca "></i>西风</li>
          <li><i style="background:#97b553 "></i>西北风</li>
          <li><i style="background:#59b1f0 "></i>北风</li>
          <li><i style="background:#b7a2dd "></i>东北风</li>
          <li><i style="background:#e6cf0f"></i>东风</li>
          <li><i style="background:#8c98b0 "></i>东南风</li>
          <li><i style="background:#d67b80 "></i>南风</li>
          <li><i style="background:#fdc79b"></i>西南风</li>
        </ul>
      </div>
    </div>
    <!--分页-->
    <div class="block">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, prev, pager, next, jumper"
              :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'index',
    data () {
      return {
        fullscreenLoading: false,
          tanchu:false,
          currentPage4: 100,
          tableData: [],
          allData:[],
          currentRow: null,
          pagesize: 10,
          currentPage: 1,
          totalCount:0,
          oneoptions: [{
              value: '选项1',
              label: '全部'
          }, {
              value: '选项2',
              label: '广安区'
          }, {
              value: '选项3',
              label: '安次区'
          }, {
              value: '选项4',
              label: '开发区'
          }],
          startTime: '',
          endTime: '',
          value4: ''
      }
    },
      created(){
          this.initlistData()
      },
    mounted(){
      this.openFullScreen()
      //饼图canvas
    },
    methods: {
      //加载动画
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
        //弹出框
        tanchukuang() {
          let that = this;
            this.tanchu = true;
            setTimeout(function () {
                that.bingtucanvas()
            },500)
        },
        guanbitanchukuang(){
            this.tanchu = false
        },
        bingtucanvas(){

                let canvas = document.getElementById("wcanvas");
                canvas.border = "1px solid #000";
                canvas.width = 490;
                canvas.height = 320;
                let ctx = canvas.getContext("2d");

                let data = [{
                    "value": 0.1,
                    "color": "#e6cf0f",
                    "title": "东风"
                },{
                    "value": 0.2,
                    "color": "#d67b80",
                    "title": "南风"
                },{
                    "value": 0.02,
                    "color": "#2fc7ca",
                    "title": "西风"
                },{
                    "value": 0.08,
                    "color": "#59b1f0 ",
                    "title": "北风"
                },
                    {
                        "value": 0.2,
                        "color": "#fdc79b",
                        "title": "西南风"
                    },
                    {
                        "value": 0.1,
                        "color": "#b7a2dd",
                        "title": "东北风"
                    },
                    {
                        "value": 0.1,
                        "color": "#8c98b0",
                        "title": "东南风"
                    },
                    {
                        "value": 0.2,
                        "color": "#97b553",
                        "title": "西北风"
                    },
                ];

                let tempAngle = -90;
                for(let i=0;i<data.length;i++){
                    // 开始绘制新状态的扇形
                    ctx.beginPath();
                    ctx.moveTo(240, 140);
                    ctx.fillStyle = data[i].color;
                    let angle = data[i].value*360;
                    let startAngle = tempAngle*Math.PI/180;
                    let endAngle = (tempAngle + angle)*Math.PI/180;
                    ctx.arc(240, 140, 120, startAngle, endAngle);
                    ctx.fill();
                    tempAngle+=angle;
                }



        },
        initlistData(){
            this.$axios({
                url: '/static/data/tables.json',
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {}
            }).then(res => {
                let dt = res.data.datas.YCYtongji.recommend_goods;
                this.totalCount = dt.length;
                this.allData = dt;
                this.setPageTable(10,1);
                console.log(dt);

            }, res=> {
                console.log('失败了')
            })
        },
        //每页显示数据量变更
        handleSizeChange(val) {
            //this.pagesize = val;
        },

        //页码变更
        handleCurrentChange(val) {
            this.setPageTable(10,val);
            console.log(val)
        },
        setPageTable(pageSize,pageNum){
            let rtValue = [];
            let startNum = pageSize*(pageNum-1);
            for(let i=0;i<pageSize;i++){
                if((startNum+i+1) > this.allData.length)
                    break;
                rtValue.push(this.allData[startNum+i]);
            }
            this.tableData = rtValue;
        }

    },
    components: {

    }//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .DustEmissionStatistics {
    width: 100%;
    height: 100%;
    background: rgb(250,250,250);
    .tanchukuang{
      /*灰色遮罩层*/
      .fadess{
        width:100%;
        height:100%;
        background:rgba(0, 0, 0, 0.8);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 998;
      }
      /*弹出层*/
      .succ-pop{
        width: 490px;
        height: 390px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -150px;
        z-index: 999;
        border-radius: 5px;
        border: solid 1px #357ebd;
        #canvas{
          width: 490px;
        }
        .title{
          width: 100%;
          height: 32px;
          line-height: 30px;
          text-align: left;
          background:#1080cc;
          a{
            color: #fff;
            font-size: 18px;
            padding-left: 20px;
          }
          div{
            margin-top: 8px;
            float: right;
            width: 24px;
            height: 24px;
            color: #fff;
            margin-right: 6px;
          }
        }
        ul{
          li{
            height: 20px;

            list-style: none;
            float: left;
            margin-left: 4px;
            i{
              border-radius: 4px;
              display: inline-block;
              width: 18px;
              height: 10px;
              margin-right: 3px;
            }
          }
        }
      }
    }
    .chaxun{
      width: 1300px;
      height: 100px;
      margin: 0 auto;

      .wbiaoti{
        a{
          display: inline-block;
          height: 20px;
          border-left:solid 3px #428bca;
          padding-left: 13px;
          font-size: 16px;
          line-height: 20px;
        }
        text-align: left;
        border-bottom: solid 1px #ccc;
        width: 100%;
        height: 40px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      .chaxunkuang{
          width: 100%;
          height: 40px;
          line-height: 45px;
        .input{
          float: left;
          width: 300px;
          height: 40px;
          input{
            height: 34px;
          }
        }
        .cxtyope{
          float: left;
          margin-left: 15px;
        }
        .cxtime{
          float: left;
          margin-left: 15px;
        }
        .startend{
          float: left;
          margin-left: 15px;
        }
        .button{
          float: left;
          margin-left: 15px;
        }
      }

    }
    .tables{

      width: 1300px;
      margin-top: 30px;
      margin-bottom: 20px;
      .wbiaoti{
        a{
          display: inline-block;
          height: 20px;
          border-left:solid 3px #428bca;
          padding-left: 13px;
          font-size: 16px;
          line-height: 20px;
        }
        text-align: left;
        width: 100%;
        height: 40px;
        margin-top: 30px;
        margin-bottom:0px;
      }
      height: auto;
      margin: 0 auto;
    }
  }
</style>
