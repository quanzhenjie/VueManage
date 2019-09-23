<template>
    <div class="LoginBody">
        <Card style="width:300px;position: absolute;top:20%;right: 10%">
            <p slot="title">
                欢迎登录
            </p>
            <div>
                <p>
                    <Input prefix="ios-contact" v-model="account" @on-blur="accountCheck" placeholder="请输入用户名" type="text" style="width: 100%" />
                </p>
                <p style="color: red;height: 22px">
                    <label>{{accountWarn}}</label>
                </p>
                <p>
                    <Input prefix="ios-lock" v-model="password" @on-blur="passwordCheck" @keydown.enter.native="login" placeholder="请输入密码" type="password" :autofocus="true" style="width: 100%" />
                </p>
                <p style="color: red;height: 22px">
                    <label>{{passwordWarn}}</label>
                </p>
                <p>
                    <Button type="primary" @click="login" style="width: 100%">登录</Button>
                </p>
            </div>
            <br />
            <p class="login-tip">输入任意用户名和密码即可</p>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "LoginPage",
        data (){
            return {
                account : "admin",
                password : "",
                accountWarn : "",
                passwordWarn : ""
            }
        },
        methods : {
            accountCheck : function (){
                this.accountWarn = this.account.length<5 && this.account.length>=1?"账号不能少于5个字符":"";
            },
            passwordCheck : function (){
                this.passwordWarn = this.password.length<6 && this.password.length>=1?"密码不能少于6个字符":"";
            },
            login : function (){
                // if(this.account.length<5){
                //     this.accountWarn = "账号不能少于5个字符";
                //     return false;
                // }
                // if(this.password.length<6){
                //     this.passwordWarn = "密码不能少于6个字符";
                //     return false;
                // }
                /***这里添加登录操作***/
                this.$emit('input');
            }
        },
        computed : {

        },
        created() {

        }
    }
</script>

<style>
    .LoginBody{
        position: fixed;
        width: 100%;
        height: 100%;
        background: url("../../assets/login_bg.jpg");
    }
    .login-tip{
        font-size: 10px;
        text-align: center;
        color: rgb(195, 195, 195);
    }
</style>