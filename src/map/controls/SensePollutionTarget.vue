<template>
  <div class="sense-target-content">
    <div class="sense-target-header">传感网</div>
    <ul>
      <!--<li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index"><img :title="item.name" :src="index===0?item.checked:item.src"/></li>-->
      <li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index">{{item.name}}</li>
    </ul>
    <sense-manager></sense-manager>
  </div>
</template>
<script>
  import SenseManager from '@/map/handle/SenseManager'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'SensePollutionTarget',
    data () {
      return {
        targets: [
          {
            name: 'AQI',
            value: 'AQI',
            src: 'static/imgs/map/AQI.png',
            checked: 'static/imgs/map/AQI1.png'
          }, {
            name: 'PM2.5',
            value: 'PM25',
            src: 'static/imgs/map/PM-2.5.png',
            checked: 'static/imgs/map/PM-2.51.png',
          }, {
            name: 'PM10',
            value: 'PM10',
            src: 'static/imgs/map/PM-10.png',
            checked: 'static/imgs/map/PM-101.png'
          }, {
            name: 'SO2',
            value: 'SO2',
            src: 'static/imgs/map/so2.png',
            checked: 'static/imgs/map/so21.png'
          }, {
            name: 'NO2',
            value: 'NO2',
            src: 'static/imgs/map/no2.png',
            checked: 'static/imgs/map/no21.png'
          }, {
            name: 'CO',
            value: 'CO',
            src: 'static/imgs/map/co.png',
            checked: 'static/imgs/map/co1.png'
          }, {
            name: 'O3',
            value: 'O3',
            src: 'static/imgs/map/o3.png',
            checked: 'static/imgs/map/o31.png'
          }
        ]
      };
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
        bus.$emit('hotLayerTarget',type);
        bus.$emit('markerTarget',type);
        bus.$emit('refreshTarget',type);
        bus.$emit('getCheckedName',type);
        bus.$emit('clearDrawOverlay');
      },
      resetImg(){
        let targets = this.$data.targets;
        jQuery.find('.sense-target-content li').forEach(function (value, index) {
          value.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        });
//        jQuery.find('.sense-target-content li>img').forEach(function (value, index) {
//          let target = targets[index];
//          value.src = target.src;
//        })
      }
    },
    components: {SenseManager}
  };
</script>
<style scoped>
  .sense-target-content {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    position: absolute;
    width:60px;
    left: 0;
    top: 50px;
    z-index: 1;
  }

  .sense-target-header{
    width: 62px;
    background: #fff;
    color: #2494F2;
    font-weight: bold;
    opacity: 0.8;
    line-height: 34px;
  }

  .sense-target-content ul {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    width: 62px;
    color: #fff;
  }

  .sense-target-content li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: rgba(0, 0, 0, 0.6);
    list-style: none;
    line-height: 30px;
    width: 60px;
    padding: 0;
    cursor: pointer;
  }

  .sense-target-content li:first-child {
    background-color: #1080cc;
  }

  .sense-target-content li img {
    margin: 10px 0;
  }
</style>
