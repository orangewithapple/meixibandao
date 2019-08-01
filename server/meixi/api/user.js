let Notice = require("../models/user");
function insert(){
    Notice.find({},function(err,docs){
        if(err){
            console.log(err)
        }
        if(docs){
            if(docs==""){
                  let admin = new Notice({
                    username:"admin",
                    password:"meixibandao2019"
                  })
                  admin.save(function(err,doc){
                    //   mongoose.connection.close()
                  });
            }
            else{
                return;
            }
        }
       
    })
   
}
insert();