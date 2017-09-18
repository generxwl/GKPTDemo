<template>
  <div class="indexwarp">
    <!--首页部分-->
    <v-header></v-header>

    <main-map></main-map>
    <!--<scroll-bar class="gundong"></scroll-bar>-->
    <indexpanel></indexpanel>
  </div>
</template>

<script>
  import MainMap from '@/map/MainMap' //0809
  import ScrollBar from '@/components/ScrollBar'
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
    components: {MainMap,ScrollBar,indexpanel}//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .indexwarp {
    width: 100%;
    height: 100%;
    position: relative;
    .gundong{

    }
  }
</style>
