<template>
    <!--进度条部件-->
    <div class="Cainprogressl">
       <div class="jindu"></div>
       <div class="jindu2" :style="{background:color,height:height + '%'}"></div>
    </div>
</template>
<script>
    export default {
        name:'Cainprogressl',
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
    .Cainprogressl{
        width: 100%;
        height: 100%;
        position: relative;
        .jindu{
            width: 100%;
            height:100%;
            background:url(../../static/imgs/mues/cainuan/l.png) no-repeat;
        }
        .jindu2{
            position: absolute;
            width: 100%;
            top:0;
            left: 0;
            background:url(../../static/imgs/mues/cainuan/le-l.png) no-repeat;
        }
    }
</style>