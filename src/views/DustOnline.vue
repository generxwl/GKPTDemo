<template>
  <div class="DustOnline">
    <!--在线扬尘部分-->
    <v-header></v-header>
      <dust-map></dust-map>
     <v-paneldatycy></v-paneldatycy>
  </div>
</template>

<script>
    import DustMap from '@/map/DustMapMain'
  export default {
    name: 'DustOnline',
    data () {
      return {
          fullscreenLoading: false,

      }
    },
      created(){
          this.$axios({
              url: '/static/data/tables.json',
              method: 'GET',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {}
          }).then(res => {
              console.log(res)
          }, res=> {
              console.log('失败了')
          })
      },
      mounted(){
          this.openFullScreen();
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
 components: {DustMap}//0809
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .DustOnline {
    width: 100%;
    height: 100%;
      //background: #a94442;
  }
</style>
