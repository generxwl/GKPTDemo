<template>
    <div class="ScatteredDirtVideos">
        <!--散乱污视频监测-->
        <v-header></v-header>
        <!--<video-map></video-map>-->
        <paneldata-video></paneldata-video>
    </div>
</template>
<script>
    import VideoCtrl from '@/components/VideoCtrl'
    import PaneldataVideo from '@/components/Paneldata-ScatteredDirtVideo'

    export default {
        name:'ScatteredDirtVideos',
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
        components: {PaneldataVideo}//

    };
</script>
<style lang="scss" scoped>
    .ScatteredDirtVideos{
        width: 100%;
        height: 100%;
    }
</style>