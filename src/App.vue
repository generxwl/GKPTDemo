<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    p {
        margin: 0 !important;
    }//0809

    ul, ol {
        margin-top: 0 !important;
        margin-bottom: 0px !important;
    }//0810

    html, body {
        height: 100%;
        border: none;
        #app {
            font-family: '微软雅黑';
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            height: 100%;
            canvas {
                width: 100% !important;
            }
        }
        /*圆圈进度*/
        .el-progress-circle {
            width: 80px !important;
            height: 80px !important;
        }
        /*长进度*/
        .el-progress-bar {

        }
        /*表格*/
        .el-table__body-wrapper{
            overflow: inherit;
        }
        .table {
            .cell {
                font-size: 12px;
            }
        }
    }
</style>
