<template>
    <div class="vipDetail column-flex-center">
        <div class="row-flex-start" v-for="item in vipList" :key="item._id">
            <span>{{item.name}}</span>
            <van-field type="textarea"  v-model="item.content" :disabled="isdisable" autosize/>
        </div>
        <!-- <div class="row-flex-start">
            <span>使用须知：</span>
             <van-field
                v-model="Instructions"
                type="textarea"
                rows="1"
                autosize
                :disabled="isdisable"
            />
        </div> -->
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
            id:""//修改需要传入的ID
        }
    },
    methods:{
        //修改逻辑
        edit(){
            if(this.isedit=="修改"){
                this.isedit = "保存"
                this.isdisable=false;
                this.$toast("请直接在上面进行修改，修改完成后点击保存")
            }
            else{
                this.isedit="修改"
                this.isdisable=true;
                 this.$http.post(config.langcang_config.url+config.langcang_config.api.vipDetail,
                 {
                    id:this.id,
                    List: this.vipList
                 }).then(
            res=>{
                this.$toast(res.data.message)
            }
        )
            }
        },
        //数据源
        getData(){
            this.$http.post(config.langcang_config.url+config.langcang_config.api.vipDetail).then(
                        res=>{
                            this.id=res.data.data[0]._id;
                            let Data = res.data.data[0].know;
                            this.vipList = Data;
                        }
                    )
        }
    }
}
</script>
