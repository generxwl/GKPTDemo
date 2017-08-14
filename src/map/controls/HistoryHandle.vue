<template>
  <div class="history-content">
    <div>
      <div>
        <label>Time</label>
        <span class="triangle-down"></span>
      </div>
      <div class="history-process"></div>
    </div>
    <div>
      <ul>
        <li><span>开始</span></li>
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
        times: [{
          date: '2017-08-01',
          week: '周四'
        }, {
          date: '2017-08-01',
          week: '周四'
        }, {
          date: '2017-08-01',
          week: '周四'
        }, {
          date: '2017-08-01',
          week: '周四'
        }, {
          date: '2017-08-01',
          week: '周四'
        }, {
          date: '2017-08-01',
          week: '周四'
        }, {
          date: '2017-08-01',
          week: '周四'
        }, {
          date: '2017-08-01',
          week: '周四'
        }]
      };
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
    margin: 0 5px;
    line-height: 32px;
  }

  .history-content label {
    height: 24px;
    position: absolute;
    width: 120px;
    background: #4cae4c;
    margin: -28px 0 0 0;
  }

  .history-process {
    height: 5px;
    width: auto;
    background: #333;
  }

  .triangle-down {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid red;
  }
</style>
