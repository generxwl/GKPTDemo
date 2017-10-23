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
    @import "styles/tab";//tab切换全局布局
    @import "styles/scrollbar";//滚动条全局布局
    @import "styles/baidumap";//百度地图全局部分
    @import "styles/elementui";//elementui部分全局修改
    * {
        margin: 0;
        padding: 0;
    }
    p {
        margin: 0 !important;
    }
    ul, ol {
        margin-top: 0 !important;
        margin-bottom: 0px !important;
    }
    html, body {
        height: 100%;
        border: none;
        #tip-arrow-bottom{
            display: none;
        }
        #tip-arrow-top{
            display: none;
        }
        #trans-tooltip{
            display: none;
        }
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
    }


</style>
