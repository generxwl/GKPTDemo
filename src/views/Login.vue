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
				<img src="../assets/img/logo_login.png" alt="">
				<div class="user">
					<strong>用户名</strong><input class="us" v-model="userName" type="text" placeholder="请输入用户名">
				</div>
				<div class="pass">
					<strong>密码</strong><input class="pa" v-model="passWord" type="password" placeholder="请输入密码">
				</div>
				<div class="tishi">
					用户名或密码不正确
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
            $(".us").focus(function(){
                $('.user').css('border-bottom','1px solid #2494F2');
            });
            $(".pa").focus(function(){
                $('.pass').css('border-bottom','1px solid #2494F2');
            });
            $(".us").blur(function(){
                $('.user').css('border-bottom','1px solid #fff');
            });
            $(".pa").blur(function(){
                $('.pass').css('border-bottom','1px solid #fff');
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
                            //_this.$message.error(text);
                            $('.tishi').css('display','block');
                            $('.user').css('border-bottom','1px solid red');
                            $('.pass').css('border-bottom','1px solid red');
							setTimeout(()=>{
                                $('.tishi').css('display','none')
                                $('.user').css('border-bottom','1px solid #fff');
                                $('.pass').css('border-bottom','1px solid #fff');
							},2000)
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
		background: url("../assets/img/bj_denglu.jpg") no-repeat center;
		background-size: cover;
		position: relative;
    	.bottom_title{
		  position: absolute;
		  width: 100%;
			height: 50px;
		  left: 0;
		  bottom:0;
		 background: rgba(0,0,0,0.2);
		  .title_banquan{
			  padding-left: 34%;
			float: left;
			  color: #fff;
			  line-height: 50px;
			  font-size: 14px;
			  opacity: 0.8;
			span{
			  padding-left: 50px;
			}
		  }
		  .img-qianren{
			float: left;
			img{
			  margin-top: 5px;
			  padding-left: 24px;
			  width: 100px;
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
			width: 497px;
			height: 410px;
			left: 50%;
			top: 17%;
			background: rgba(0,0,0,0.5);
			.input {
				color: #fff;
				input {
					width: 240px;
					height: 28px;
					color: #fff;
					border: none;
					background: rgba(0,0,0,0);
					line-height: 28px;
				}
				img {
					display: block;
					margin: 0 auto;
					width: 400px;
					margin-top: 42px;
				}
				.user {
					text-align: left;
					line-height: 60px;
					width: 340px;
					height: 60px;
					margin: 20px auto;
					border-bottom: solid 1px #fff;
					strong{
						display: inline-block;
						width: 60px;
						color: #fff;
						font-size: 16px;
						font-weight: bold;
					}

				}
				.pass {
					text-align: left;
					line-height: 60px;
					width: 340px;
					height: 60px;
					margin: 0 auto;
					border-bottom: solid 1px #fff;
					strong{
						display: inline-block;
						width: 60px;
						color: #fff;
						font-size: 16px;
						font-weight: bold;
					}
				}
				.tishi{
					display: none;
					position: absolute;
					right: 76px;
					width: 340px;
					height: 30px;
					margin: 0px auto;
					line-height: 30px;
					color: red;
					text-align: right;
				}
				.butn {

					width: 340px;
					height: 48px;
					margin: 0px auto;
					border-radius: 3px;
					margin-top: 54px;
					button {
						color: #fff;
						width: 100%;
						height: 100%;
						font-size: 18px;
						border: none;
						background: #2494F2;
					}
					:hover{
						background: #0070CE;
					}
					overflow: hidden;
				}
			}
		}

	}
</style>
