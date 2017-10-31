<template>
    <!--进度条部件-->
    <div class="Cainprogressr">
       <div class="jindu"></div>
       <div class="jindu2" :style="{background:color,height:height + '%'}"></div>
    </div>
</template>
<script>
    export default {
        name:'Cainprogressr',
        data(){
            return {
                //页面数据
            };
        },
        props:{
              color: {
                  type: String,
                  default: ''
              },
              height: {
                  type: Number,
                  default: ''
              },
              text: ''
        },
        methods: {
            // 所有方法
        }

    };
</script>
<style lang="scss" scoped>
    .Cainprogressr{
        width: 100%;
        height: 100%;
        position: relative;
        .jindu{
            width: 100%;
            height: 100%;
            background:url(../../static/imgs/mues/cainuan/r.png) no-repeat;
        }
        .jindu2{
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            background:url(../../static/imgs/mues/cainuan/le-r.png) no-repeat;
        }
    }
</style>