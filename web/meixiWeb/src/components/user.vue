<template>
  <div :style="{height:phoneHeight}" class="column-flex-center  userBox">
    <div class="column-flex-center nameRoom">
      <div class="name row-flex-start">
        <div class="nameBackColor"></div>
        <van-image class="nameIcon" width="20" height="30" src="./static/image/nameIcon.png"/>
        <h1>姓名</h1>
        <van-field v-model="name" placeholder="请输入业主姓名，可多写" />
      </div> 
      <div class="room row-flex-start">
        <div class="roomBackColor"></div>
        <van-image class="roomIcon" width="30" height="30" src="./static/image/roomIcon.png"/>
        <h1>房号</h1>
        <van-field v-model="room" placeholder="请输入业主名下任意一个房号" />
      </div>
    </div>
    <div class="loginBtn row-flex-center" @click="loginBtn">
      <button>登录</button>
    </div>
  </div>
</template>

<script>
import config from '../assets/public/config.js'
export default {
  created(){
    this.phoneHeight = window.screen.height + 'px';       
  },
  data () {
    return {
      phoneHeight:null,
      name:null,
      room:null 
    }
  },
  methods:{
    loginBtn(){
      this.$http.post(config.langcang_config.url+config.langcang_config.api.owenrUser,
          {
            "name":this.name,
            "room":this.room            
          }
          ).then(
            res=>{
              this.$toast(res.data.message);
              if(res.data.success==true){
                let id = res.data.data[0].id;
                let token = JSON.stringify(res.data.token);
                localStorage.setItem("nameId",res.data.token);
                localStorage.setItem("carId",id);
                this.$router.replace('Index');
                }
            }
          )
    }
  }
}
</script>
