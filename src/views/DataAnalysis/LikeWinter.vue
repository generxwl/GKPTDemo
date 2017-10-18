<template>
    <!--冬防战报页面-->
    <div class="Like-winter">
        <div class="title">
            <h1>廊坊市空气质量智能管控平台冬防战报</h1>
        </div>
        <div class="warp_box">
            <div class="Window_one">
                1
            </div>
            <div class="Window_Two" style="margin-left: 20px">
                2
            </div>
            <div class="Window_Three" style="margin-left: 20px">
                3
            </div>
            <div class="Window_Four" style="margin-top: -54px">
                4
            </div>
            <div class="Window_Five" style="margin-left: 20px;margin-top: -54px">
                5
            </div>
            <div class="Window_six" style="margin-left: 20px;margin-top: 20px">
                6
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'likewinter',
        data(){
            return {
                //页面数据
            };
        },
        beforeCreate() {
            //beforeCreate 创建前状态====

        },
        created() {
            //created 创建完毕状态====

        },
        beforeMount() {
            //beforeMount 挂载前状态===

        },
        mounted() {
            //mounted 挂载结束状态=====

        },
        methods: {
            // 所有方法
        }

    };
</script>
<style lang="scss" scoped>
    .Like-winter{
        width: 100%;
        height: 100%;
        background: #242953;
        .title{
            h1{
                margin: 0;
                font-size: 24px;
                line-height: 80px;
                color:#b0d6fa ;
            }
        }
        .warp_box{
            width: 1324px;

            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: 20px;
            margin: 0 auto;
        }
        .Window_one{
            width: 370px;
            height: 305px;
            border:solid 1px #428bca;
            background: #00ff00;
            float: left;
        }
        .Window_Two{
            width: 428px;
            height: 305px;
            border:solid 1px #428bca;
            background: #00ccff;
            float: left;
        }
        .Window_Three{
            width: 480px;
            height: 378px;
            border:solid 1px #428bca;
            background: #c0a16b;
            float: left;
        }
        .Window_Four{
            width: 370px;
            height: 276px;
            border:solid 1px #428bca;
            background: #4cae4c;
            float: left;
        }
        .Window_Five{
            width: 428px;
            height: 276px;
            border:solid 1px #428bca;
            background:#f5f5f5;
            float: left;
        }
        .Window_six{
            width: 480px;
            height: 202px;
            border:solid 1px #428bca;
            background: #c7254e;
            float: left;
        }
    }
</style>