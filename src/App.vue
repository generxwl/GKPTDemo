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
    @import "styles/tabandprogres";//tab切换全局布局
    @import "styles/scrollbar";//滚动条全局布局
    @import "styles/baidumap";//百度地图全局部分
    @import "styles/elementui";//elementui部分全局修改
    * {
        margin: 0;
        padding: 0;
    }
    a:hover{
        text-decoration: none;
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


    /*警报CSS*/
    @keyframes warn {
      0% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.0;
      }

      25% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.5;
      }

      50% {
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
        opacity: 0.7;
      }

      75% {
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
        opacity: 0.9;
      }

      100% {
        transform: scale(1);
        -webkit-transform: scale(1);
        opacity: 0.0;
      }
    }

    @keyframes warn1 {
      0% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.0;
      }

      25% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.5;
      }

      50% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.7;
      }

      75% {
        transform: scale(0.5);
        -webkit-transform: scale(0.5);
        opacity: 0.9;
      }

      100% {
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
        opacity: 0.0;
      }
    }

    /* 产生动画（向外扩散变大）的圆圈 第一个圆 */
    .pulse {
      position: absolute;
      width: 60px;
      height: 60px;
      border: 1px solid #ff0000;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      z-index: 1;
      opacity: 0;
      -webkit-animation: warn 2s ease-out;
      -moz-animation: warn 2s ease-out;
      animation: warn 2s ease-out;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      box-shadow: 1px 1px 30px #ff0000; /* 阴影效果 */
    }

    /* 产生动画（向外扩散变大）的圆圈 第二个圆 */
    .pulse1 {
      position: absolute;
      width: 60px;
      height: 60px;
      border: 1px solid #ff0000;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      z-index: 1;
      opacity: 0;
      -webkit-animation: warn1 2s ease-out;
      -moz-animation: warn1 2s ease-out;
      animation: warn1 2s ease-out;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      box-shadow: 1px 1px 30px #ff0000; /* 阴影效果 */
    }


</style>
