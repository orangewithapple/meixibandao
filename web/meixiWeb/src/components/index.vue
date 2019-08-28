<template>
    <div class="core-container">
                <div class="wrap" ref="scroll"  :style="{height:wrapHeight+ 'px'}">
                    <ul class="mom" ref="mom">
                        <li class="vipCard row-flex-center">
                            <van-image  :src="vipCard"/>
                            <span class="cardId">No.{{carId}}</span>
                        </li>
                        <li class="vipContent column-flex-start">
                            <h1>会员须知</h1>
                            <div class="shu">
                                <van-image class="shuIcon"  src="./static/image/shu.png"/>
                            </div>
                            <div :class="whichBox[index]" v-for="(item,index) in dataList" :key="item._id">
                                <div class="talkbubble row-flex-center">
                                    <h1>{{item.name}}</h1>
                                </div>
                                <div :class="[discount[index],flex[index]]">
                                    <div  v-if="index==0">
                                        <p v-for="arr in item.content">{{arr}}</p>
                                    </div>
                                    <div  v-if="index==3">
                                        <p v-for="arr in item.content">{{arr}}</p>
                                    </div>
                                    <div v-if="index==1||index==2">
                                        <p>{{item.content}}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
       <Tabar ref="tobar"></Tabar>
    </div>
</template>

<script>
import config from '../assets/public/config.js'
import BScroll from '@better-scroll/core'
import Tabar from './public/tabar'
export default {
    created(){
       let phoneHeight = window.screen.height ;
        this.wrapHeight =  phoneHeight-50;
        this.momHeight = window.screen.height+300
    },
    mounted(){
        this.getData();
    },
    data(){return{
        vipCard:null,
        whichBox:["discountBox","useTimeBox","phoneBox","useKnowBox"],
        dataList:null,
        discount:["discount","useTime","phone","useKnow"],
        flex:["column-flex-start","column-flex-center","column-flex-center","column-flex-start"],
        carId:null,
        bs:null,
        wrapHeight:null,
        momHeight:null,
    }},
    methods:{
        getData(){
             this.$http.post(config.langcang_config.url+config.langcang_config.api.vipDetail).then(
                        res=>{
                           let data = res.data.data;
                           data[1].know[0].content = data[1].know[0].content.split("、");
                           data[1].know[3].content = data[1].know[3].content.split(";");
                           this.dataList = data[1].know;
                           this.vipCard = data[0].url;
                            let id =JSON.parse(localStorage.getItem("userInfo"));
                           this.carId = id.id;
                             this.$nextTick(function(){
                                this.init()
                                if(this.bs){
                                    this.bs.refresh();
                                }
                            })
                        }
                    )
        },
        
        init(){
          this.bs = new BScroll(this.$refs.scroll, {
          scrollY: true,
          click: true,
          probeType: 3 // listening scroll hook
        })
        },
    },
  components:{
    Tabar
  },
}
</script>
