<template>
    <div>
         <div class="indexTable">
            <van-row class="title">
                <van-col span="8">业主</van-col>
                <van-col span="8">房号</van-col>
                <van-col span="8">操作</van-col>
            </van-row>
            <van-row class="content" v-for="item in ownerList" :key="item._id">
                <van-col span="8">
                    {{item.name.join(",")}}
                </van-col>
                <van-col span="8">
                    {{item.room.join(",")}}
                    </van-col>
                <van-col span="8">
                    <button @click="showPopup(item)">修改</button>
                </van-col>
            </van-row>
            <van-pagination 
            v-model="currentPage" 
            :total-items="total"
            :items-per-page="15"
            :show-page-size="3" 
            @change="changePage"
            force-ellipses
            prev-text="上页"
            next-text="下页"
            />
            <div class="add">
                <button @click="add">添加</button>
            </div>
        </div>
        <!--
             弹出框
         -->
        <div>
            <van-popup v-model="show" class="dailog column-flex-center">
                <h1>{{whichFn}}</h1>                    
                <div class="row-flex-start">
                    <span>业主:</span>
                    <input type="text"  v-model="editname">
                </div>
                <div class="row-flex-start">
                    <span>房号:</span>
                    <input type="text"  v-model="editroom">
                </div>
                <div class="saveCancel row-flex-between">
                    <button class="save" @click="save">保存</button>
                    <button @click="cancel">取消</button>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script>
import config from '../assets/public/config.js'
export default {
    created(){
          this.ownerData();
    },
     data() {
    return {
      ownerList:"",
      currentPage: 1,
      total:0,//业主信息总数量，
      show: false,//弹出框是否弹出,false关闭
      editname:[],//修改业主姓名
      editroom:[],//修改房号
      id:"",//数据_id,
      whichFn:""
    };
  },
  methods:{
      //分页切换时
      changePage(page){
        this.currentPage = page;
        this.ownerData();
      },
      //业主数据
      ownerData(){
            this.$http.post(config.langcang_config.url+config.langcang_config.api.numPage,{
                page:this.currentPage,
            }).then(
            res=>{
                this.total = Number(res.data.total);
                if(res.data.success == true)
                {
                    let data = res.data.data;
                    this.ownerList = data;
                }
            }
          )
      },
      //修改按钮
      showPopup(data,index){
        this.editname=data.name;
        this.editroom=data.room;
        this.id = data._id;
        this.show = true;
        this.whichFn = "修改"
      },
      add(){
        this.editname = "";
        this.editroom = "";
        this.show = true;
        this.id = "add";
        this.whichFn = "添加";
      },
      // 弹出框取消
      cancel(){
          this.show = false;
      },
      //弹出框保存
      save(){
          let getInfo =localStorage.getItem("userInfo");
          if(this.editroom instanceof Array==false){
              let editroom = this.editroom.split(",");
               this.editroom = editroom;
              console.log(this.editroom instanceof Array);
          }
          if(this.editname instanceof Array==false){
              let editname = this.editname.split(",");
              this.editname = editname;
          console.log(this.editname instanceof Array)
          }
          this.$http.post(config.langcang_config.url+config.langcang_config.api.numPage,{
                id:this.id,
                name:this.editname,
                room:this.editroom,
                token:getInfo
            }).then(
            res=>{
                if(res.data.success==true){
                    this.show = false;
                    this.ownerData();
                    this.$toast(res.data.message);
                }
                if(res.data.success==false){
                    this.show = false;
                    this.$toast(res.data.message);
                    this.$router.replace('/')
                }
               console.log(res.data)
            }
          )
      },
  }
}
</script>
