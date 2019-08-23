/**
 * @param           {noteModule}
 * @description     importing the note module from the noteModule.js
 */
const noteModule = require('../app/modules/noteModule');

class NoteServices {
    constructor() {

    }
    /**
     * @function          addNote
     * 
     * @description     this service used to call the module
     */
    addNote(data, callback) {

        //calling the addNotes Module
        noteModule.addNotes(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result);
            }
            else {
                return callback(null, result)
            }
        })
    }

    /**
     * @function         noteArchive
     * 
     * @description      this function is used to call the noteArchine module
     */
    noteArchive(data, callback) {
        //calling the note Module to archive 
        noteModule.noteArchive(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result)
            }
            else {
                console.log(result);
                return callback(null, result)
            }
        })
    }

    noteUnArchive(data, callback) {
        //calling the note Module to archive 
        noteModule.noteUnArchive(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result)
            }
            else {
                console.log(result);
                return callback(null, result)
            }
        })
    }

    /**
     * @function        noteDelete
     * 
     * @description     this is used to delete the note
     */
    noteDelete(data, callback) {
        //calling the delete note module
        noteModule.noteDelete(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result)
            }
            else {
                console.log(result);
                return callback(null, result)
            }
        })
    }

    /**
     * @function        getAllNotes
     * 
     * @description     this service is used to get All the notes  
     */
    getAllNotes(data, callback) {
        //calling the getAllNotes module
        noteModule.getAllNotes(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result)
            }
            else {
                console.log(result);
                return callback(null, result)
            }
        })
    }

    /**
     * @function        restore
     * 
     * @description     this service is used to restore the deleted note
     */
    restore(data, callback) {
        //calling the restore  module
        noteModule.restore(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result);
            }
            else {
                console.log("result ===>",result);
                
                return callback(null, result)
            }
        })
    }

    /**
     * @function        noteReminder
     * 
     * @description     this service is used to set note Reminder
     */
    noteReminder(data, callback) {

        //calling noteReminder module
        noteModule.noteReminder(data, (err, result) => {
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
     * @function         searchNoteByTitle
     * 
     * @description      this is used to search note by title
     */
    searchNoteByTitle(data, callback) {

        //calling the searchNoteByTitle service

        noteModule.searchNoteByTitle(data, (err, result) => {
            // if any error in the module
            if (err) {
                return callback(err, result);
            }
            else {
                return callback(null, result);
            }
        })
    }

    delete(data, callback) {

        noteModule.delete(data, (err, result) => {

            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                console.log(result);
                callback(null, result);
            }
        })
    }

    /**
     * @function         searchNoteByDescription
     * 
     * @description      this is used to search note by title
     */
    searchNoteByDescription(data, callback) {

        //calling the searchNoteByTitle service

        noteModule.searchNoteByDescription(data, (err, result) => {
            // if any error in the module
            if (err) {
                return callback(err, result);
            }
            //if no error present sucessful callback
            else {
                return callback(null, result);
            }
        })
    }

    getAllDelete(data, callback) {

        noteModule.getAllDelete(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result)
            }
            else {
                console.log(result);
                return callback(err, result);
            }
        })
    }

    getAllArchive(data, callback) {

        noteModule.getAllArchive(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result)
            }
            else {
                //console.log(result);
                return callback(err, result);
            }
        })
    }

    getAllReminder(data, callback) {

        noteModule.getAllReminder(data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, result)
            }
            else {
                //console.log(result);
                return callback(err, result);
            }
        })
    }

    updateNote(noteData, callback) {

        noteModule.noteUpdate(noteData, (err, result) => {
            if (err) {
                console.log("error in update note service==>", err);
                callback(err);
            }
            else {
                callback(null,result);
            }

        })
    }
}

var noteService = new NoteServices;
module.exports = noteService;