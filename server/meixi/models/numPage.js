let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let numPage = new Schema({
    name:Array,
    room:Array,
    id:String
},
{
    collection:'numPage',
}
)
//导出
module.exports = mongoose.model("numPage",numPage);
