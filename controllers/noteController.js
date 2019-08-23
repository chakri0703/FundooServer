/**
 * @param       {noteService}
 * 
 * @description importing the services written in the services
 */
const noteService = require('../services/noteService');

/**
 * @function        addNote
 * 
 * @description      this function is used to add the note
 */

exports.addNote = (req, res) => {
    // console.log(req.body.payload.email);
    //setting the required data
    data = {
        "email": req.body.payload.email,
        "title": req.body.title,
        "description": req.body.description

    }
    console.log("============>", data);

    //calling the addNote service 
    noteService.addNote(data, (err, result) => {
        //if any error in seervices
        if (err) {
            let response = {
                "status": 500,
                "msg": "error in saving note",
                "data": err
            }
            console.log(err);
            res.send(response)

        }
        else {
            let response = {
                "status": 200,
                "msg": "note added sucessfully",
                "data": result
            }
            console.log(result);
            res.send(response);
        }
    })
}

/**
 * @function            noteArchive
 * 
 * @description         this function is use to archive the note
 */
exports.noteArchive = (req, res) => {
    //data required to archive the note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    //calling the service to archive the note
    noteService.noteArchive(data, (err, result) => {

        //if error in the service
        if (err) {
            let response = {
                "status": 500,
                "msg": "not able to archive",
                "data": err
            }
            console.log(err);
            res.send(response);
        }
        // if no error in the service
        else {
            let response = {
                "status": 200,
                "msg": "archived sucessfully",
                "data": result
            }
            console.log(result);
            res.send(response);
        }
    })
}

exports.noteUnArchive = (req, res) => {
    //data required to archive the note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title,
        "description":req.body.description
    }
    //calling the service to archive the note
    noteService.noteUnArchive(data, (err, result) => {

        //if error in the service
        if (err) {
            let response = {
                "status": 500,
                "msg": "not able to archive",
                "data": err
            }
            console.log(err);
            res.send(response);
        }
        // if no error in the service
        else {
            let response = {
                "status": 200,
                "msg": "archived sucessfully",
                "data": result
            }
            console.log(result);
            res.send(response);
        }
    })
}

exports.pin = (req, res) => {
    //data required to archive the note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    //calling the service to archive the note
    noteService.noteArchive(data, (err, result) => {
        //if error in the service
        if (err) {
            console.log(err);
            res.send(err);
        }
        // if no error in the service
        else {
            console.log(result);
            res.send(result);
        }
    })
}


exports.unpin = (req, res) => {
    //data required to archive the note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    //calling the service to archive the note
    noteService.noteArchive(data, (err, result) => {
        //if error in the service
        if (err) {
            console.log(err);
            res.send(err);
        }
        // if no error in the service
        else {
            console.log(result);
            res.send(result);
        }
    })
}
/**
 * @function        noteDelete
 * 
 * @description     this function is used delete the note 
 */
exports.noteDelete = (req, res) => {
    //data required to delete the note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title,
        "description": req.body.description
    }

    //calling the service to delete the note
    noteService.noteDelete(data, (err, result) => {
        if (err) {
            let response = {
                "status": 500,
                "msg": "error in deleting",
                "error": err
            }
            console.log(err);
            res.send(response);
        }
        else {
            let response = {
                "status": 200,
                "msg": "note deleted sucessfully",
                "result": result
            }
            console.log(result);
            res.send(response);
        }
    })
}

/**
 * @function        getAllNotes
 * 
 * @description     this function is used to getAll the notes 
 */
exports.getAllNotes = (req, res) => {
    //data required to getAllNotes 
    console.log(req.body.payload.email);

    data = {
        "email": req.body.payload.email

    }
    //calling the getAllNotes services
    noteService.getAllNotes(data, (err, result) => {
        if (err) {
            let response={
                status:500,
                msg:"error in getting all notes",
                data:err
            }
            console.log(err);
            res.send(response);
        }
        else {
            let response={
                status:200,
                msg:"error in getting all notes",
                data:result
            }
            console.log("getting all notes===>",result);
            res.send(response);
        }
    })
}

/**
 * @function        restore
 * 
 * @description     this function is used to restore the deleted note
 */
exports.restore = (req, res) => {
    //required data restore the deleted note
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    //calling the restore service 
    noteService.restore(data, (err, result) => {

        if (err) {
            let response = {
                stauts: 500,
                msg: "error in restoring",
                error: err
            }
            console.log("in controller");
            res.send(response)
        }
        else {
            let response = {
                stauts: 200,
                msg: "restored sucessfully",
                error: result
            }
            console.log(result + " in controller "+result);
            res.send(response);
        }
    })
}
/**
 * @function            noteReminder
 * @description         this function is used set reminder to note
 */
exports.noteReminder = (req, res) => {
    //data required Reminder to note
    console.log(req.body);

    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }
    console.log(data);

    //calling the reminder service
    noteService.noteReminder(data, (err, result) => {
        if (err) {
            let response = {
                "status": 500,
                "msg": "error in saving note",
                "data": err
            }
            console.log(err);
            res.send(response)
        }
        else {
            let response = {
                "status": 200,
                "msg": "reminder added sucessfully",
                "data": result
            }
            res.send(response)
        }
    })
}

/**
 * @function        searchNoteByTitle
 * 
 * @description     this function is used to search the note by title
 */
exports.searchNoteByTitle = (req, res) => {
    data = {
        "email": req.body.payload.email,
        "title": req.body.title
    }

    //calling the searchNoteByTitle  services
    noteService.searchNoteByTitle(data, (err, result) => {
        if (err) {
            console.log(err);
            res.send("some error in the controller")
        }
        else {
            // console.log(result);

            res.send(result);
        }
    })
}
/**
 * @function        searchNoteByDescription
 * 
 * @description     this function is used to search the note by title
 */
exports.searchNoteByDescription = (req, res) => {
    data = {
        "email": req.body.payload.email,
        "description": req.body.description
    }

    //calling the searchNoteByTitle  services
    noteService.searchNoteByDescription(data, (err, result) => {
        if (err) {
            console.log(err);
            res.send("some error in the controller")
        }
        else {
            // console.log(result);

            res.send(result);
        }
    })
}
exports.delete = (req, res) => {
    noteData = {
        "email": req.body.payload.email,
        "title": req.body.title,
        "description": req.body.description
    }
    noteService.delete(noteData, (err, result) => {
        if (err) {
            let response = {
                status: 500,
                msg: "error in deleting",
                data: result
            }
            res.send(response)
        }
        else {
            let response = {
                status: 200,
                msg: "deleted sucessfully",
                data: result
            }
            res.send(response)
        }

    })
}

exports.getAllDelete = (req, res) => {
    data = {
        'email': req.body.payload.email,
    }
    noteService.getAllDelete(data, (err, result) => {
        if (err) {
            let response = {
                status: 500,
                msg: "error",
                data: err
            }
            console.log(err);
            res.send(response)

        }
        else {
            let response = {
                status: 200,
                msg: "trashed Notes",
                data: result
            }
            console.log(result);
            res.send(response);
        }
    })
}

exports.getAllReminder = (req, res) => {
    data = {
        'email': req.body.payload.email,
        'pageNo': req.params.pageNo,
        'size': 3
    }
    noteService.getAllReminder(data, (err, result) => {
        if (err) {
            let response = {
                status: 500,
                msg: "error",
                data: err
            }
            console.log(err);
            res.send(response)

        }
        else {
            let response = {
                status: 200,
                msg: "reminder Notes",
                data: result
            }
            console.log(result);
            res.send(response);
        }
    })
}

exports.getAllArchive = (req, res) => {
    data = {
        'email': req.body.payload.email,

    }
    noteService.getAllArchive(data, (err, result) => {
        if (err) {
            let response = {
                status: 500,
                msg: "error",
                data: err
            }
            console.log(err);
            res.send(response)

        }
        else {
            let response = {
                status: 200,
                msg: "reminder Notes",
                data: result
            }
            console.log(result);
            res.send(response);
        }
    })
}

exports.updateNote=(req,res)=>{
    noteData={
        "id":req.body._id,
        "title":req.body.title,
        "description":req.body.description
    };
    noteService.updateNote(noteData,(err,result)=>{
        if(err){
            console.log("error in update note==>",err);
            let response={
                "status":500,
                "msg":"error in updating",
        
            }
            res.send(response);
        }
        else{
            console.log("result of updating note===>",result);
           let response={
               "status":200,
               "msg":"update sucessfull",
               "data":result
           }
           res.send(response); 
        }
    })
}