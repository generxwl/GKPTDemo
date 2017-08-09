<template>
    <div class="login">
        <!--登录页-->
        <div class="form">
            <div class="input">
                <img src="../assets/img/login-logo.png" alt="">
                <div class="user">
                    <img src="../assets/img/用户名.png" alt=""><input type="text" placeholder="请输入用户名">
                </div>
                <div class="pass">
                    <img src="../assets/img/密码.png" alt=""><input type="password" placeholder="请输入密码">
                </div>
                <div class="butn">
                    <button>登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data () {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .login{
        min-width: 1060px;
        width: 100%;
        height: 100%;
        background: url("../assets/img/beijing.png") no-repeat center;
        background-size:cover;
        position: relative;
        .form{
            position: absolute;
            width: 816px;
            height: 442px;
            left: 50%;
            top:50%;
            margin-left: -408px;
            margin-top: -286px;
            background: url("../assets/img/登录框bg.png") no-repeat center;
            background-size:cover;
            .input{
                color: #fff;
                input{
                    height: 28px;
                    color: #fff;
                    border:none;
                    background:#006bbe;
                    margin-left: -40px;
                }
                img{
                    display: block;
                    margin: 0 auto;
                    width: 400px;
                    margin-top: 146px;

                }
                .user{
                    color: #fff;
                    line-height: 38px;
                    width: 300px;
                    height: 38px;
                    margin: 0 auto;
                    border-radius: 3px;
                    margin-top: 15px;
                    background:#006bbe;
                    img{
                        display: block;
                        margin-top: 8px;
                        margin-left: 15px;
                        width: 20px;
                        float: left;
                        vertical-align: middle;
                    }
                }
                .pass{
                    color: #fff;
                    line-height: 38px;
                    width: 300px;
                    height: 38px;
                    margin: 0 auto;
                    border-radius: 3px;
                    margin-top: 15px;
                    background:#006bbe;
                    img{
                        display: block;
                        margin-top: 8px;
                        margin-left: 15px;
                        width: 20px;
                        float: left;
                        vertical-align: middle;
                    }
                }
                .butn{
                    width: 300px;
                    height: 38px;
                    margin: 0 auto;
                    border-radius: 3px;
                    margin-top: 15px;
                    button{
                        color: #fff;
                        width: 100%;
                        height: 100%;
                        border:none;
                        background:#006bbe;
                    }
                    overflow: hidden;
                }
            }
        }
    }
</style>
