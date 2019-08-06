/**
 * @param       {model}
 * 
 * @description loading the models from model.js
 */
const userModule = require('../app/modules/module');

//var module = new userModule();

class UserServices {
    constructor() {

    }

    /**
 * @function    register
 * 
 * @description used to call the register model
 */

    register(data, callback) {

        //calling the register model
        userModule.create(data, (err, result) => {
            if (err) {
                //sending the errors to controller to display
                return callback(err);
            }
            else {
                //sending the result to controller with 0 errors 
                return callback(null, result);
            }

        })
    }
    /**
     * @function    saveUser
     * 
     * @description     used to call the saveUser model
     */
    saveUser(data, callback) {


        userModule.saveUser(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result);

            }
            else {
                return callback(null, result);
            }

        })
    }

    /**
     * @function    login
     * 
     * @description used to call the login model
     */
    login(data, callback) {

        //calling the login model

        userModule.login(data, (err, result) => {
            if (err) {
                //sending the errors to controller to display
                return callback(err, result)
            }
            else {
                //sending the result to controller with 0 errors
                return callback(null, result)
            }
        })
    }

    /**
     * @function    forget
     * 
     * @description used to call the forget model
     */
    forgotPassword(data, callback) {
        console.log("forgetpassword services==================================");
        userModule.forgotPassword(data, (err, result) => {
            if (err) {
                console.log("error in services =>>>.", err);

                return callback(err);
            }
            else {
                return callback(null, result);
            }
        })
    }
    /**
     * @function    reset
     * 
     * @description used to call the reset model
     */
    reset(data, callback) {

        //calling the reset model
        userModule.reset(data, (err, result) => {
            if (err) {
                //sending the errors to controller to display
                return callback(err, result);
            }
            else {
                //sending the result to controller with 0 errors
                return callback(null, result);
            }
        })
    }
}

var userServices123 = new UserServices()
module.exports = userServices123;