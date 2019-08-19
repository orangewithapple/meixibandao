<template>
    <div>
        <div class="tabar">
            <van-tabbar v-model="active" route>
            <van-tabbar-item to="/Index" name="home"    icon="vip-card">首页</van-tabbar-item>
            <van-tabbar-item to="/Business" name="friends" icon="friends">合作商家</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>
<script>
export default {
     data() {
    return {
      active: 'home',
    }
  },
  methods:{
      
  }
}
</script>