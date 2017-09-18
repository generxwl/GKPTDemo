<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
	import router from './router/index.js'
    export default {
        name: 'app',
        computed : {
        		userState(){
        			return this.$store.state.userData
        		}
        },
        mounted(){
        		router.beforeEach((to, from, next) => {
        			if(!this.$cookies.get('auth')){
        				next()
	        			this.$router.push('/login')
        			}
		      	next();
		    });
        		if(!this.$cookies.get('auth')){
        			if(window.location.href.indexOf('login') > -1){
        				return
        			}else{
        				this.$router.push('/login')
        			}
        		}else{
        			console.log(2)
        		}
        },
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
    .panel{
        height: calc(100% - 62px);
      overflow-x: hidden;
        overflow-y: auto!important;
        padding-bottom: 100px!important;
        /*三角箭头的颜色*/
        scrollbar-arrow-color: #2ab0ed;
        /*滚动条滑块按钮的颜色*/
        scrollbar-face-color: #2ab0ed;
        /*滚动条整体颜色*/
        scrollbar-highlight-color: #2ab0ed;
        /*滚动条阴影*/
        scrollbar-shadow-color: #F5F5F5;
        /*滚动条轨道颜色*/
        scrollbar-track-color: #F5F5F5;
    }
    /*滚动条美化*/
    .panel::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
        background-color: #F5F5F5;
        border-radius: 10px;
    }
    .panel::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
    }
    .panel::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #FFF;
        background-image: -webkit-linear-gradient(top,
                #e4f5fc 0%,
                #bfe8f9 50%,
                #9fd8ef 51%,
                #2ab0ed 100%);
    }

    .el-date-editor.el-input {
        width: 190px!important;
    }
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
        .el-tabs__nav{
            margin-left: 20px!important;
            .el-tabs__item{
                font-size: 16px!important;
                padding: 0 22px!important;
            }
        }
        /*圆圈进度*/
        .el-icon-close:hover{
            cursor:pointer;
        }
        .el-progress-circle {
            width: 80px !important;
            height: 80px !important;
        }
        /*表格*/
        .el-table__body-wrapper{
            tr{

            }
            :hover{
                cursor:pointer;
            }
            overflow: inherit;
        }
        .table {

            .cell {
                font-size: 12px;
            }
            :hover{
                cursor:pointer;
            }
        }
        //
        .el-pagination{
            margin-top: 20px;
        }
        .DustEmissionStatistics{
            .cell{
                text-align: left!important;
            }
        }
        //tables样式
        .el-table .cell, .el-table th>div{
            padding: 0;
            text-align: center;
        }
        .DustEmissionStatistics{
            .el-table .cell, .el-table th>div{
                padding-left: 20px;
                text-align: center;
            }
        }

    .el-tabs--border-card{
      border: 0!important;
    }


    }


    /*BaiduMap*/
    .BMapLib_SearchInfoWindow .BMapLib_bubble_close{
      background:url('/static/imgs/map/iclose.png') no-repeat center center !important;
    }

</style>
