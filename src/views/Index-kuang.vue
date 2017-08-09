<template>
  <div class="index-box">
    <!--首页部分-->
    <v-header></v-header>
    <map-view></map-view>
     <v-paneldata></v-paneldata>
  </div>
</template>

<script>
  import MapView from '@/map/mapMain' //0809

  export default {
    name: 'index',
    data () {
      return {}
    },
    components: {MapView}//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index-box {
    width: 100%;
    height: 100%;
  }
</style>
