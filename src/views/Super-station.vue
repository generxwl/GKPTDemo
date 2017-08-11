<template>
  <div class="superstation">
      <!--超级站-->
      <v-header></v-header>
      <iframe
              frameborder="0"
              width="100%"
              height="90%"
              :src="superstationURL"
              scrolling="no"
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-text="超级站拼命加载中"
      >

      </iframe>
  </div>
</template>

<script>
export default {
  name: 'superstation',
  data () {
    return {
        superstationURL:'http://60.10.151.97:8090/new/module/superpoint.php',
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
            }, 4000);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .superstation{
        width: 100%;
        height: 100%;

    }
</style>
