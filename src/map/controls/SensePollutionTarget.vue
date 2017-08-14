<template>
  <div class="sense-target-content">
    <ul>
      <li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index"><img :title="item.name" :src="index===0?item.checked:item.src"/></li>
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
            value: 'PM2.5',
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
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let targets = this.$data.targets;
        let item = targets[index];
        childElement.style.backgroundColor = '#FFF';
        imgElement.src = item.checked;
      },
      resetImg(){
        let targets = this.$data.targets;
        jQuery.find('.sense-target-content li').forEach(function (value, index) {
          value.style.backgroundColor = '#1080CC';
        });
        jQuery.find('.sense-target-content li>img').forEach(function (value, index) {
          let target = targets[index];
          value.src = target.src;
        })
      }
    },
    components: {SenseManager}
  };
</script>
<style scoped>
  .sense-target-content {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    position: absolute;
    width: 40px;
    left: 20px;
    top: 20px;
    z-index: 1;
  }

  .sense-target-content ul {
    background-color: #1080CC;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    border: solid 1px #1080CC;
    width: 42px;
  }

  .sense-target-content li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: #1080CC;
    list-style: none;
    height: 35px;
    width: 40px;
    padding: 0;
    cursor: pointer;
  }

  .sense-target-content li:first-child {
    background-color: #fff;
  }

  .sense-target-content li img {
    margin: 10px 0;
  }
</style>
