<template>
  <div class="indexwarp">
    <!--首页部分-->
    <v-header></v-header>

    <main-map></main-map>
    <!--<video-ctrl class="v-video"></video-ctrl>-->
    <indexpanel></indexpanel>
  </div>
</template>

<script>
  import MainMap from '@/map/MainMap' //0809
  import VideoCtrl from '@/components/VideoCtrl'
  import indexpanel from '@/components/Paneldata-index'
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
    components: {MainMap,VideoCtrl,indexpanel}//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .indexwarp {
    width: 100%;
    height: 100%;
    position: relative;
    .v-video{
      position: absolute;
      top:200px;
      left: 200px;
    }
  }
</style>
