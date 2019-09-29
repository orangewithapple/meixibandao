<template>
    <div class="businessBox" :style="{height:businessBoxHeigth+'px'}">
          <van-overlay
        :show="show"
        @click="show = false"
        />
        <div class="businessSwiper">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <van-image style="display:block" src="./static/image/swiper.png"/>
                </van-swipe-item>
            </van-swipe>
            <div class="wrap" ref="scroll">
                <div class="businessLogo row-flex-center" :style="{width:logoWidth+'px'}">
                    <van-image @click="intoDetail(item._id)" width="100" height="100" :src="item.businessUrl[0].url" v-for="(item,index) in logoWall" :key="index"/>
                </div>
            </div>    
        </div>
         <Tabar></Tabar>  
    </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import config from '../assets/public/config.js'
import Tabar from './public/tabar'
export default {
     created(){                                                                                                                 
        //   v-for="(item,index) in LogoList" :key="index"
        this.getData()
    },
    mounted(){
        this.businessBoxHeigth = window.screen.height 
    }, 
   data(){
        return{
            businessBoxHeigth:null,
            bs:null,
            logoWidth:null,
            logoWall:null,
            show:true
        }
    },
    methods:{ 
         getData(){
            this.$http.post(config.langcang_config.url+config.langcang_config.api.business).then(
                res=>{
                    let LogoList = res.data.LogoList;
                    if(LogoList.length>3){
                        this.logoWidth = LogoList.length*100
                    }
                    else{
                      this.logoWidth = "auto";
                    }
                    this.logoWall = LogoList;
                    this.$nextTick(function(){
                                this.init()
                                if(this.bs){
                                    this.bs.refresh();
                                }
                            })
                    console.log(LogoList)
                    this.show = false;
                }
            )
        },
         init(){
          this.bs = new BScroll(this.$refs.scroll, {
          scrollX: true,
          click: true,
          probeType: 3 // listening scroll hook
        })
        },
        intoDetail(id){
            this.$http.post(config.langcang_config.url+config.langcang_config.api.business,{
                id:id
            }).then(
                res=>{
                    let dataList = res.data.data[0];
                    this.$router.push({path:"/BusinessDetail",query:dataList})
                })
        }
    },
    components:{
    Tabar
  },
}
</script>
