var express = require('express');
var router = express.Router();
let Notice = require("../models/numPage");
var jwt = require("jsonwebtoken");
require("../public/javascripts/connectDB");
/* GET users listing. */
router.post('/', function(req, res, next) {
  let name = req.body.name;
  let room = req.body.room;
  Notice.find({"name":{$regex:name},"room":room},function(err,docs){
    if(err){
      res.json({
        success: false,
        message: '验证失败，业主专享',
    })
    return;
    }
    if(docs!=""){
      let secretOrPrivateKey="meixibandao"
      let token= jwt.sign({"room":room},secretOrPrivateKey,{
        expiresIn: 60*60*48
      })
      res.json({
        success: true,
        message: '登录成功',
        token:token,
        data:docs
    })
    }
    else
    {
      res.json({
        success: false,
        message: '验证失败，业主专享',
    })
    }
  })
});

module.exports = router;
