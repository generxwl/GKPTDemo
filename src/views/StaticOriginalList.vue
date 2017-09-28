<template>
    <div class="StaticOriginalList">
        <!--静态原清单-->
        <v-header></v-header>
        <static-dust-map></static-dust-map>
        <paneldata-static-dust></paneldata-static-dust>
    </div>
</template>
<script>
    import PaneldataStaticDust from '@/components/Paneldata-StaticDust'
    import StaticDustMap from '@/map/StaticDustMap' //0809
    export default {
        name:'StaticOriginalList',
        data(){
            return {
                //页面数据
            };
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
        },
        components: {PaneldataStaticDust,StaticDustMap}//0809

    };
</script>
<style lang="scss" scoped>
    .StaticOriginalList{
        width: 100%;
        height: 100%;
    }
</style>