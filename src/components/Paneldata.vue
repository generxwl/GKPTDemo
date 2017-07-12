<template>
    <div class="Paneldata">
        <div class="panel">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'paneldata',
        data () {
            return {
                msg: 'App'
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .Paneldata{
        width: 410px;
        height:auto;
        background-color: #666;
        opacity: 0.8;
        position: absolute;
        top:60px;
        right: 0;
        .panel{
            width: 100%;
            height: 600px;
            box-shadow: 0 0 5px #666;

        }
    }


</style>
