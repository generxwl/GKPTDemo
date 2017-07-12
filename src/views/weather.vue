<template>
  <div class="weather">
      <v-header></v-header>
      <iframe
              frameborder="0"
              width="100%"
              height="90%"
              :src="weatherURL"
              scrolling="no"
      >

      </iframe>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
        weatherURL:'https://airwise.zc12369.com/#2017/06/05/0400Z/wind/surface/level/overlay=aqi/argo=recent/orthographic=108.94,34.27,1189/loc=108.944,34.265',
        woaini:''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .weather{
        width: 100%;
        height: 100%;
    }
</style>
