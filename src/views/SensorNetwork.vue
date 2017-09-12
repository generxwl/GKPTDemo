<template>
  <div class="SensorNetwork">
    <!--传感网部分-->
    <v-header></v-header>
    <sense-map></sense-map>
     <v-paneldatcgw></v-paneldatcgw>
  </div>
</template>

<script>
  import SenseMap from '@/map/SenseMapMain'
  export default {
    name: 'SensorNetwork',
    data () {
      return {
          fullscreenLoading: false
      }
    },
      mounted(){
          this.openFullScreen()
      },
      methods: {
          //加载动画
          openFullScreen() {
              this.fullscreenLoading = true;
              setTimeout(() => {
                  this.fullscreenLoading = false;
              }, 2000);
          }
      },
    components: {SenseMap}//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .SensorNetwork {
    width: 100%;
    height: 100%;
      //background: #a94442;
  }
</style>
