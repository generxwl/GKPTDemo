<template>
  <div class="dust-target-content">
    <div class="dust-target-header">在线源</div>
    <ul>
      <!--<li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index"><img :title="item.name" :src="index===0?item.checked:item.src"/></li>-->
      <li @click="liClickEvent" v-for="(item,index) in targets" :data-type="item.value" :data-index="index">{{item.name}}</li>
    </ul>
    <pollution-manager :pollutionUrl="pollutionUrl" :charUrl="charUrl"></pollution-manager>
  </div>
</template>
<script>
  import PollutionManager from '@/map/handle/DustPollutionManager'
  import {bus} from '@/js/bus.js'

  export default {
    name: 'DustPollutionTarget',
    data () {
      return {
        checkedName:'PM2.5',
        pollutionUrl:'http://lftdkplat.zhiscity.com/api/Dust/GetDustHourRanking',
        charUrl:'http://lftdkplat.zhiscity.com/api/Dust/GetDust24Hour',
        targets: [
          {
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
            name: '温度',
            value: 'TEMP',
            src: 'static/imgs/map/温度.png',
            checked: 'static/imgs/map/温度1.png'
          }, {
            name: '湿度',
            value: 'HUMI',
            src: 'static/imgs/map/湿度.png',
            checked: 'static/imgs/map/湿度1.png'
          }, {
            name: '风向',
            value: 'WINDDIRECTION',
            src: 'static/imgs/map/风向.png',
            checked: 'static/imgs/map/风向1.png'
          }, {
            name: '风力',
            value: 'WINDSPEED',
            src: 'static/imgs/map/风力.png',
            checked: 'static/imgs/map/风力1.png'
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
        childElement.style.backgroundColor = '#1080cc';
        //imgElement.src = item.checked;

        bus.$emit('switchDustRender', type);
        bus.$emit('refreshDustTarget',type);
      },
      resetImg(){
        let targets = this.$data.targets;
        jQuery.find('.dust-target-content li').forEach(function (value, index) {
          value.style.backgroundColor = 'rgba(0, 79, 137, 0.6)';
        });
//        jQuery.find('.dust-target-content li>img').forEach(function (value, index) {
//          let target = targets[index];
//          value.src = target.src;
//        })
      }
    },
    components: {PollutionManager}
  };
</script>
<style scoped>
  .dust-target-content {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    position: absolute;
    width: 60px;
    left: 0;
    top: 50px;
    z-index: 1;
  }

  .dust-target-header{
    width: 62px;
    background: #fff;
    color: #1080cc;
    border: solid 1px #1080cc;
    line-height: 25px;
  }

  .dust-target-content ul {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    border: solid 1px #1080CC;
    width: 62px;
    color:#fff;
  }

  .dust-target-content li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: rgba(0, 79, 137, 0.6);
    list-style: none;
    line-height: 30px;
    width: 60px;
    padding: 0;
    cursor: pointer;
  }

  .dust-target-content li:first-child {
    background-color: #1080cc;
  }

  .dust-target-content li img {
    margin: 10px 0;
  }
</style>
