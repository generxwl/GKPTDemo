<template>
    <!--应急清单页面-->
    <div class="Emergencylist">
        <!--首页部分-->
        <v-header></v-header>
        <!--地图-->
        <emergency-map></emergency-map>
        <!---->

    </div>
</template>

<script>
    import EmergencyMap from '@/map/EmergencyMap' //0809
    //import indexpanel from '@/components/Paneldata-index'
    import MapHandle from '@/map/controls/MapHandle'
    export default {
        name: 'Emergencylist',
        data () {
            return {

            }
        },
        mounted(){

        },
        methods: {
            //加载动画
        },
        components: {EmergencyMap,MapHandle}//0809
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .Emergencylist{
        width: 100%;
        height: 100%;
    }
</style>
