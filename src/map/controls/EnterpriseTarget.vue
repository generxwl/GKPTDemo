<template>
  <div class="enterprise-target-content">
    <div class="enterprise-target-header">企业</div>
    <ul>
      <!--<li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index"><img :title="item.name" :src="index===0?item.checked:item.src"/></li>-->
      <li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index">{{item.name}}</li>
    </ul>
    <enterprise-handle></enterprise-handle>
  </div>
</template>
<script>
  import {bus} from '@/js/bus.js'
  import EnterpriseHandle from '@/map/handle/EnterpriseHandel'
  export default {
    name: 'EnterpriseTarget',
    data () {
      return {
        checkedName: 'NOX',
        pollutionUrl: 'http://lftdkplat.zhiscity.com/api/Monitoring/GetMonitoringPointReal',
        charUrl: 'http://lftdkplat.zhiscity.com/api/Monitoring/GetMonitoringPointChart',
        targets: [
          {
            name: '氮氧化物',
            value: 'NOX',
            src: 'static/imgs/map/AQI.png',
            checked: 'static/imgs/map/AQI1.png'
          }, {
            name: '烟尘',
            value: 'SMOKE',
            src: 'static/imgs/map/PM-2.5.png',
            checked: 'static/imgs/map/PM-2.51.png',
          }, {
            name: '二氧化硫',
            value: 'SO2',
            src: 'static/imgs/map/PM-10.png',
            checked: 'static/imgs/map/PM-101.png'
          }
          , {
            name: '总排放量',
            value: 'GASOUTPUTFLOW',
            src: 'static/imgs/map/so2.png',
            checked: 'static/imgs/map/so21.png'
          }
        ]
      }
    },
    mounted(){
      this.ready();
    },
    methods: {
      ready(){
      },
      liClickEvent(e){
        this.resetImg();
        let childElement = e.currentTarget;
        //let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let targets = this.$data.targets;
        let item = targets[index];
        childElement.style.backgroundColor = '#2494F2';
        //imgElement.src = item.checked;
        bus.$emit('switchEnterpriseRender', type);
      },
      resetImg(){
        let targets = this.$data.targets;
        jQuery.find('.enterprise-target-content li').forEach(function (value, index) {
          value.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        });
      }
    },
    components: {EnterpriseHandle}
  }
</script>
<style scoped>
  .enterprise-target-content {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    position: absolute;
    width: 92px;
    left: 0;
    top: 50px;
    z-index: 1;
  }

  .enterprise-target-header {
    width: 92px;
    background: #fff;
    color: #2494F2;
    opacity: 0.8;
    font-weight: bold;
    line-height: 34px;
  }

  .enterprise-target-content ul {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    width: 92px;
    color: #fff;
  }

  .enterprise-target-content li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: rgba(0, 0, 0, 0.6);
    list-style: none;
    line-height: 30px;
    width: 90px;
    padding: 0;
    cursor: pointer;
  }

  .enterprise-target-content li:first-child {
    background-color: #1080cc;
    color: #fff;
  }

  .enterprise-target-content li img {
    margin: 10px 0;
  }
</style>
