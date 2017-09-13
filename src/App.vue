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

    html, body {
        height: 100%;
        border: none;
        #app {
            font-family: '微软雅黑';
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
          overflow: hidden;
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
    .el-tabs__header{
      background: none!important;
      margin-bottom: 0;
      border: 0!important;
    .el-tabs__nav-wrap{
      margin-bottom: 0px !important;
      border: none;

    .el-tabs__nav {
      margin: 0 auto;
      float: none;
    .el-tabs__item:nth-child(1){
      border-bottom-left-radius: 4px;
      border-top-left-radius:4px ;
    }
    .el-tabs__item:nth-child(4){
      border-bottom-right-radius: 4px;
      border-top-right-radius:4px ;
    }
    .el-tabs__item {
      width: 102px !important;
      height: 34px !important;
      line-height: 34px!important;
      padding: 0!important;
      border: solid 1px #ccc;
      background: #dddddd!important;
      color: #5c5c5c!important;
      font-weight: bold!important;
    }
    .is-active {
      background: #fff!important;

    }
    }
    }
    }

    }

</style>
