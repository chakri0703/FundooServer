/**
 * express getting express package to variable "express"
 */
const express = require('express');
/**
 * @param           {bodyParser}
 * 
 * @description     getting the package to variable " bodyParser"
 */
const bodyParser = require("body-parser");
const redis = require('redis');
var client = redis.createClient();

client.on("err", function (err) {
    if (err) {
        console.log(err);
    }

})
var passport = require('passport');
require('dotenv').config();


const cors = require('cors')
const mongoose = require('mongoose');
//importing router from route.js in routes 
const route = require('../serverSide/routes/route')
//loading express-validator package
const expressValidator = require('express-validator')
//loading all the express functions to app
const app = express();
// app.defaultConfiguration(function() {
//     app.use(express.static('public'));
//     app.use(express.cookieParser());
//     app.use(express.bodyParser());
//     app.use(express.session({ secret: 'keyboard cat' }));
//     app.use(passport.initialize());
//     app.use(passport.session());
//     app.use(app.router);
//   });
//it is used to read the data to json formate
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors())
//using express validator throught the function
var validate = expressValidator();
app.use(validate);
app.use('/', route)


// connecting the to mongo
const dbConfig = require('./config/config')
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


/**
 *  DeprecationWarning: Mongoose: findOneAndUpdate() and findOneAndDelete() without 
 * the useFindAndModify option set to false are deprecated. 
 */
// to avoid the above warning we will  use findOneAndUpdate query and setting the below thing
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//localhost setting to port 3000 in .env file
const port = process.env.PORTS
// console.log(process.env.PORTS);


//starting the server 
var server = app.listen(port, () => {
    console.log("server is up at " + port);
    client.flushall();
})




module.exports = server;