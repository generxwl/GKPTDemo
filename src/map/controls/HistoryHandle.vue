<template>
  <div class="history-content">
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
  export default {
    name: 'HistoryHandle',
    data () {
      return {
        labelTime: '周四 08-01 00:00',
        times: [
          {
            date: '08-01',
            week: '周四'
          }, {
            date: '08-01',
            week: '周四'
          }, {
            date: '08-01',
            week: '周四'
          }, {
            date: '08-01',
            week: '周四'
          }, {
            date: '08-01',
            week: '周四'
          }, {
            date: '08-01',
            week: '周四'
          }, {
            date: '08-01',
            week: '周四'
          }, {
            date: '08-01',
            week: '周四'
          }],
        interval: undefined
      };
    },
    created(){
    },
    mounted(){
    },
    methods: {
      ready(){
      },
      liStateClick(e){
        let t = this;
        let element = e.currentTarget;
        element.querySelectorAll('img').forEach(function (value, index) {
          let type = value.getAttribute('data-state');
          type.toUpperCase() === 'START' ? (value.setAttribute('src', '/static/imgs/sense/stop.png'), value.setAttribute('data-state', 'STOP')) : (value.setAttribute('src', '/static/imgs/sense/start.png'), value.setAttribute('data-state', 'START'));
          t.setProcess(type, value);
        });
      },
      setProcess(type, el){
        let t = this;
        if (!t.interval) {
          t.interval = setInterval(function () {
            let historyContent = document.getElementsByClassName('history-content')[0];
            let labelProcess = document.getElementsByClassName('label-process')[0];
            let hcProcess = document.getElementsByClassName('hc-process')[0];
            let process = hcProcess.offsetWidth;

            t.labelTime = (new Date()).getSeconds();

            if (process + 20 >= historyContent.offsetWidth) {
              window.clearInterval(t.interval);
              t.interval = undefined;
              labelProcess.style.left = '100%';
              hcProcess.style.width = '100%';
              el.setAttribute('src', '/static/imgs/sense/start.png');
              el.setAttribute('data-state', 'START');
              t.resetProcess();
            } else {
              labelProcess.style.left = process + 20 + 'px';
              hcProcess.style.width = process + 20 + 'px';
            }
          }, 1000);
        }

        type.toUpperCase() !== 'START' && (window.clearInterval(this.interval), this.interval = undefined);
      },
      resetProcess(){
        let labelProcess = document.getElementsByClassName('label-process')[0];
        let hcProcess = document.getElementsByClassName('hc-process')[0];

        labelProcess.style.left = '0%';
        hcProcess.style.width = '0%';
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

  .history-content li {
    float: left;
    width: auto;
    margin: 0 20px;
    line-height: 32px;
  }

  .history-content li:first-child img {
    height: 16px;
    width: 16px;
    vertical-align: baseline;
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
    left: 50%;
  }

  .hc-process {
    width: 50%;
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
