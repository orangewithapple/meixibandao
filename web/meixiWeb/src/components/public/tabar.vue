<template>
    <div>
        <div class="tabar">
            <van-tabbar v-model="active" route @change="onChange">
            <van-tabbar-item to="/Index" name="home"    icon="vip-card">首页</van-tabbar-item>
           <van-tabbar-item  @click="gemO=!gemO" name="gem-o"  icon="gem-o">梅溪半岛
               <ul class="gemO" v-show="gemO">
                   <li>最新活动</li>
                   <li>样板间鉴赏</li>
               </ul>
           </van-tabbar-item>
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
      gemO:false,
    }
  },
  methods:{
    onChange(index){
        if(index!="gem-o"){
            this.gemO=false;
        }
    }
  }
}
</script>