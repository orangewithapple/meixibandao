var express = require('express');
var router = express.Router();
let fs = require('fs');
var businessLogo =null;
var businessHead = null;
require("../public/javascripts/connectDB");
let Notice = require("../models/business");
/* GET home page. */
router.post('/', function(req, res, next) {
    // let na = new Notice({
    //     businessUrl:[{url:"api/public/images/1565858725319.jpg"}],
    //     businessHead:
    //     [
    //         {
    //             url:"api/public/images/1565858729493.png",
    //             discount:"持卡者可在酒店餐饮消费场所可享受食品8.5折优惠（桃花源中餐厅）",
    //             explain:"桃花源中餐厅位于梅溪湖金茂豪华精选酒店二楼,;提倡以新鲜食材和佐料为菜品核心的田园至餐桌理念,;聚焦菜式创新和本地风味，以地道湘菜和精选粤菜飨宴四方来宾",
    //             detial:"对于餐饮特别的促销活动（如圣诞大餐、年夜饭、情人节、六一儿童节、中秋节、元旦、全日餐厅各种美食节等），食品销售将按就酒店相关价格执行。以上优惠不能与其他优惠条件同时使用。餐厅海鲜、燕翅鲍、酒水、烟草及特价菜品不享受折扣"
    //     },
    //     {
    //         url:"api/public/images/1565858729493.png",
    //         discount:"持卡者可享受酒店客房专属会员价，及其他定制福利",
    //         explain:"长沙梅溪湖金茂豪华精选酒店，地处国家级湘江新区核心地带，临湖而建，毗邻建筑大师扎哈·哈迪德的传世之作——梅溪湖国际文化艺术中心。;酒店以“探寻桃花源”为设计灵感，融合湖湘文化精髓，拥有300余间独具风情的客房和套房，旨为宾客打造至臻完美、圆满难忘的居住体验。;",
    //         detial:"部分房型，例如[豪华城景客房]、[尊贵城景客房]、[豪华湖景客房]、[尊贵湖景客房]、[尊贵全景客房]、[尊贵湖景套房]，拥有专属会员入住价格。入住价格包含次日免费早餐一份。高类别房型臻享水果、特饮等额外福利待遇。"
    // },
    //     ]
    // });
    // na.save(function(err,doc){
    //   console.log(doc);
    //   console.log(err);
    // })
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
