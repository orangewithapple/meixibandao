var express = require('express');
var router = express.Router();
let Notice = require("../models/vipDetail");
let fs = require('fs');
require("../public/javascripts/connectDB");
/* GET home page. */
router.post('/', function(req, res, next) {
    if(req.body.vipId){
        let id = req.body.vipId;
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
   else if(req.body.imgId){
        let id = req.body.imgId;
        var imgData = req.body.file;
        let fileType = imgData.slice(11,15)
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        if (typeof Buffer.from === "function") {
            // Node 5.10+
          var  buf = Buffer.from(base64Data, 'base64'); 
        } else {
            // older Node versions
        var buf = new Buffer(base64Data, 'base64'); 
        }
        fs.writeFile("../meixi/public/images/vipCard."+fileType, buf, function(err) {
            if(err){
              res.send(err);
            }
            else{
                Notice.updateOne({_id:id}, {url:'api/public/images/vipCard.'+fileType},function(err,doc) {
                    if (err) {
                      console.log(err);
                    } else {
                      res.json({
                        success:true,
                        message:"修改成功",
                      })
                    }
                  });
            }
        });
    }
   else if(!req.body.imgId && !req.body.vipId)
    {
        Notice.find({},function(err,docs){
            res.json({
                success:true,
                message:"什么都没有",
                data:docs
            })
        })
    }
    // Notice.find({},function(err,docs){
    //     if(docs){
    //         let vipKnow = new Notice({
    //             image:'api/public/images/vipCard.png'
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
