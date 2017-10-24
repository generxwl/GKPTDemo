<template>
  <div class="history-content">
    <div @click="closeClick" v-show="hasClose" class="history-close">退出历史查询</div>
    <div>
      <div class="label-process">
        <label>{{labelTime}}</label>
        <div class="triangle-down"></div>
      </div>
      <div class="history-process">
        <div class="hc-process"></div>
      </div>
    </div>
    <div>
      <ul>
        <li @click="liStateClick">
          <div><img data-state="start" src="/static/imgs/sense/start.png"/></div>
        </li>
        <li v-for="(item,index) in times"><span>{{item.week+' '+item.date}}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {bus} from '@/js/bus.js'

  export default {
    name: 'HistoryHandle',
    data () {
      return {
        labelTime: '周四 08-01 00:00',
        times: [],
        lsLabelTime: [],
        sum: 0,
        hasClose:false,
        interval: undefined
      };
    },
    created(){
      let t = this;
      //开始时间
      let startTime = new Date();
      let labelTime = new Date();
      startTime.setDate(startTime.getDate() - 7);
      labelTime.setDate(labelTime.getDate() - 6);

      //结束时间
      let endTime = new Date();

      for (let i = 0; i < 7; i++) {
        startTime.setDate(startTime.getDate() + 1);
        let tm = {
          date: (startTime.getMonth() + 1) + '-' + startTime.getDate(),
          week: t.getWeek(startTime.getDay())
        };
        t.times.push(tm);
      }

      labelTime.setHours(0);
      for (let j = 0; j < 7 * 24; j++) {
        let month = labelTime.getMonth() + 1;
        let date = labelTime.getDate();
        let hours = labelTime.getHours();
        let lt = {
          date: (month > 9 ? month : ('0' + month)) + '-' + (date > 9 ? date : ('0' + date)),
          time: (hours > 9 ? hours : ('0' + hours)) + ':00'
        };
        t.lsLabelTime.push(lt);
        j === 0 && (t.labelTime = (month > 9 ? month : ('0' + month)) + '-' + (date > 9 ? date : ('0' + date)) + ' ' + '00:00');
        labelTime.setHours(labelTime.getHours() + 1);
      }
    },
    mounted(){
    },
    methods: {
      ready(){
      },
      getWeek(d){
        let week = '周一';
        switch (d) {
          case 1:
            week = '周一';
            break;
          case 2:
            week = '周二';
            break;
          case 3:
            week = '周三';
            break;
          case 4:
            week = '周四';
            break;
          case 5:
            week = '周五';
            break;
          case 6:
            week = '周六';
            break;
          case 7:
            week = '周日';
            break;
        }
        return week;
      },
      liStateClick(e){
        let t = this;
        let element = e.currentTarget;
        element.querySelectorAll('img').forEach(function (value, index) {
          let type = value.getAttribute('data-state');
          type.toUpperCase() === 'START' ? (value.setAttribute('src', '/static/imgs/sense/stop.png'), value.setAttribute('data-state', 'STOP')) : (value.setAttribute('src', '/static/imgs/sense/start.png'), value.setAttribute('data-state', 'START'));
          t.setProcess(type, value);
        });
        this.hasClose = true;
        bus.$emit('setLayerHide',false);
        bus.$emit('resetLayerLi',false);
      },closeClick(){
          this.hasClose = false;
          this.resetProcess();
      },
      setProcess(type, el){
        let t = this;
        if (!t.interval) {
          let historyContent = document.getElementsByClassName('history-content')[0];
          let labelProcess = document.getElementsByClassName('label-process')[0];
          let hcProcess = document.getElementsByClassName('hc-process')[0];
          t.interval = setInterval(function () {
            let process = hcProcess.offsetWidth;
            //t.labelTime = (new Date()).getSeconds();
            if (process + 5 > historyContent.offsetWidth) {
              t.interval = undefined;
              labelProcess.style.left = '100%';
              hcProcess.style.width = '100%';
              el.setAttribute('src', '/static/imgs/sense/start.png');
              el.setAttribute('data-state', 'START');
              t.resetProcess();
            } else {
              let tm = t.lsLabelTime[++t.sum];
              t.labelTime = tm.date + ' ' + tm.time;
              labelProcess.style.left = process + 5 + 'px';
              hcProcess.style.width = process + 5 + 'px';
            }
          }, 1000);
        }

        type.toUpperCase() !== 'START' && (window.clearInterval(this.interval), this.interval = undefined);
      },
      resetProcess(){
        window.clearInterval(this.interval);
        let labelProcess = document.getElementsByClassName('label-process')[0];
        let hcProcess = document.getElementsByClassName('hc-process')[0];

        labelProcess.style.left = '55px';
        hcProcess.style.width = '55px';

        this.sum = 0;
        let tm = this.lsLabelTime[0];
        this.labelTime = tm.date + ' ' + tm.time;
      }
    }
  };
</script>
<style scoped>
  .history-content {
    height: 32px;
    width: auto;
    position: absolute;
    z-index: 1;
    background: #fff;
    bottom: 0;
    left: 100px;
  }

  .history-content ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .history-close {
    height: 32px;
    background: #53a0ff;
    width: 120px;
    color: #fff;
    text-align: center;
    position:absolute;
    margin-top:-60%;
    margin-left:calc(50% + 60px);
    line-height:32px;
  }

  .history-content li {
    float: left;
    width: 120px;
    /*margin: 0 20px;*/
    line-height: 32px;
    border-right: solid 1px #53a0ff;
  }

  .history-content li:first-child {
    width: 55px;
  }

  .history-content li:first-child img {
    height: 16px;
    width: 16px;
    vertical-align: baseline;
    cursor: pointer;
  }

  .history-content label {
    height: 24px;
    position: absolute;
    width: 120px;
    background: #20a0ff;
    margin: -30px 0 0 -65px;
    color: #fff;
    line-height: 24px;
    font-weight: 300;
  }

  .history-process {
    height: 5px;
    width: auto;
    background: #e4e8f1;
  }

  .label-process {
    position: absolute;
    left: 55px;
  }

  .hc-process {
    width: 55px;
    background: #20a0ff;
    height: 5px;
  }

  .triangle-down {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #20a0ff;
    margin: -10px 0 0 calc(50% - 20px);
  }
</style>
