var express = require('express');
var router = express.Router();
require("../public/javascripts/connectDB");
let Notice = require("../models/business");
/* GET home page. */
router.post('/', function(req, res, next) {
        Notice.find({},'businessUrl',function(err,doc){
            Notice.find({_id:"5d5404a63ec6a823d4769c88"},function(err,docs){
                res.json({
                    success:true,
                    LogoList:doc,
                    data:docs
                })
            })    
        })
    // for(var i =0;i<3;i++){

    //     let arr = new Notice({
    //         businessUrl:[{"url":"api/public/images/cat.jpg"}],
    //         businessHead:[{"url":"api/public/images/cat.jpg"}],
    //         discount:"持卡者可在酒店餐饮消费场所可享受食品8.5折优惠（桃花源中餐厅）",
    //         explain:"桃花源中餐厅位于梅溪湖金茂豪华精选酒店二楼，提倡以新鲜食材和佐料为菜品核心的田园至餐桌理念，聚焦菜式创新和本地风味，以地道湘菜和精选粤菜飨宴四方来宾",
    //         detial:[
    //             "1.对于餐饮特别的促销活动（如圣诞大餐、年夜饭、情人节、六一儿童节、中秋节、元旦、全日餐厅各种美食节等），食品销售将按就酒店相关价格执行。",
    //             "2.以上优惠不能与其他优惠条件同时使用。",
    //             "3.餐厅海鲜、燕翅鲍、酒水、烟草及特价菜品不享受折扣。"
    //         ]
    //     })
    //     arr.save(function(err,doc){
    //         res.send(200)
    //     })
    
    // }
});

module.exports = router;
