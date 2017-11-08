<template>
  <div class="PaneldataOnlineList">
    <!--在线监测面板-->
    <div id="list">
      <div class="gensui">
        <div class="line_top">
          <toolbar></toolbar>
        </div>
        <div class="line_bottom">
          <tone-color></tone-color>
        </div>
      </div>
      <div class="panel">
        <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
        <img id="shrink" src="../assets/img/右.png" v-if="you"/>
        <div class="main">
          <!--选项查询-->
          <div class="first">
            <div class="tables">
              <!--选项-->
              <a style="background: #fff">当前时间</a>
            </div>
            <div class="shijian">
              <!--时间选择-->
              <div class="block">
                <el-date-picker
                  v-model="value2"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </div>
            <div class="btnns">
              <button @click="btnClickEvent">查询</button>
            </div>
          </div>
          <!--排名-->
          <div class="table_container">
            <el-table
              :data="tableData"
              border
              stripe
              highlight-current-row
              @current-change="RowCurrentChange"
              style="width: 400px">
              <el-table-column
                property="ranking"
                label="排名"
                width="80">
              </el-table-column>
              <el-table-column
                property="InControl"
                label="名称"
                width="220">
              </el-table-column>
              <el-table-column
                property="aqi"
                :label="labelType"
                width="100">
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
  import ToneColor from '@/components/ToneColor'
  export default {
    name: 'PaneldataOnlineList',
    data () {
      return {
        zuo: false,
        you: true,
        type: 'PM2.5',
        labelType: 'PM2.5',
        ALLdata: [],
        tableData: [],
        allData: [],
        currentRow: null,
        pagesize: 10,
        currentPage: 1,
        totalCount: 0,
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
      }
    },
    created(){
      bus.$on('refreshDustRanking', this.initlistData);
      bus.$on('refreshDustTarget', this.refreshTable);
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
          let cumudata = [];
          let sudata1 =data;
          let sudata2 =[];
          //先河数据
          api.GetycXhHbPointsRaise().then(res => {
              let data = res.data;
              data = typeof data === 'string' ? JSON.parse(data) : data;
              data = {
                  status: data.hasOwnProperty('status') ? data.status : data.Status,
                  obj: data.obj || data.ExtraData
              };
              let shoulist = data;
              sudata2 = shoulist.obj;
          })
          setTimeout(()=>{
              cumudata = sudata1.concat(sudata2);
              this.type = type;
              this.SetDataList(cumudata, this.type);
              this.totalCount = this.ALLdata.length;
              this.allData = this.ALLdata;
              this.setPageTable(10, 1);
          },700)

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
        let citygid = this.currentRow.citygid;//城市id
        let latitude = this.currentRow.latitude;//纬度
        let longitude = this.currentRow.longitude;//经度
        //console.log(this.currentRow)
        bus.$emit('showDustInfoWindow', longitude, latitude, citygid);
      },
      //
      SetDataList(data, type){
        //console.log(data)
        data = typeof data === 'string' ? JSON.parse(data) : data;
        this.data = data;
        this.ALLdata = [];
        let i = 1;
        let dt1 = this.getPointByType(this.ptType);
        let dt2 = dt1.sort(this.compare(this.getPollution(type)));
        dt2.forEach(item => {
          const tableData = {};
          tableData.ranking = i++;//排名
          tableData.InControl = item.name;//类型
          tableData.citygid = item.deviceid;//城市id
          tableData.latitude = item.latitude;//纬度
          tableData.longitude = item.longitude;//经度
          tableData.aqi = item[this.getPollution(type)];//数值
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
        console.log(val)
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
      //
      btnClickEvent(){
        let t = this;
        let time = this.dateFtt('yyyy-MM-dd hh:00:00', this.value2);
        console.log(time)
        api.GetDustHourRanking(time).then(res => {
          let data = res.data;
          data = typeof data === 'string' ? JSON.parse(data) : data;
          data = {
            status: data.hasOwnProperty('status') ? data.status : data.Status,
            obj: data.obj || data.ExtraData
          };
          this.SetDataList(data.obj, this.type)
          this.totalCount = this.ALLdata.length;
          this.allData = this.ALLdata;
          this.setPageTable(10, 1);
          bus.$emit('refreshDustLayer', sudata);
        })
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

    },
      components: {Toolbar,ToneColor}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .PaneldataOnlineList {
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
      .line_bottom{
        width: 320px;
        position: absolute;
        left: -309px;
        bottom: 56px;
      }
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

  .kbiaoti {
    padding: 10px 0px;
  }

  .bluexian {
    width: 26px;
    border: 1px solid #1080cc;
    margin: 0 auto;
  }

  .first {
    width: 100%;
    height: 44px;
    margin-top: 30px;

  .tables {
    float: left;
    margin-left: 14px;

  a {
    padding: 0 15px;
    float: left;
    text-decoration: none;
    color: #666;
    display: inline-block;
    line-height: 34px;
    width: 100px;
    height: 34px;
    margin-right: 16px;
    border: solid 1px #ccc;
    background: #fff;
    border-radius: 2px;
  }

  }
  .shijian {
    float: left;
    margin-left: 6px;
  }

  .btnns {
    float: left;
    margin-left: 6px;

  button {
    border: none;
    width: 80px;
    height: 34px;
    background: #1080cc;
    color: #fff;
    border-radius: 4px;
  }

  }
  }
  .tqbiaoti {
    width: 100%;
    height: 22px;
    padding-left: 20px;
    text-align: left;
    margin-left: 16px;
    border-left: solid 3px #2a6496;
  }

  .table_container {
    margin-left: 16px;
  }

  }
  }
  }


</style>
