/**
 * @param           {mongoose}
 * @description      loading all the package to variable "mongoose"
 */
const mongoose = require('mongoose');

/**
 * making the fundoo to  mongoose.Schema
 */
const fundooNotes = mongoose.Schema({


    /**
     * @param       {email}
     * @description using the email to store the notes for a particular person
     */
    email: {
        type: String,
        required: [true, "email is required "]
    },
    /**
     * @param       {title}
     * 
     * @description title for any note is compulsary
     */
    title: {
        type: String,
        default: ""
    },
    /**
     * @param       {description}
     * 
     * @description   description of the note
     */
    description: {
        type: String,
        default: ""
    },
    /**
     * @param           {isReminder}
     * 
     * @description setting this variable for setting the reminder 
     *              by default it is false
     */
    isReminder: {
        type: Boolean,
        default: false
    },
    /**
     * @param           {isDeleted}
     * 
     * @description     setting this variable to make the note deleted
     *                     by default it is false
     */
    isDeleted: {
        type: Boolean,
        default: false
    },
    /**
     * @param           {isArchive}
     * 
     * @description     setting this variable to make the note Archive
     *                  By default it is false
     *     
     */
    isArchive: {
        type: Boolean,
        default: false
    },
    ispinned: {
        type: Boolean,
        default: false
    }

});
/**
 * @param          {notes}
 * @description     making note as collection in the fundoo database
 */
const note = mongoose.model("notes", fundooNotes);

class NoteModules {
    constructor() {

    }

    /**
     * @function            getAllNotes
     * 
     * @description         getting all the notes of all the user based on email 
     */
    getAllNotes(body, callback) {
        note.find({ "email": body.email, "isArchive": false, "isDeleted": false }, function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                if (result.length === 0) {
                    console.log("no notes present");
                    callback(null, result);
                }
                else {
                    console.log(result);
                    callback(null, result)
                }
            }
        })
    }

/**
 * @function            addNotes
 * 
 * @description         this is used to add the new notes in the database 
 *                      
 */addNotes(body, callback) {


        const newNote = new note({
            "email": body.email,
            "title": body.title,
            "description": body.description
        });
        //saving the note
        newNote.save((err, res) => {
            if (err) {
                console.log(err);
                return callback(err, res);
            }
            else {
                console.log("note saved sucessfully");
                return callback(null, res);
            }
        })
    }




    /**
     * @function        noteArchive
     * 
     * @description     this function is used Archive the note
     */
    noteArchive(body, callback) {

        //finding the note to archive by email and title
        note.findOne({ "email": body.email, "title": body.title },
            (err, result) => {
                // if getting while updating
                if (err) {
                    console.log(err);
                    return callback(err, result);
                }
                else {
                    //is rresult is not empty
                    if (result) {
                        //  console.log(result);
                        //is it is not archived it is false
                        if (result.isArchive === false) {
                            //upadte isArchiv to true
                            note.updateOne({ "email": result.email, "title": result.title }, { $set: { "isArchive": true } }, (error, res) => {
                                //any error while updating
                                if (error) {
                                    //if error are while  updataing 
                                    console.log(error);
                                    return callback(error, result)
                                }

                                else {
                                    //note Archived sucessfully
                                    console.log("Note Archived Sucessfully");
                                    return callback(null, "Note Archived Sucessfully");

                                }
                            })
                        }

                        else {
                            //if isArchive is already then it is updated 
                            console.log("failed to update to archive");
                            return callback(null, "Already Note archive");
                        }
                    }

                    else {
                        //if email or title are invalid
                        return callback(null, "email or title invalid");


                    }
                }

            })

    }

    /**
     * @function        noteDelete
     * @description     this is the function to delete the note by making the isdelete the 
     *                  update to true
     */

    noteDelete(body, callback) {


        note.updateOne({ "email": body.email, "title": body.title, "isDeleted": false, "description": body.description }, { $set: { "isDeleted": true } }, (error, res) => {
            //any error while updating
            if (error) {
                //if error are while  updataing 
                console.log(error);
                return callback(error, result)
            }

            else {
                console.log("checking ===========>", res);

                //note Archived sucessfully
                console.log("Note Deleted Sucessfully");
                return callback(null, "Note deleted Sucessfully");

            }
        })
    }







    /**
     * @function        restore
     * 
     * @description     this function is used restore the deleted data
     */

    restore(body, callback) {


        note.findOne({ "email": body.email, "title": body.title }, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result);
            }
            else {
                // console.log(result);

                if (result) {
                    note.updateOne({ "email": result.email }, { $set: { "isDeleted": false } }, (err, res) => {
                        if (err) {
                            console.log(err);
                            return callback(err, result);
                        }
                        else {
                            console.log("updated sucessfully");
                            return callback(null, "Restored Sucesfully");
                        }
                    })
                }
                else {
                    console.log("invalid email or title");
                    return callback(null, "invalid email or title");

                }
            }
        })
    }
    /**
    * @function        noteReminder
    * 
    * @description     this function is used Archive the note
    */
    noteReminder(body, callback) {

        //finding the note to archive by email and title
        note.findOne({ "email": body.email, "title": body.title },
            (err, result) => {
                // if getting while updating
                if (err) {
                    console.log(err);
                    return callback(err, result);
                }
                else {
                    //is rresult is not empty
                    if (result) {
                        //  console.log(result);
                        //is it is not archived it is false
                        if (result.isReminder === false) {
                            //upadte isArchiv to true
                            note.updateOne({ "email": result.email, "title": result.title }, { $set: { "isReminder": true } }, (error, res) => {
                                //any error while updating
                                if (error) {
                                    //if error are while  updataing 
                                    console.log(error);
                                    return callback(error, result)
                                }

                                else {
                                    //note Archived sucessfully
                                    console.log("Reminder added Sucessfully");
                                    return callback(null, "Reminder added Sucessfully");

                                }
                            })
                        }

                        else {
                            //if isArchive is already then it is updated 
                            console.log("failed to add Reminder");
                            return callback(null, "Reminder already Added");
                        }
                    }

                    else {
                        //if email or title are invalid
                        return callback(null, "email or title invalid");


                    }
                }

            })

    }

    /**
     * @function            searchNoteByTitle
     * 
     * @description         this function is used to search the note using the 
     *                          title oif the  note
     */

    searchNoteByTitle(body, callback) {

        //finding the note by title

        note.find({ "email": body.email, "title": { $regex: body.title } }, (err, result) => {
            //if any error while executing the query
            if (err) {
                console.log(err);
                return callback(err, result);
            }
            else {
                if (result.length === 0) {
                    console.log("no such title exists");
                    return callback(null, "no such title exists");
                }
                else {
                    console.log(result);
                    return callback(null, result);

                }
            }
        })

    }

    delete(noteData, callback) {
        note.findOneAndDelete({ "email": noteData.email, "title": noteData.title, "description": noteData.description }, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            else {
                console.log(result);
                callback(null, result);
            }
        })
    }
    /**
    * @function            searchNoteByDescription
    * 
    * @description         this function is used to search the note using the 
    *                          title oif the  note
    */

    searchNoteByDescription(body, callback) {

        //finding the note by title
        // /.*m.*/

        note.find({ "email": body.email, "description": { $regex: body.description } }, (err, result) => {
            //if any error while executing the query
            if (err) {
                console.log(err);
                return callback(err, result);
            }
            else {
                //if that description is not present in the notes
                if (result.length === 0) {
                    console.log("no such description exists");
                    return callback(null, "no such description exists");
                }
                //note present with that description
                else {
                    console.log(result);
                    return callback(null, result);

                }
            }
        })

    }

    getAllArchive(body, callback) {

        var limit = parseInt(body.size);
      
        note.find({ 'email': body.email, 'isArchive': true })
            .exec(function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(err, result);
                }
                else {
                    if (result.length === 0) {
                        console.log("page or data doesn't exist");
                        return callback(null, result)
                    }
                    else {
                        console.log(result);
                        return callback(null, result);

                    }
                }
            })
    }

    getAllDelete(body, callback) {

        var limit = parseInt(body.size);
       
        note.find({ 'email': body.email, 'isDeleted': true })
            .exec(function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(err, result);
                }
                else {
                    if (result.length === 0) {
                        console.log("no deleted Notes");
                        return callback(null,"no deleted Notes Present")
                    }
                    else {
                        console.log(result);
                        return callback(null, result);

                    }
                }
            })
    }

    getAllReminder(body, callback) {

        var limit = parseInt(body.size);
        var skip = parseInt(body.pageNo);
        var pageNo = limit * (skip - 1);
        note.find({ 'email': body.email, 'isReminder': true }).skip(pageNo).limit(limit)
            .exec(function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(err, result);
                }
                else {
                    if (result.length === 0) {
                        console.log("page or data doesn't exist");
                        return callback(null, result)
                    }
                    else {
                        console.log(result);
                        return callback(null, result);

                    }
                }
            })
    }
}

var noteModule = new NoteModules();
module.exports = noteModule;