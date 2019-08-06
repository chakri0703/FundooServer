/**
 * @param           {jwt}
 * @description     loading the jsonwebtoken 
 */
const jwt = require('jsonwebtoken')
/**
 * @function        authentication
 * 
 * @description     USED TO VERIFY THE TOKEN 
 */

const redisService=require('../middleware/redisService')

// var redis=new redisService();
exports.authentication = (req,res,next) => {
   console.log("autho");
   
    // console.log("response.body",req.body)
    console.log("headers",req.headers)
    var token =req.params.token||req.header('token')
    // var validate=true;

    console.log("autho token",token);
    if (token != null) {
        //verifying the token

        // // redisService.check(token,(err,result)=>{
        // //     if(err){
        // //         console.log(err);
        // //         res.send(err)
        // //     }
        // //     else{
        //         console.log("in autho result",result);
        //         // console.log(result);
        //         if(result===1){
        //             validate=true;
        //         }
        //         else{
        //             validate=false
        //         }
        //     }
        // }
        
        // if(validate){

        
        jwt.verify(token,'secret',(err, payload) => {
            let responseResult = {}

            if (err) {
                console.log("in auth err",err)
                responseResult.err = err;
                responseResult.status = false;
                // res.status(500).send(responseResult)
                //next(responseResult);
            }
            else {
                console.log("in auth payload")
                // console.log(payload);
                req.body.payload= payload;
              
                
                // console.log(req.body.payload)
                // console.log("authentication token successful",payload);
                next();
            }
        })
    }
   

    else {
        res.status(500).send({
            success: false,
            message: 'No token provided.'
            
        });
    }
}