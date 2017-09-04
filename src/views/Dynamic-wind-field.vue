<template>
  <div class="DynamicWindField">
      <!--动态风场-->
      <v-header></v-header>
      <iframe
              frameborder="0"
              width="100%"
              height="100%"
              :src="DWFURL"
              scrolling="no"
      >

      </iframe>
      <!--https://airwise.zc12369.com/-->
  </div>
</template>

<script>
export default {
  name: 'DynamicWindField',
  data () {
    return {
        DWFURL:'https://airwise.zc12369.com/',
        woaini:''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .DynamicWindField{
        width: 100%;
        height: calc(100% - 60px);
    }
</style>
