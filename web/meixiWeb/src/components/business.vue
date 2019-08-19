<template>
    <div>
        <van-image  src="./static/image/businessBac.png"/>
            <div class="logoShow" @click="changing">
                <van-image width="100" height="120" :src="logoBac[1]"/>
            </div>
        <div :class="[defaultClass,addclass]" :style="styleBox[0]" >
            <van-image width="100" height="120" :src="logoBac[0]"/>
            <van-image width="100" height="100" src="./static/image/277216710071941181.png"/>
        </div>
        <div :class="[defaultClass,addclass]" :style="styleBox[1]" >
            <van-image width="100" height="120" :src="logoBac[1]"/>
            <van-image width="100" height="100" src="./static/image/277216710071941181.png"/>
        </div>

        <div :class="[defaultClass,addclass]" :style="styleBox[2]" >
            <van-image width="100" height="120" :src="logoBac[1]"/>
            <van-image width="100" height="100" src="./static/image/277216710071941181.png"/>
        </div>
        <div :class="[defaultClass,addclass]" :style="styleBox[3]" >
            <van-image width="100" height="120" :src="logoBac[0]"/>
            <van-image width="100" height="100" src="./static/image/277216710071941181.png"/>
        </div>

          <div :class="[defaultClass,addclass]" :style="styleBox[4]" >
            <van-image width="100" height="120" :src="logoBac[1]"/>
            <van-image width="100" height="100" src="./static/image/277216710071941181.png"/>
        </div>
          <div :class="[defaultClass,addclass]" :style="styleBox[5]" >
            <van-image width="100" height="120" :src="logoBac[0]"/>
            <van-image width="100" height="100" src="./static/image/277216710071941181.png"/>
        </div>
        <Tabar></Tabar> 
    </div>
</template>
<script>
import config from '../assets/public/config.js'
import Tabar from './public/tabar'
export default {
    created(){
        this.getData()
    },
    data(){
        return{
            logoBac:["/static/image/businessLogo1.png","/static/image/businessLogo2.png"],
            logoWall:null,
            styleBox:["top:14.8rem;left:-5.6rem","top:14.8rem;left:5.6rem","top:25.1rem;left:5.6rem","top:25.1rem;left:-5.6rem","left:-11.4rem","left:11.4rem"],
            defaultClass:"logoShow",
            addclass:""
        }
    },
    methods:{
        getData(){
            this.$http.post(config.langcang_config.url+config.langcang_config.api.business).then(
                res=>{
                    let data = res.data;
                    let LogoList = res.data.LogoList;
                    this.logoWall = LogoList;
                    console.log(LogoList)
                }
            )
        },
        changing(){
            this.addclass="animation"
        }
    },
  components:{
    Tabar
  },
}
</script>