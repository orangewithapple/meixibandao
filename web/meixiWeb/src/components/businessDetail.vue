<template>
    <div :style="{height:phoneHeight}" class="detailBox">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in list" :key="index" @click="changeBtn(index)">
                    <!-- <i class="iconfont icon-return back" @click="back"></i> -->
                    <p class="vipDiscount"><i class="iconfont icon-xingxing"></i>{{item.discount}}</p>
                    <van-image :src="item.url"/>
                </van-swipe-item>
            </van-swipe>
            <div class="introduce column-flex-start">
                <p  v-for="(items,index) in introduceList" :key="index">{{items}}</p>
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
        this.getData(0)
    },
    data(){
        return{
           phoneHeight:null,
           introduceList:null,
           discountDetailList:null,
           headImage:null,
           headDiscount:null,
           list:[]
        }
    },
    methods:{
        changeBtn(index){
            this.getData(index);
        },
        // back(){
        //     this.$router.go(-1);
        // },
        getData(index){
            this.list = this.$route.query.businessHead;
            console.log(this.list)
            this.introduceList = this.list[index].explain.split(";");
            this.discountDetailList =  this.list[index].detial.split("。");
            // this.headImage = this.list[0].url;
            // console.log(this.headImage)
            this.headDiscount =  this.list[index].discount;
        }
    }
}
</script>
<style>
    .van-image{
        height:240px;
    }
</style>