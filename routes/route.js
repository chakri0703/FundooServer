/**
 * @param           {express}
 * 
 * @description     loading the express packabe to variable "express"
 */
const express = require('express')
/**
 * @param           {router}
 *@description        loading the Router functions to variable "router"
  */
const router = express.Router();
/**
 * @param           {userController}
 * 
 * @description     getting the functions in userContoller in from controller
 */
const userController = require('../controllers/userController');

/**
 * @param             {noteController}
 * @description       getting the functions in noteContller from controller
 */
const noteController = require('../controllers/noteController')
/**
 * @param           {auth}
 * 
 * @description     getting the functions in autho.js from middleware
 */
var passport = require('passport')
router.use(passport.initialize());
router.use(passport.session());
// router.use(passport);
const auth = require('../middleware/autho')
//routing to the url's,controller and middleware
// const LocalStrategy = require('passport-local').Strategy;


/**
 * these routes  are use to user data modification operations
 */

//this route used to register the user 
router.route('/register').post(userController.register);

//this route is used to verify the user email
router.route('/registerVerify/:token').get(auth.authentication, userController.saveUser)

//this route used to login the user
router.route('/login').post(userController.login);

//this is used to change  the password of the user
router.route('/forgetPassword').post(userController.forgotPassword);
//router.post('/reset',auth.authentication,userController.resetCtrl);

//this is used reset the user password after the verify the email
router.route('/reset/:token').post(auth.authentication, userController.reset);

//router.post('/short',userController.shortCtrl)
//this is used to upload the file to s3 storage
router.route('/upload').post(userController.upload);




/**
 * 
 * these Routes are used to note operations
 * 
 */
//this is used to add the note to database  
router.route('/addNote').post(auth.authentication, noteController.addNote);

// //this router is used to pin the note
// router.route('/pin').post(auth.authentication,noteController.pin)

// //this route is used to unpin the route
// router.route('/unpin').post(auth.authentication,noteController.unpin);


//this route used to the note to archive the note
router.route('/archive').post(auth.authentication, noteController.noteArchive);

//this route used to unarchive the note
router.route('/unarchive').post(auth.authentication,noteController.noteUnArchive)

//this route used to delete the note
router.route('/deleteNote').post(auth.authentication, noteController.noteDelete);

// this is used to get all the note of user by email
router.route('/getAllNotes').get(auth.authentication, noteController.getAllNotes)

//this is used to restore the notes
router.route('/restore').post(auth.authentication, noteController.restore);

//this route is used to add the reminder to note
router.route('/reminder').post(auth.authentication, noteController.noteReminder);

//this route is used to search the note based on title
router.route('/searchByTitle').post(auth.authentication, noteController.searchNoteByTitle);


//This route is used to serch the note based on description
router.route('/searchByDescription').post(auth.authentication, noteController.searchNoteByDescription);


//this route is used to get all the Archive Notes
router.route('/getAllArchive').get(auth.authentication, noteController.getAllArchive);

//this route is used to get all the Reminder Notes
router.route('/getAllReminder').get(auth.authentication, noteController.getAllReminder);
//this route is used to get all the deleted Notes
router.route('/getAllDelete').get(auth.authentication, noteController.getAllDelete);

//this route is used to delete the note permentaly 
router.route('/delete').post(auth.authentication,noteController.delete);

router.route('/updateNote').post(auth.authentication,noteController.updateNote);
/**
 * these routes used to operate with the label
 */
const labelController = require('../controllers/labelController')
//this router is used to add the label to note using the Id 
router.route('/createLabel').post(auth.authentication, labelController.addlabel);

//this router is used to get the labels by user
router.route('/getAllLabels').get(auth.authentication, labelController.getAll)
//this route is used to search the label
router.route('/editLabel').post(auth.authentication, labelController.editLabel);

//this route is used to update many labels
router.route('/editAllLabel').post(auth.authentication, labelController.editAllLabel);
//this router used to search the label
router.route('/searchLabel').get(auth.authentication, labelController.searchLabel)

//this router is used to delete the label
router.route('/deleteLabel').delete(auth.authentication, labelController.deleteLabel);

//this router is used to delete all the labels 
router.route('/deleteAll').delete(auth.authentication, labelController.deleteAllLabel)

//this route is used to add the label to note
router.route('/addLabelToNote').post(auth.authentication, labelController.addLabelToNote);

router.route('/deleteLabelToNote').delete(auth.authentication, labelController.deleteLabelToNote)
//exporting the router
module.exports = router;