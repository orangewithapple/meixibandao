<template>
    <div class="business">
        <div v-for="item in businessList" :key="item._id">
            <div class="businessLogo">
                <span>商家图标:</span>
                <van-uploader v-model="item.businessUrl" :max-count="1" :after-read="afterLogoRead"/>
            </div>
            <div class="businessHead">
                <span>展示头图:</span>
                <van-uploader  v-model="item.businessHead" :max-count="1" :after-read="afterHeadRead"/>
            </div>
            <div class="row-flex-start">
                <h1>享受折扣:</h1>
                <van-field type="textarea" size="small" v-model="item.discount" :disabled="isdisable" autosize/>
            </div>
             <div class="row-flex-start">
                <h1>说明:</h1>
                 <van-field type="textarea" size="small" v-model="item.explain" :disabled="isdisable" autosize/>
            </div>
            <div class="businessDiscount row-flex-start">
                <h1>优惠详情:</h1>
                <van-field type="textarea" size="small" v-model="item.detial" :disabled="isdisable" autosize/>
            </div>
        </div>    
            <div class="businessLogoList">
                <van-image
                    width="100"
                    height="100"
                    :src="item.businessUrl[0].url"
                    v-for="item in businessLogoList" :key="item._id"
                    @click="chooseLogo(item._id)"
                />
            </div>
        <div class="row-flex-center" style="height:3rem;">
            <button @click="edit">{{isedit}}</button>
        </div>
    </div>
</template>
<script>
import config from '../assets/public/config.js'
export default {
    created(){
        this.phoneHeight = window.screen.height + 'px';    
        this.getData();
    },
    data(){
        return{
            isdisable:true,
            isedit:"修改",
            businessLogo:[],//商家图标
            businessHead:[],//展示头图
            phoneHeight:"",
            businessList:[],
            businessLogoList:[]
        }
    },
    methods:{
          //上传图片
        afterLogoRead(file) {
        //    let fileType = file.file.type.split("/")[1];
      // 此时可以自行将文件上传至服务器
         this.$http.post(config.langcang_config.url+config.langcang_config.api.business,
                 {  
                    imgId:this.imgId,
                    file:file.content
                 }).then(
            res=>{
                console.log(res.data)
                this.$toast(res.data.message);
            }
         )
    },
    afterHeadRead(){},
    edit(){

    },
    getData(){
        this.$http.post(config.langcang_config.url+config.langcang_config.api.business).then(
            res=>{
                let dataList = res.data.data[0];
                let LogoList = res.data.LogoList;
                this.businessList.push(dataList);
                this.businessLogoList = LogoList;
                
            }
         )
    },
    chooseLogo(id){
        console.log(id)
    }
    }
}
</script>
