<template>
  <div class="sense-switch-content">
    <ul>
      <li v-for="(item,index) in target" :data-type="item.name" @click="liClickEvent">{{item.value}}</li>
    </ul>
  </div>
</template>
<script>
  import {bus} from '@/js/bus.js'

  export default {
    name: 'SenseSwitch',
    data () {
      return {
        target: [{
          name: 'HotMap',
          value: '热力图'
        }, {
          name: 'PointMap',
          value: '点位图'
        }]
      };
    },
    created(){
    },
    mounted(){
    },
    methods: {
      ready(){
      },
      liClickEvent(e){
          let element = e.currentTarget;
          let type = element.getAttribute('data-type');
          switch(type.toUpperCase()){
            case 'HOTMAP':
                break;
            case 'POINTMAP':
                break;
          }
      }
    },
    compoents: {}
  };
</script>
<style scoped>
</style>
