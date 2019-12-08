let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let business = new Schema({
    businessUrl:[{url:String}],
    businessHead:[{url:String,discount:String,explain:String,detial:String}],
},
{
    collection:'business',
}
)
//导出
module.exports = mongoose.model("business",business);
