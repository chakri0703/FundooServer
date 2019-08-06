/**
 * @param           {service}
 * @description     getting the services 
 */
const jwt = require('jsonwebtoken')

const redis1 = require('../middleware/redisService')

const service = require('../services/userservice')

// const userservice=new service.UserServices;
/**
 * @function            register
 * 
 * @description         used to validate the user data from server side and
 *                      calling the service register
 * 
 @returns               {res} 
 */

const upload = require('../config/aws.s3');

/**
 * @param       {bcrypt}
 * 
 * @description  loading all the package to bcrypt
 */
const bcrypt = require('bcrypt');

/**
 * @param           {redis}
 * 
 * @description     loading the package of redis to varible "redis" 
 */
var redis = require('redis');

/**
 * @param             {s3}
 * 
 * @description       loading the s3 package to variable to "S3"
 */
const S3 = require('aws-s3');

/**
 * @param           {client}
 * 
 * @description     creating the client to using the createClint() function
 */
var client = redis.createClient();
client.on("error ", function (err) {
    console.log("error " + err);

})

var data = {};
/**
 * @function        register
 * 
 * @description     used to register the user data
 */

class UserController {
    constructor() {

    }
    register(req, res) {

        console.log(req.body);

        //validating the data
        //validatind the email
        req.checkBody('email', 'invalid email').isEmail();
        //validating the name it should contain atleast 3 letters 
        req.checkBody('name', 'invalid name').isLength({ min: 3 }).isAlpha();
        //password should have atleast 8 characters
        req.checkBody('password', 'invalid Password').isLength({ min: 8 });
        var errors = req.validationErrors();
        var response = {};
        //display the errors  
        if (errors) {

            response.msg = errors[0].msg

            res.send(response);
        }
        else {

            // console.log(req.body);

            data = {
                "email": req.body.email,
                "name": req.body.name,
                "password": req.body.password
            }
            // console.log("data==>",data);

            //calling the service
            service.register(data, (err, result) => {

                if (err) {
                    console.log((err));
                    var response = {
                        text: err,
                    }
                    res.send(response);

                }
                else {
                    // console.log("Registeration Successfull");
                    response.status = 200;
                    response.msg = "Registeration sucessfull"

                    return res.send(response)
                }

            })
        }
    }
    /**
     * @function            saveUser
     * 
     * @description         used to store the user data after verification
     */
    saveUser(req, res) {

        data = {
            "email": req.body.payload.email
        }
        var response = {};
        service.saveUser(data, (err, result) => {

            if (err) {
                response.status = 500;
                response.msg = "error";
                response.text = err;
                console.log(err);
                res.send(response);
            }
            else {
                response.status = 200;
                response.msg = "User Verified Sucessfully"

                res.send(response);
            }
        })
    }

    /**
     * @function            login
     * 
     * @description         used to validate the user data from server side and
     *                      calling the service login
     * 
     @returns               {res} 
     */
    login(req, res) {

        var data =
            //validating the user data
            // validating the user email
            req.checkBody('email', 'invalid email').isEmail();
        //validating the user password
        req.checkBody('password', 'invalid password').isLength({ min: 8 });

        var errors = req.validationErrors();
        //displaying the errors
        if (errors) {
            let response = {};
            response.status = 500;
            response.msg = "error in " + errors[0].msg
            console.log("error in ", errors[0].msg);
            res.send(response);


        }
        else {
            //calling the login service

            // getting the all the elements in object  
            // 'LOGIN_TOKEN_' + req.body.email 
            console.log(req.body);

            let key = toString(req.body.email);
            client.hgetall(key, function (err, reply) {
                // console.log("\n\n\n in client get function\n\n\n");

                //checking for error
                if (err) {
                    // console.log("\n\n\n"+err+"\n\n\n");
                    // console.log("error in hgetall",err);
                    res.send(err)

                }
                else {
                    // console.log("\n\n\n"+reply+"\n\n\n");
                    // console.log(reply);

                    //if the email present in the redis cache
                    if (reply != null) {
                        // console.log(reply);

                        // the bcrypt password with user entered password
                        bcrypt.compare(req.body.password, reply.password, (error, result) => {
                            // console.log("\n\n\n in controller bcrypt\n\n\n");

                            // console.log(reply);

                            if (error) {


                                var response = {
                                    status: 500,
                                    msg: "invalid password"
                                }

                                console.log("error ", error);


                                res.send(response);

                            }
                            else {
                                console.log(reply);
                                if (!result) {

                                    //console.log(result);
                                    console.log("invalid password");

                                    res.send("invalid password");
                                }
                                else {
                                    var token = jwt.sign(reply, process.env.SECRETKEY);
                                    redis1.save(token)
                                    // console.log(reply);
                                    var response = {
                                        status: 200,
                                        email: reply.email,
                                        name: reply.name,
                                        token: token
                                    }

                                    console.log("logged in as " + reply.name);
                                    res.send(response)
                                }

                            }
                        })
                    }
                    else {

                        data = {
                            "email": req.body.email,
                            "password": req.body.password
                        }
                        //if the user details not in redis
                        console.log("data in controller=====>", data);

                        service.login(data, (err, result) => {
                            console.log("service data=>>>>>>.", data);

                            if (err) {
                                res.send("error " + err);
                            }
                            else {
                                var response = {
                                    status: 200,
                                    email: result.email,
                                    name: result.name,
                                    token: result.token
                                }

                                console.log(response);

                                res.send(response);
                            }
                        })
                    }
                }
            })


        }
    }
    /**
     * @function            forget
     * 
     * @description         used to validate the user data from server side and
     *                      calling the service forget
     */
    forgotPassword(req, res) {

        console.log("forget controller");
        //calling the services of forg

        data = {
            "email": req.body.email
        }
        console.log("==============================================");
        let response = {};
        service.forgotPassword(data, (err, result) => {
            if (err) {
                console.log("errr in forget controller====>", err);

                res.send(err)
            }
            else {
                response.status = 200;
                response.msg = "check your email for reset link";
                response.data = result;
                res.send(response);
            }
        })

    }
    /**
     * @function            reset
     * 
     * @description         used to validate the user data from server side and
     *                      calling the service reset
     * 
     @returns               {res} 
     */
    reset(req, res) {

        //validating the entered email is valid or not
        // req.checkBody('email','invalid email').isEmail();
        req.checkBody('password', 'invalid password').isLength({ min: 8 });


        var errors = req.validationErrors();
        //displaying the errors
        if (errors) {
            let response = {};
            response.status = 500;
            response.msg = "error " + errors[0].msg
            console.log(errors[0].msg);
            res.send(response);
        }
        else {
            data = {
                "email": req.body.payload.email,
                "updatePassword": req.body.password
            }
            console.log("dataa=>>>>>", data);
            //calling the reset service
            let response = {}
            service.reset(data, (err, result) => {
                if (err) {
                    response.status = 500;
                    response.msg = "error"
                    console.log(err);

                    res.send("error " + response);

                }
                else {
                    response.status = 200;
                    response.msg = "password changed Sucessfuly"
                    res.send(response);
                }
            })
        }
    }


    /**
     * @function        upload
     * 
     * @description     used to store the files in aws-s3 , this call the function upload
     *                   present in the aws.s3.js file 
     */
    upload(req, res) {
        /**
         * used to store the result
         */
        let responseResult = {}


        try {
            //copying the function to singleUpload variable 
            const singleUplaod = upload.single('image')
            //calling the function which is presentg in aws.se.js
            singleUplaod(req, res, function (err) {

                //checking for the errors 
                if (err) {

                    console.log("error in controllers  " + err)
                    responseResult.err = err;
                    responseResult.status = false;
                    res.status(500).send(responseResult)

                }
                // if no errors then the file is uploaded sucessfully
                else {
                    res.status(200).send("uploaded sucessfully")

                }
            })

        }/**to handle the errors in the try block */catch (err) {
            console.log(err);

            responseResult.err = err;
            responseResult.status = false;
            res.status(500).send(responseResult)
        }
    }
}
var ruewr = new UserController()
module.exports = ruewr;