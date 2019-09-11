<template>
    <div class="row-flex-start tableBox">
        <div class="nav">
            <div class="userImg column-flex-center">
                <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                <span>admin</span>
            </div>
            <van-sidebar v-model="activeKey" @change="change">
                <van-sidebar-item title="业主信息" />
                <van-sidebar-item title="会员权益" />
                <van-sidebar-item title="合作商家" />
            </van-sidebar>
        </div>
        <keep-alive>
            <owner :is="whichShow"></owner>   <!--     业主信息组件     -->

            <vip :is="whichShow"></vip>      <!--     会员权益组件     -->

            <Business :is="whichShow"></Business>  <!--     合作商家组件     -->
       </keep-alive>
    </div>  
</template>
<script>
import config from '../assets/public/config.js'
import owner from './ownerInfo'
import vip from './vipDetail'
import Business from './business'
export default {
    created(){
        let that = this;
        this.phoneHeight = window.screen.height + 'px';       
    },
     data() {
    return {
      activeKey: 0,
      phoneHeight:"",
      whichShow:"owner"
    };
  },
    components:{
        owner,
        vip,
        Business
    },
  methods:{
    change(index){
        if(index==0){
            this.whichShow = owner;
        }
        if(index==1){
            this.whichShow = vip;
        }
        if(index==2){
            this.whichShow = Business;
        }
    }
  }
}
</script>

