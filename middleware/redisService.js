var redis = require('redis');


var client = redis.createClient();
client.on("error ", function (err) {
    console.log("error " + err);

});

class Redis{
    constructor(){

    }

    save(token){
        console.log("token from ",token);
        
        client.set(token,"",function(err,reply){
            if(err){
                console.log(err);
                return null;
            }
            else{
                console.log(reply);
                return reply;
            }
        })
    }
    check(token,callback){
       
        client.exists(token,function(err,reply){
        console.log(reply);

            if(err){
                console.log("error in redis service",err);
                return callback(err,reply);
            }
            else{
                if(reply){
                    console.log("token in redis\n\n\n",reply);
                    
                console.log("token is present");
                return callback(null,reply)
                // return reply;
            }
                else{
                    return false
                }
            }
        })
    }
}
var redis1 =new Redis
module.exports=redis1;