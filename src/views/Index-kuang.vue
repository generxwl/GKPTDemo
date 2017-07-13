<template>
    <div class="index-box">
        <!--首页部分-->
        <v-header></v-header>
       <!-- <iframe
                frameborder="0"
                width="100%"
                height="90%"
                :src="PollutionmapURL"
                scrolling="no"
        >

        </iframe>-->
        <!--数据面板-->
        <v-paneldata></v-paneldata>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data () {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .index-box{
        width: 100%;
        height: 100%;
    }
</style>
