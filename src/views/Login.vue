<template>
	<div class="login">
		<!---->
		<div class="sky">
			<div class="clouds_one"></div>
			<div class="clouds_two"></div>
			<div class="clouds_three"></div>
		</div>
		<!--登录页面-->
		<div class="form">
			<div class="input">
				<img src="../assets/img/login-logo.png" alt="">
				<div class="user">
					<img src="../assets/img/用户名.png" alt=""><input v-model="userName" type="text" placeholder="请输入用户名">
				</div>
				<div class="pass">
					<img src="../assets/img/密码.png" alt=""><input v-model="passWord" type="password" placeholder="请输入密码">
				</div>
				<div class="butn">
					<button @click="login" @keyup.enter="login">登录{{userData}}</button>
				</div>
			</div>
		</div>
    <div class="bottom_title">
        <div class="title_banquan">
          <p>版权所有：廊坊市环保局；廊坊市大气办 <span>技术支持：PM2.5专家小组</span></p>
        </div>
        <div class="img-qianren">
          <img src="../assets/img/千人计划logo.png" alt="">
        </div>
    </div>
	</div>
</template>

<script>
    import { Message } from 'element-ui';
	export default {
		name: 'index',
		data() {
			return {
				userName: '',
				passWord: ''
			}
		},
        mounted(){
		    let that = this;
            $("body").keydown(function(evt) {
                if (event.keyCode == "13") {
                    that.login();
                }
            });
        },
		computed: {
			userData() {
				this.$store.state.userData
			}
		},
		methods: {
			login() {
				var _this = this;
				$.ajax({
					url: "http://gkpt.zq12369.com:8016/api/login/UserLogin",
					data: {
						username: this.userName,
						password: this.passWord
					},
					method: "post",
					success: function(data) {
						console.log(data)
						if(data.ExtraData.Success) {
							//为简单起见，将token保存在全局变量中。
							window.token = data.ExtraData.Token;
							_this.$cookies.set('auth',token,'1d','/')
                            _this.$message({
                                message: '恭喜你，登录成功马上跳转',
                                type: 'success'
                            });
							setTimeout(function () {
                                _this.$router.push('/')
                            },2000)

						} else {
							let text = data.ExtraData.Message;
                            _this.$message.error(text);
						}
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.login {
		min-width: 1060px;
		width: 100%;
		height: 100%;
		background: url("../assets/img/beijing.jpg") no-repeat center;
		background-size: cover;
		position: relative;
    .bottom_title{
      position: absolute;
      width: 620px;
      left: 50%;
      margin-left: -310px;
      bottom:40px ;
      color: #888;
      .title_banquan{
        float: left;
        span{
          padding-left: 20px;
        }
      }
      .img-qianren{
        float: left;
        img{
          margin-top: -15px;
          padding-left: 30px;
          width: 120px;
        }
      }
    }
		.sky{
			position: absolute;
			top:0;
			left: 0;
		}
		.form {
			position: absolute;
			width: 816px;
			height: 442px;
			left: 50%;
			top: 50%;
			margin-left: -408px;
			margin-top: -286px;
			background: url("../assets/img/登录框bg.png") no-repeat center;
			background-size: cover;
			.input {
				color: #fff;
				input {
					height: 28px;
					color: #fff;
					border: none;
					background: #006bbe;
					margin-left: -40px;
				}
				img {
					display: block;
					margin: 0 auto;
					width: 400px;
					margin-top: 146px;
				}
				.user {
					color: #fff;
					line-height: 38px;
					width: 300px;
					height: 38px;
					margin: 0 auto;
					border-radius: 3px;
					margin-top: 15px;
					background: #006bbe;
					img {
						display: block;
						margin-top: 8px;
						margin-left: 15px;
						width: 20px;
						float: left;
						vertical-align: middle;
					}
				}
				.pass {
					color: #fff;
					line-height: 38px;
					width: 300px;
					height: 38px;
					margin: 0 auto;
					border-radius: 3px;
					margin-top: 15px;
					background: #006bbe;
					img {
						display: block;
						margin-top: 8px;
						margin-left: 15px;
						width: 20px;
						float: left;
						vertical-align: middle;
					}
				}
				.butn {
					width: 300px;
					height: 38px;
					margin: 0 auto;
					border-radius: 3px;
					margin-top: 15px;
					button {
						color: #fff;
						width: 100%;
						height: 100%;
						border: none;
						background: #006bbe;
					}
					overflow: hidden;
				}
			}
		}
		/*//云彩*/
		/*.sky {*/
			/*width: 100%;*/
			/*height:500px;*/
			/*top:0;*/
			/*left:0;*/
			/*position: absolute;*/
			/*overflow: hidden;*/
			/*-webkit-animation: sky_background 50s ease-out infinite;*/
			/*-moz-animation: sky_background 50s ease-out infinite;*/
			/*-o-animation: sky_background 50s ease-out infinite;*/
			/*animation: sky_background 50s ease-out infinite;*/
			/*-webkit-transform: translate3d(0, 0, 0);*/
			/*-ms-transform: translate3d(0, 0, 0);*/
			/*-o-transform: translate3d(0, 0, 0);*/
			/*transform: translate3d(0, 0, 0);*/
			/*.clouds_one {*/
				/*background: url("../assets/img/cloud_one.png");*/
				/*position: absolute;*/
				/*left: 0;*/
				/*top: 0;*/
				/*height: 100%;*/
				/*width: 300%;*/
				/*-webkit-animation: cloud_one 50s linear infinite;*/
				/*-moz-animation: cloud_one 50s linear infinite;*/
				/*-o-animation: cloud_one 50s linear infinite;*/
				/*animation: cloud_one 50s linear infinite;*/
				/*-webkit-transform: translate3d(0, 0, 0);*/
				/*-ms-transform: translate3d(0, 0, 0);*/
				/*-o-transform: translate3d(0, 0, 0);*/
				/*transform: translate3d(0, 0, 0);*/
			/*}*/
			/*.clouds_two {*/
				/*background: url("../assets/img/cloud_two.png");*/
				/*position: absolute;*/
				/*left: 0;*/
				/*top: 0;*/
				/*height: 100%;*/
				/*width: 300%;*/
				/*-webkit-animation: cloud_two 75s linear infinite;*/
				/*-moz-animation: cloud_two 75s linear infinite;*/
				/*-o-animation: cloud_two 75s linear infinite;*/
				/*animation: cloud_two 75s linear infinite;*/
				/*-webkit-transform: translate3d(0, 0, 0);*/
				/*-ms-transform: translate3d(0, 0, 0);*/
				/*-o-transform: translate3d(0, 0, 0);*/
				/*transform: translate3d(0, 0, 0);*/
			/*}*/
			/*.clouds_three {*/
				/*background: url("../assets/img/cloud_three.png");*/
				/*position: absolute;*/
				/*left: 0;*/
				/*top: 0;*/
				/*height: 100%;*/
				/*width: 300%;*/
				/*-webkit-animation: cloud_three 100s linear infinite;*/
				/*-moz-animation: cloud_three 100s linear infinite;*/
				/*-o-animation: cloud_three 100s linear infinite;*/
				/*animation: cloud_three 100s linear infinite;*/
				/*-webkit-transform: translate3d(0, 0, 0);*/
				/*-ms-transform: translate3d(0, 0, 0);*/
				/*-o-transform: translate3d(0, 0, 0);*/
				/*transform: translate3d(0, 0, 0);*/
			/*}*/
		/*}*/

		/*@-webkit-keyframes sky_background {*/
			/*0% {*/

				/*color: #007fd5;*/
			/*}*/

			/*50% {*/

				/*color: #a3d9ff;*/
			/*}*/

			/*100% {*/

				/*color: #007fd5;*/
			/*}*/
		/*}*/


		/*@-moz-keyframes sky_background {*/
			/*0% {*/

				/*color: #007fd5;*/
			/*}*/

			/*50% {*/

				/*color: #a3d9ff;*/
			/*}*/

			/*100% {*/

				/*color: #007fd5;*/
			/*}*/
		/*}*/


		/*@keyframes sky_background {*/
			/*0% {*/

				/*color: #007fd5;*/
			/*}*/

			/*50% {*/

				/*color: #a3d9ff;*/
			/*}*/

			/*100% {*/

				/*color: #007fd5;*/
			/*}*/
		/*}*/


		/*@-webkit-keyframes cloud_one {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@-moz-keyframes cloud_one {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@keyframes cloud_one {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@-webkit-keyframes cloud_two {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@-moz-keyframes cloud_two {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@keyframes cloud_two {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@-webkit-keyframes cloud_three {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@-moz-keyframes cloud_three {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/


		/*@keyframes cloud_three {*/
			/*0% {*/
				/*left: 0;*/
			/*}*/

			/*100% {*/
				/*left: -200%;*/
			/*}*/
		/*}*/

	}
</style>
