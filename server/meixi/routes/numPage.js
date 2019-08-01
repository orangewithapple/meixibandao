var express = require('express');
var router = express.Router();
let Notice = require("../models/numPage");
require("../public/javascripts/connectDB");
/* GET home page. */
router.post('/', function(req, res, next) {
    let page = "1"
    let pagesize = (page-1)*10
  Notice.find({},function(err,docs){
      res.json({
          success:true,
          data:docs
      })
    }).skip(pagesize).limit(10)

// for(var i =0;i<100;i++){
//     Notice.find({},function(err,docs){
//           if(err){
//             console.log(err)
//         }
//         if(docs){
//             let numpage = new Notice({
//             name:"1",
//             room:"1"
//             })
//             numpage.save(function(err,doc){
//             });
//         }
//     })
// }
});

module.exports = router;
