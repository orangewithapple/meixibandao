<template>
    <div :style="{height:phoneHeight}" class="detailBox">
        <div class="headImage">
            <i class="iconfont icon-return back" @click="back"></i>
            <p class="vipDiscount"><i class="iconfont icon-xingxing"></i>{{headDiscount}}</p>
            <van-image :src="headImage"/>
        </div>
        <div class="introduce column-flex-start">
            <p  v-for="(item,index) in introduceList" :key="index">{{item}}</p>
        </div>
        <div class="discountDetail">
            <h1>【优惠详情】</h1>
            <p v-for="(item,index) in discountDetailList" :key="index"><i class="circular">{{index+1}}</i>{{item}}</p>
        </div>
    </div>
</template>
<script>
export default {
    created(){
        this.phoneHeight = window.screen.height + 'px';
        this.getData()
    },
    data(){
        return{
           phoneHeight:null,
           introduceList:null,
           discountDetailList:null,
           headImage:null,
           headDiscount:null
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        getData(){
            let DataList = this.$route.params;
            this.introduceList = DataList.explain.split(";");
            this.discountDetailList =  DataList.detial.split("。");
            this.headImage = DataList.businessHead[0].url;
            this.headDiscount =  DataList.discount;
        }
    }
}
</script>