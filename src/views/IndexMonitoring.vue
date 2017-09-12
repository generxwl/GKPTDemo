<template>
  <div class="index-box">
    <!--首页部分-->
    <v-header></v-header>
    <monitor-map></monitor-map>

    <v-paneldata></v-paneldata>
  </div>
</template>

<script>
  import MonitorMap from '@/map/MonitorMapMain' //0809

  export default {
    name: 'index',
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
    components: {MonitorMap}//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index-box {
    width: 100%;
    height: 100%;
  }
</style>
