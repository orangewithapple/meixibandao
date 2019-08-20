<template>
    <div :style="{height:phoneHeight}" class="businessBox">
        <div style="height:35%">
            <van-image  src="./static/image/businessBac.jpg"/>
        </div>
        <div class="positionBox">
             <div class="logoShow">
                <van-image :width="logoSize" :height="logoSize" src="./static/image/2.png"/>
            </div>
            <div class="logoShow"  :style="styleBox[index]" v-for="(item,index) in logoWall" :key="item.index" >
                <van-image :width="logoSize" :height="logoSize" :src="index%2==0?logoBac[1]:logoBac[0]"/>
                <van-image class="logo" width="80" height="80" :src="item.businessUrl[0].url" @click="intoDetail(item._id)"/>
            </div>
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
        this.phoneHeight = window.screen.height + 'px'; 
        let phoneWidth = window.screen.width;
        if(phoneWidth>375){
            this.logoSize = 200
        }
         if(phoneWidth<375){
            this.logoSize = 170
        }
    },
    data(){
        return{
            logoBac:['./static/image/1.png','./static/image/2.png'],
            logoWall:null,
            styleBox:["top:1.9rem;left:-5.1rem","top:1.9rem;left:5.1rem","left:10rem","left:-9.8rem","top:11.2rem;left:-5.1rem","top:11.2rem;left:5.1rem"],
            addclass:"",
            phoneHeight:null,
            logoSize:"180"
        }
    },
    methods:{
        getData(){
            this.$http.post(config.langcang_config.url+config.langcang_config.api.business).then(
                res=>{
                    let LogoList = res.data.LogoList;
                    if(LogoList.length!=6){
                        let arr = {businessUrl:[{url:"./static/image/277216710071941181.png"}]};
                        let num = 6-LogoList.length;
                        for(let i =0;i<num;i++){
                            LogoList.push(arr)
                        }
                    }
                    this.logoWall = LogoList;
                    console.log(LogoList)
                }
            )
        },
        changing(){
            this.addclass="animation"
        },
        intoDetail(id){
            console.log(id)
            if(id==undefined){
                this.$toast("尚未开放，敬请期待");
                return;
            }
            this.$http.post(config.langcang_config.url+config.langcang_config.api.business,{
                id:id
            }).then(
                res=>{
                    let dataList = res.data.data[0];
                    console.log(dataList)
                   this.$router.push({
                       name:"BusinessDetail",
                       params:dataList
                       })
                }
            )
        }
    },
  components:{
    Tabar
  },
}
</script>