<template>
    <div class="videos">
        <!--企业工地视频监测-->
        <v-header></v-header>
        <video-map></video-map>
        <paneldata-video></paneldata-video>
    </div>
</template>
<script>
    import VideoCtrl from '@/components/VideoCtrl'
    import PaneldataVideo from '@/components/Paneldata-video'
    import VideoMap from '@/map/VideoMap' //0809
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
        components: {VideoCtrl,PaneldataVideo,VideoMap}//0809

    };
</script>
<style lang="scss" scoped>
    .videos{
        width: 100%;
        height: 100%;
    }
</style>