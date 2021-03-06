var express = require('express');
var router = express.Router();
let Notice = require("../models/numPage");
require("../public/javascripts/connectDB");
/* GET home page. */
router.post('/', function(req, res, next) {
    let id = req.body.id;
    let name = req.body.name;
    let room = req.body.room;
    if(id){
        if(id=="add"){
    Notice.find({},function(err,docs){
        let date = new Date();
        let time = date.getTime(date)
        if(docs){
            let numpage = new Notice({
                name:name,
                room:room,
                id:time
            });
            numpage.save(function(err,doc){ 
                res.json({
                    success:true,
                    message:"添加成功",
                })
            });
        }
        
    })
    
        }
        else{
            Notice.updateOne({_id:id},{$set:{name:name,room:room}}, function(err,doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                    success:true,
                    message:"修改成功",
                    })
                console.log(doc)
                }
                });
        }
    }
    else
    {
        let page = req.body.page;
        let pagesize = (page-1)*15;
        let total = "";
        Notice.count({},function(err,count){
            total = count
        })
        Notice.find({},function(err,docs){
            res.json({
                success:true,
                total:total,
                data:docs
            })
        }).skip(pagesize).limit(15)
    } 
// for(var i =0;i<100;i++){
//     Notice.find({},function(err,docs){
//           if(err){
//             console.log(err)
//         }
//         if(docs){
//             let numpage = new Notice({
//             name:"1",
//             room:"1"
//             numpage.save(function(err,doc){
//             });
//         }
//     })
// }

});

module.exports = router;
