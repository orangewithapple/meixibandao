var express = require('express');
var router = express.Router();
let fs = require('fs');
var businessLogo =null;
var businessHead = null;
require("../public/javascripts/connectDB");
let Notice = require("../models/business");
/* GET home page. */
router.post('/', function(req, res, next) {
    let _id = req.body.id;
    let editId = req.body.editId;
    let time = new Date();
    let name = time.getTime(time);
    //根据ID查找商户
    if(_id){
        Notice.find({_id:_id},function(err,docs){
            res.json({
                success:true,
                data:docs
            })
        })
    }
    //修改
    else if(editId){
        let dataList = req.body.List;
        Notice.updateOne({_id:editId},dataList,function(err,docs){
            if(err){
                res.send(err)
            }
            else{
                res.json({
                    success:false,
                    message:"修改成功"
                })
            }
        })
    }
    //换图片
    else if(req.body.imgId||req.body.LogoId||req.body.HEADId){
        let id = req.body.imgId
        let logoId = req.body.LogoId;
        let headId = req.body.HEADId;
        var imgData = req.body.file;
        // let fileType = imgData.slice(11,15)
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        if (typeof Buffer.from === "function") {
            // Node 5.10+
          var  buf = Buffer.from(base64Data, 'base64'); 
        } else {
            // older Node versions
        var buf = new Buffer(base64Data, 'base64'); 
        }
        fs.writeFile("../meixi/public/images/"+name+".jpg", buf, function(err) {
                if(!id){
                    if(logoId){
                        businessLogo='api/public/images/'+name+".jpg";
                    }
                    if(headId){
                        businessHead='api/public/images/'+name+".jpg";
                       
                    }
                    return;
                }
                if(logoId){
                    Notice.updateOne({_id:id}, {businessUrl:[{url:'api/public/images/'+name+".jpg"}]},function(err,doc) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({
                            success:true,
                            message:"上传成功",
                            })
                        }
                        });
                }
                if(headId){
                    Notice.updateOne({_id:id}, {businessHead:[{url:'api/public/images/'+name+".jpg"}]},function(err,doc) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({
                            success:true,
                            message:"上传成功",
                            })
                        }
                        });
                }
        });
    }
    //添加
    else if(req.body.addBusiness){
    let discount = req.body.discount;
    let explain = req.body.explain;
    let detial = req.body.detial;
    console.log(businessLogo)
     let arr = new Notice({
            businessUrl:[{url:businessLogo}],
            businessHead:[{url:businessHead}],
            discount:discount,
            explain:explain,
            detial:detial
        })
        arr.save(function(err,doc){
            res.json({
                success:true,
                message:"添加成功",
                })
        })
    
    }
    //初始化
    else{
        Notice.find({},'businessUrl',function(err,doc){
            Notice.find({_id:"5d54c3d09bd6e30860acbcae"},function(err,docs){
                res.json({
                    success:true,
                    LogoList:doc,
                    data:docs
                })
            })    
        })
    }
    // for(var i =0;i<3;i++){

   
});

module.exports = router;
