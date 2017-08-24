<template>
  <div class="GridPrediction">
    <!--网格预报-->
    <v-header></v-header>
    <v-Paneldagrid></v-Paneldagrid>
    <grid-map></grid-map>
  </div>
</template>

<script>
  import GridMap from '@/map/GridMapMain' //0809

  export default {
    name: 'GridPrediction',
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
    components: {
      GridMap
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .GridPrediction {
    width: 100%;
    height: 100%;
  }
</style>
