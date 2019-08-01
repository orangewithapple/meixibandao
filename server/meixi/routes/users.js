var express = require('express');
var router = express.Router();
let Notice = require("../models/user");
require("../public/javascripts/connectDB");
require("../api/user")
/* GET users listing. */
router.post('/', function(req, res, next) {
  let userName = req.body.username;
  let passWord = req.body.password;
  Notice.find({username:userName,password:passWord},function(err,docs){
    console.log(docs)
    if(docs!=""){
      res.json({
        success: true,
        message: '登录成功',
    })
    }
    else
    {
      res.json({
        success: false,
        message: '请使用管理员账户登录',
    })
    }
  })
});

module.exports = router;
