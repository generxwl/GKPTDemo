<template>
  <div class="PaneldataStaticDust">
    <!--静态原清单测面板-->
    <div id="list">
      <div class="qianren"><map-handle></map-handle></div>
      <div class="panel">
        <img id="shrink" src="../assets/img/左.png" v-if="zuo"/>
        <img id="shrink" src="../assets/img/右.png" v-if="you"/>
        <div class="main">
          <!---->
          <div class="tables">
            <!--选项-->
            <a id="shishi" >污染源分类统计</a>
            <div class="xian"></div>
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
        tableData: [
            {
                NetworkName:'梨园村',
                Name:'廊坊天昊',
                Industry:'餐饮',
                Emission:'SO2',
                EmissionAmount:'42'
            },
            {
                NetworkName:'梨园村',
                Name:'廊坊天昊',
                Industry:'餐饮',
                Emission:'SO2',
                EmissionAmount:'42'
            },
            {
                NetworkName:'梨园村',
                Name:'廊坊天昊',
                Industry:'餐饮',
                Emission:'SO2',
                EmissionAmount:'42'
            },
            {
                NetworkName:'梨园村',
                Name:'廊坊天昊',
                Industry:'餐饮',
                Emission:'SO2',
                EmissionAmount:'42'
            },
            {
                NetworkName:'梨园村',
                Name:'廊坊天昊',
                Industry:'餐饮',
                Emission:'SO2',
                EmissionAmount:'42'
            }
        ],
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
//        let t = this;
//        let time = this.dateFtt('yyyy-MM-dd hh:00:00', this.value2);
//        console.log(time)
//        api.GetDustHourRanking(time).then(res => {
//          let data = res.data;
//          data = typeof data === 'string' ? JSON.parse(data) : data;
//          data = {
//            status: data.hasOwnProperty('status') ? data.status : data.Status,
//            obj: data.obj || data.ExtraData
//          };
//          this.SetDataList(data.obj, this.type)
//          this.totalCount = this.ALLdata.length;
//          this.allData = this.ALLdata;
//          this.setPageTable(10, 1);
//          bus.$emit('refreshDustLayer', sudata);
//        })
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
