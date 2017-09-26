<template>
    <div class="videos">
        <!--企业监测-->
        <v-header></v-header>
        <enterprise-map></enterprise-map>
        <paneldata-enterprise></paneldata-enterprise>
    </div>
</template>
<script>
    import PaneldataEnterprise from '@/components/Paneldata-enterprise'
    import EnterpriseMap from '@/map/EnterpriseMap' //0809
    export default {
        name:'videos',
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
        components: {PaneldataEnterprise,EnterpriseMap}//0809

    };
</script>
<style lang="scss" scoped>
    .videos{
        width: 100%;
        height: 100%;
    }
</style>