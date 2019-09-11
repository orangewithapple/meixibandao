
<template>
    <div class="bgbox">
        <div class="loginBox column-flex-center">
          <h1>后台管理系统</h1>
          <div class="row-flex-start">
            <span>账号</span>
            <input class="Ip" type="text" v-model="username">
          </div>
          <div class="row-flex-start">
            <span>密码</span>
            <input class="Ip" type="password" v-model="password">
          </div>           
          <button @click="signIn">登录</button>
        </div>
    </div>
</template>
<script>
import config from '../assets/public/config.js'
export default {
    data(){
        return{
            username:"",
            password:"",
        }
    },
    methods:{
        signIn(){
          this.$http.post(config.langcang_config.url+config.langcang_config.api.users,
          {
            "username":this.username,
            "password":this.password            
          }
          ).then(
            res=>{
              this.$toast(res.data.message);
              if(res.data.success==true){
                let token = JSON.stringify(res.data.token);
                localStorage.setItem("manageAdmin",res.data.token);
                this.$router.replace('Index');
                }
            }
          )
        }

    }
}
</script>

