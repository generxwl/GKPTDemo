<template>
  <div class="index_jcd">
    <!--监测点部分-->
    <v-header></v-header>

    <monitor-map></monitor-map>
    <!--<scroll-bar class="gundong"></scroll-bar>-->
    <v-paneldata></v-paneldata>
  </div>
</template>

<script>
  import MonitorMap from '@/map/MonitorMapMain' //0809
  import ScrollBar from '@/components/ScrollBar'
  export default {
    name: 'Monitor',
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
    components: {MonitorMap,ScrollBar}//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index_jcd {
    width: 100%;
    height: 100%;
    position: relative;
    .gundong{

    }
  }
</style>
