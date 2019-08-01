<template>
    <div class="row-flex-start tableBox" style="background-color:#f8f8f8">
        <div class="nav" :style="{height:phoneHeight}">
            <div class="userImg column-flex-center">
                <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                <span>admin</span>
            </div>
            <van-sidebar v-model="activeKey">
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
            </van-sidebar>
        </div>
        <div class="indexTable">
            <van-row class="title">
                <van-col span="8">业主</van-col>
                <van-col span="8">房号</van-col>
                <van-col span="8">操作</van-col>
            </van-row>
            <van-row class="content" v-for="item in ownerList" :key="item._id">
                <van-col span="8">{{item.name.join(",")}}</van-col>
                <van-col span="8">{{item.room.join(",")}}</van-col>
                <van-col span="8">
                    <button>编辑</button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import config from '../assets/public/config.js'
export default {
    created(){
        this.phoneHeight = window.screen.height + 'px';
         this.$http.post(config.langcang_config.url+config.langcang_config.api.numPage).then(
            res=>{
                if(res.data.success == true)
                {
                    let data = res.data.data;
                    this.ownerList = data;
                }
            }
          )
    },
     data() {
    return {
      activeKey: 0,
      phoneHeight:"",
      ownerList:""
    };
  }
}
</script>

