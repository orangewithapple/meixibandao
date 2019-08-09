<template>
    <div class="vipDetail column-flex-center">
        <div style="width:100%">
            <span>修改卡样式</span>
            <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead"/>
        </div>
        <div class="row-flex-start" v-for="item in vipList" :key="item._id">
            <span>{{item.name}}</span>
            <van-field type="textarea" size="small" v-model="item.content" :disabled="isdisable" autosize/>
        </div>
        <button @click="edit">{{isedit}}</button>
    </div>
</template>
<script>
import config from '../assets/public/config.js'
export default {
    created(){
        this.getData();
    },
    data(){
        return{
            vipList:"",//数据源
            Instructions:"",//使用须知内容
            isdisable:true,//是否禁用输入框
            isedit:"修改",
            id:"",//修改需要传入的ID
            fileList:[],
            imgId:"",
        }
    },
    methods:{
        //修改逻辑
        edit(){
            if(this.isedit=="修改"){
                this.isedit = "保存"
                this.isdisable=false;
                this.$toast("请直接在上面进行修改，修改完成后点击保存");
            }
            else{
                this.isedit="修改"
                this.isdisable=true;
                 this.$http.post(config.langcang_config.url+config.langcang_config.api.vipDetail,
                 {
                    vipId:this.id,
                    List: this.vipList
                 }).then(
            res=>{
                this.id=res.data.data[0]._id;
                this.$toast(res.data.message);
            }
        )
            }
        },
        //数据源
        getData(){
            this.$http.post(config.langcang_config.url+config.langcang_config.api.vipDetail).then(
                        res=>{
                            let arr = [];
                            this.id=res.data.data[1]._id;
                            let card = res.data.data[0];
                            this.imgId = card._id
                            arr.push({"url":card.url});
                            this.fileList = arr;
                            console.log(this.fileList)
                            let Data = res.data.data[1].know;
                            this.vipList = Data;
                        }
                    )
        },
        //上传图片
        afterRead(file) {
        //    let fileType = file.file.type.split("/")[1];
      // 此时可以自行将文件上传至服务器
         this.$http.post(config.langcang_config.url+config.langcang_config.api.vipDetail,
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
    }
}
</script>
