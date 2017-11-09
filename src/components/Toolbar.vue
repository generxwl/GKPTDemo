<template>
    <div class="toolbar">
        <div class="lein_1">
            <img src="../../static/imgs/toor/icon_Statistics_1.png" alt="">
            <span>统计一览</span>
        </div>
        <div class="clolrbr" style="float: left;height:32px;width: 1px;border-right: solid 1px #ccc"></div>
        <div class="lein_2" id="gjbox">
            <img src="../../static/imgs/toor/icon_tool_1.png" alt="">
            <span>工具</span>
            <img src="../../static/imgs/toor/btn_jiantou_1.png" alt="">
            <div id="gj" class="css_toolbar" >
                <slot name="toors"></slot>
            </div>
        </div>
        <div class="clolrbr" style="float: left;height:32px;width: 1px;border-right: solid 1px #ccc"></div>
        <div class="lein_3" id="tcbox">
            <img src="../../static/imgs/toor/icon_layer_1.png" alt="">
            <span>图层控制</span>
            <img src="../../static/imgs/toor/btn_jiantou_1.png" alt="">
            <layer-switch id="tc" class="css_switch"></layer-switch>
        </div>
    </div>
</template>
<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    import LayerSwitch from '@/map/controls/LayerSwitch'
    export default {
        name : 'toolbar',
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

            $("#gjbox").click(function() {
                 //$(this).text($("#content").is(":hidden") ? "收起" : "展开");
                 $("#gj").slideToggle();
            });

            $("#tcbox").click(function() {
                //$(this).text($("#content").is(":hidden") ? "收起" : "展开");
                $("#tc").slideToggle();
            });
        },
        methods: {
            // 所有方法

        },
        components: {LayerSwitch}
    };
</script>
<style lang="scss" scoped>
    .toolbar{
        width: 100%;
        height: 100%;
        font-size: 14px;
        .lein_1{
            float: left;
            line-height:40px;
            padding: 0 15px;
        }
        .lein_2{
            float: left;
            width: 106px;
            line-height:40px;
            padding: 0 10px;
            position: relative;
            .css_toolbar{
                display: none;
                position: absolute;
                top:44px;
                left:0;
            }
        }
        .lein_3{
            float: left;
            width: 132px;
            line-height:40px;
            padding: 0 10px;
            position: relative;
            .css_switch{
                display: none;
                position: absolute;
                top:44px;
                left:0;
            }
        }
        .clolrbr{
            margin-top: 6px;
        }
    }
</style>

