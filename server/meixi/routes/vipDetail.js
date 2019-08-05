var express = require('express');
var router = express.Router();
let Notice = require("../models/vipDetail");
require("../public/javascripts/connectDB");
/* GET home page. */
router.post('/', function(req, res, next) {
    if(req.body.id){
        let id = req.body.id;
        let data = req.body.List
        Notice.findByIdAndRemove({_id:id}, data,function(err,doc) {
            if (err) {
              console.log(err);
            } else {
                Notice.find({},function(err,docs){
                    if(docs){
                        let vipKnow = new Notice({
                            know:data
                        });
                        vipKnow.save(function(err,doc){ 
                            Notice.find({},function(err,docs){
                                res.json({
                                    success:true,
                                    message:"修改成功",
                                    data:docs
                                })
                            })
                        });
                    }
                })
            }
          });
    }
    else
    {
        Notice.find({},function(err,docs){
            res.json({
                success:true,
                data:docs
            })
        })
    }
    // Notice.find({},function(err,docs){
    //     if(docs){
    //         let arr = [];
    //         arr = [
    //             {
    //                 name:"特权说明",
    //                 content:"凭此会员卡，持卡者可在【长沙梅溪湖金茂豪华精选酒店】、【自由光线雪茄俱乐部】享受VIP会员服务及获得会员权益。"
    //             },
    //             {
    //                 name:"有效时期",
    //                 content:"永久有效"
    //             },
    //             {
    //                 name:"可用时段",
    //                 content:"周一至周日 全天"
    //             },
    //             {
    //                 name:"联系电话",
    //                 content:"0731 8885 8887"
    //             },
    //             {
    //                 name:"使用须知",
    //                 content:"1.从会员卡仅限梅溪湖半岛业主领取使用;2.每人限领取一张，仅用于线下现场消费;3.请务必确保填写正确信息，信息错误或虚假信息将无法使用手机号等作为会员凭证"
    //             },
    //     ]
    //         let vipKnow = new Notice({
    //             know:arr
    //         });
    //         vipKnow.save(function(err,doc){ 
    //             Notice.find({},function(err,docs){
    //                 res.json({
    //                     success:true,
    //                     message:"修改成功",
    //                     data:docs
    //                 })
    //             })
    //         });
    //     }
    // })
});

module.exports = router;
