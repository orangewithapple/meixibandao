<template>
    <div>
        <div class="content">
            <div class="vipCard row-flex-center">
                <van-image  :src="vipCard"/>
                <span class="cardId">NO.1546848750</span>
            </div>
            <div class="vipContent column-flex-start">
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
                        <div  v-if="index==1||index==2">
                            <p>{{item.content}}</p>
                        </div>
                    </div>
                </div>
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
        this.getData();
    },
    data(){return{
        vipCard:null,
        whichBox:["discountBox","useTimeBox","phoneBox","useKnowBox"],
        dataList:null,
        discount:["discount","useTime","phone","useKnow"],
        flex:["column-flex-start","column-flex-center","column-flex-center","column-flex-start"]
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
                        }
                    )
        }
    },
  components:{
    Tabar
  },
}
</script>
