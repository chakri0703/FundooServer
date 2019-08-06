const mongoose = require('mongoose');

const tokenModel = mongoose.Schema({

    token: {
        type: String,
        required: [true, "token is required"]
    }
   

});

const token = mongoose.model("token", token);

class Token{
    constructor(){
       
    }

    save(data){
        const newToken=new token({
            'token':data.token
        })
        newToken.save((err,result)=>{
            if(err){
                console.log(err);
                
            }
        })
    }
}