let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let vipDetail = new Schema({
    know:
    [
        {
        name:String,
        content:String
        }
    ]
   
},
{
    collection:'vipDetail',
}
)
//导出
module.exports = mongoose.model("vipDetail",vipDetail);
