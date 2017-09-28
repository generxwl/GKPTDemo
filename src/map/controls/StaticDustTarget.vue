<template>
  <div class="static-target-content">
    <div class="static-target-header">静态</div>
    <ul>
      <!--<li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index"><img :title="item.name" :src="index===0?item.checked:item.src"/></li>-->
      <li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index">{{item.name}}</li>
    </ul>
    <static-dust-handle></static-dust-handle>
  </div>
</template>
<script>
  import {bus} from '@/js/bus.js'
  import StaticDustHandle from '@/map/handle/StaticDustHandle'
  export default {
    name: 'StaticDustTarget',
    data () {
      return {
        checkedName:'AQI',
        pollutionUrl:'http://lftdkplat.zhiscity.com/api/Monitoring/GetMonitoringPointReal',
        charUrl:'http://lftdkplat.zhiscity.com/api/Monitoring/GetMonitoringPointChart',
        targets: [
          {
            name: 'TOVC',
            value: 'TOVC',
            src: 'static/imgs/map/AQI.png',
            checked: 'static/imgs/map/AQI1.png'
          }, {
            name: '工地',
            value: 'GD',
            src: 'static/imgs/map/PM-2.5.png',
            checked: 'static/imgs/map/PM-2.51.png',
          }, {
            name: '高空五公里',
            value: 'GKWGL',
            src: 'static/imgs/map/PM-10.png',
            checked: 'static/imgs/map/PM-101.png'
          }
//          , {
//            name: '小散乱污',
//            value: 'XSLW',
//            src: 'static/imgs/map/so2.png',
//            checked: 'static/imgs/map/so21.png'
//          }
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
        childElement.style.backgroundColor = '#1080cc';
        //imgElement.src = item.checked;
      },
      resetImg(){
        let targets = this.$data.targets;
        jQuery.find('.video-target-content li').forEach(function (value, index) {
          value.style.backgroundColor = 'rgba(0, 79, 137, 0.6)';
        });
      }
    },
    components: {StaticDustHandle}
  }
</script>
<style scoped>
  .static-target-content {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    position: absolute;
    width: 92px;
    left: 0;
    top: 50px;
    z-index: 1;
  }

  .static-target-header{
    width: 92px;
    background: #fff;
    color: #1080cc;
    border: solid 1px #1080cc;
    line-height: 25px;
    display: none;
  }

  .static-target-content ul {
    display: none;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    border: solid 1px #1080CC;
    width: 92px;
    color:#fff;
  }

  .static-target-content li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: rgba(0, 79, 137, 0.6);
    list-style: none;
    line-height: 30px;
    width: 90px;
    padding: 0;
    cursor: pointer;
  }

  .static-target-content li:first-child {
    background-color: #1080cc;
    color:#fff;
  }

  .static-target-content li img {
    margin: 10px 0;
  }
</style>
