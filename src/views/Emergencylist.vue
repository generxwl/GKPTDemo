<template>
    <!--应急清单页面-->
    <div class="Emergencylist">
        <!--首页部分-->
        <v-header></v-header>
        <!--地图-->
        <emergency-map></emergency-map>
        <!---->
        <paneldata-emergencylist></paneldata-emergencylist>

    </div>
</template>

<script>
    import EmergencyMap from '@/map/EmergencyMap' //0809
    import PaneldataEmergencylist from '@/components/Paneldata-emergencylist'
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
        components: {EmergencyMap,PaneldataEmergencylist}//0809
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .Emergencylist{
        width: 100%;
        height: 100%;
        .warp_qd{
            width: 350px;
            height: 44px;
            position: absolute;
            top:80px;
            right: 20px;
            background: #fff;
        }
    }
</style>
