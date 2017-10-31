<template>
    <!--进度条部件-->
    <div class="Cainprogressl">
       <div class="jindu" :style="{background:color,height:height + '%'}"></div>
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
        .jindu{
            width: 100%;
            background:url(../../static/imgs/mues/cainuan/l.png) no-repeat;
        }
    }
</style>