let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let business = new Schema({
    businessUrl:[{url:String}],
    businessHead:[{url:String}],
    discount:String,
    explain:String,
    detial:Array,
},
{
    collection:'business',
}
)
//导出
module.exports = mongoose.model("business",business);
