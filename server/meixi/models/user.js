let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let manageUser = new Schema({
    username:String,
    password:String
},
{
    collection:'manageUser',
}
)
//导出
module.exports = mongoose.model("manageUser",manageUser);
