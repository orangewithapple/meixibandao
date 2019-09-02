<template>
    <div class="business">
        <div v-for="item in businessList" :key="item._id">
            <div class="businessLogo">
                <span>商家图标:</span>
                <van-uploader v-model="item.businessUrl" :max-count="1" :after-read="afterLogoRead" :before-read="beforeRead"/>
            </div>
            <div class="businessHead">
                <span>展示头图:</span>
                <van-uploader  v-model="item.businessHead" :max-count="1" :after-read="afterHeadRead" :before-read="beforeRead"/>
            </div>
            <div class="row-flex-start">
                <h1>享受折扣:</h1>
                <van-field type="textarea" size="small" v-model="item.discount" :disabled="isdisable" autosize/>
            </div>
             <div class="row-flex-start">
                <h1>说明:</h1>
                 <van-field type="textarea" size="small" placeholder="每句结尾以英文的分号结束" v-model="item.explain" :disabled="isdisable" autosize/>
            </div>
            <div class="businessDiscount row-flex-start">
                <h1>优惠详情:</h1>
                <van-field type="textarea" size="small" placeholder="除了最后一句话，每句结尾必须打上句号" v-model="item.detial" :disabled="isdisable" autosize/>
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
        <div class="row-flex-level" style="height:3rem;width:11rem;margin: 0 auto;">
            <button @click="edit" v-show="editShow">{{isedit}}</button>
            <button @click="add">{{isAdd}}</button>
        </div>
    </div>
</template>
<script>
import config from '../assets/public/config.js'
import { error } from 'util';
export default {
    created(){
        this.phoneHeight = window.screen.height + 'px';    
        this.getData();
    },
    data(){
        return{
            isdisable:true,
            isAdd:"添加商家",
            isedit:"修改",
            phoneHeight:"",
            businessList:[],
            businessLogoList:[],
            editShow:true
        }
    },
    methods:{
        //验证图片格式
         beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        this.$toast('请上传 jpg 格式图片');
        return false;
      }
    
      return true;
    },
          //上传商家LOGO图片
        afterLogoRead(file) {
        //    let fileType = file.file.type.split("/")[1];
      // 此时可以自行将文件上传至服务器
         this.$http.post(config.langcang_config.url+config.langcang_config.api.business,
                 {  
                    LogoId:"1",
                    imgId : this.businessList[0]._id,
                    file:file.content
                 }).then(
            res=>{
                console.log(res.data)
                this.$toast(res.data.message);
            }
         )
          .catch(error=>{
              if(error.response.status==413){
                  this.$toast("请上传低于5M的图片");
                  this.businessList[0].businessUrl=[];
              }
              console.log(error.response.status)
          })
    },
    //上传展示头图
    afterHeadRead(file){
         this.$http.post(config.langcang_config.url+config.langcang_config.api.business,
                 {  
                    HEADId:"1",
                    imgId : this.businessList[0]._id,
                    file:file.content
                 }).then(
            res=>{
                console.log(res.data)
                this.$toast(res.data.message);
            }
         ).catch(error=>{
              if(error.response.status==413){
                  this.$toast("请上传低于5M的图片");
                  this.businessList[0].businessHead=[]
              }
          })
    },
    //修改操作
    edit(){
        if(this.isedit=="修改"){
                this.isedit = "保存";
                this.isdisable=false;
            }
            else{
                this.isedit="修改";
                this.isdisable=true;
                let _id = this.businessList[0]._id;
                 this.$http.post(config.langcang_config.url+config.langcang_config.api.business,
                 {
                    editId:_id,
                    List: this.businessList[0]
                 }).then(
            res=>{
                this.$toast(res.data.message);
            }
        )
            }
    },
    //数据源
    getData(){
        this.$http.post(config.langcang_config.url+config.langcang_config.api.business).then(
            res=>{
                let arr = new Array();
                let dataList = res.data.data[0];
                let LogoList = res.data.LogoList;
                arr.push(dataList)
                this.businessList= arr;
                this.businessLogoList = LogoList;
            }
         )
    },
    //选择商家图标，查看当前商家详情
    chooseLogo(id){
        this.isedit="修改";
        this.editShow = true;
        this.isAdd = "添加商家";
        this.$http.post(config.langcang_config.url+config.langcang_config.api.business,{
            id:id
        }).then(
            res=>{
                let arr = new Array();
                let dataList = res.data.data[0];
                let LogoList = res.data.LogoList;
                arr.push(dataList)
                this.businessList= arr;
            }
         )
    },
    //添加商户
    add(){
        this.editShow = false;
        let arr = {
            businessUrl:[],
            businessHead:[],
            discount:"",
            explain:"",
            detial:""
        }
        if(this.isAdd == "添加商家"){
            this.isAdd = "保存";
            this.businessList = [];
            this.businessList.push(arr);
            this.isdisable = false;
        }
        else 
        {
            this.isAdd = "保存";
            let discount = this.businessList[0].discount;
            let explain =  this.businessList[0].explain;
            let detial = this.businessList[0].detial;
            let url = this.businessList[0].businessUrl;
            let headUrl = this.businessList[0].businessHead
            if(discount==""||explain==""||detial==""){
                this.$toast("请完整填写");
                return;
            }
            else if(url.length==0||headUrl.length==0){
                this.$toast("请上传图片");
                return;
            }
            this.$http.post(config.langcang_config.url+config.langcang_config.api.business,{
            addBusiness:"1",
            discount:discount,
            explain:explain,
            detial:detial,
        }).then(
            res=>{
                this.$toast(res.data.message);
                this.getData();
            }
         )
        }
    }
    }
}
</script>
