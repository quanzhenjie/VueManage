<template>
    <div class="Login">
        <LoginPage @input="loginSuccess"></LoginPage>
    </div>
</template>

<script>
    import LoginPage from './../components/LoginPage/LoginPage'
    export default {
        name: "Login",
        components: {
            LoginPage
        },
        data (){
            return {

            }
        },
        methods : {
            loginSuccess (ParameterObject){
                console.log('登录',ParameterObject);
            }
        }
    }
</script>

<style scoped>

</style>