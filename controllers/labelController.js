const labelService = require('../services/labelServices');

var label = new labelService();
var response = {};
let data = {}
exports.addlabel = (req, res) => {
    data = {
        'email': req.body.payload.email,
        'label': req.body.label
    };
    // var response={};

    label.createLabel(data, function (err, result) {
        if (err) {
            // throw new Error(err);
            response.status = false;
            response.message = "Label  not Added";
            response.data = err

        }
        else {
            response.status = true;
            response.message = "Label Added Sucessfully";
            response.data = result

        }
        console.log(response);

        res.send(response);
    })
}

exports.editLabel = (req, res) => {
    data = {
        "userId": req.body.payload.email,
        "label": req.body.label,
        "updateLabel": req.body.updateLabel
    }


    // var label=new labelService();

    label.editLabel(data, (err, result) => {
        if (err) {
            console.log(err);
            response.status = false;
            response.message = "error occured in controller"
            response.data = err

        }
        else {
            response.status = true;
            response.message = "sucessfully updated"
            response.data = result

            res.send(response)
        }
    })
}
exports.editAllLabel = (req, res) => {
    data = {
        "userId": req.body.payload.email,
        "label": req.body.label,
        "updateLabel": req.body.updateLabel
    }
    label.editManyLabel(data, (err, result) => {
        if (err) {
            console.log(err);
            response.status = false;
            response.message = "error occured in controller"
            response.data = err

        }
        else {
            response.status = true;
            response.message = "sucessfully updated"
            response.data = result

            res.send(response)
        }
    })
}

exports.searchLabel = (req, res) => {

    data = {
        "userId": req.body.payload.email,
        "label": req.body.label
    }

    // var label =new labelService();
    label.searchLabel(data, (err, result) => {
        if (err) {

            response.status = false
            response.message = "error in the controller"
            response.data = err
        }
        else {
            response.status = true
            response.message = "search is happened"
            response.data = result
        }
        res.send(response)
    })
}
exports.getAll = (req, res) => {

    data = {
        "userId": req.body.payload.email
    }

    // var label =new labelService();
    label.getAll(data, (err, result) => {
        if (err) {

            response.status = false
            response.message = "error in the controller"
            response.data = err
        }
        else {
            response.status = true
            response.message = "All the labels"
            response.data = result
        }
        res.send(response)
    })
}
exports.deleteLabel = (req, res) => {
    data = {
        "userId": req.body.payload.email,
        "label": req.body.label
    }

    label.deleteLabel(data, (err, result) => {
        if (err) {

            response.status = false
            response.message = "error in the controller"
            response.data = err
        }
        else {
            response.status = true
            response.message = "deleting"
            response.data = result
        }
        res.send(response)
    })
}

exports.deleteAllLabel = (req, res) => {
    data = {
        "userId": req.body.payload.email,
        "label": req.body.label
    }
    label.deleteAllLabel(data, (err, result) => {
        if (err) {
            response.status = false;
            response.message = "deleting all the labels failed" + req.body.label
            response.data = result
        }
        else {
            response.status = true
            response.message = "deleted the labels " + req.body.label
            response.data = result
        }
        res.send(response);
    })
}



exports.addLabelToNote = (req, res) => {
    data = {
        "noteId": req.body.noteId,
        "label": req.body.label,
        "userId": req.body.payload.email
    }

    label.addLabelToNote(data, (err, result) => {
        if (err) {
            response.status = 400,
                response.message = "adding note to label is not possiable",
                response.data = err
        }
        else {
            response.status = 200
            response.message = "note added to label sucessfully"
            response.data = result
        }
        res.send(response);
    })

}

exports.deleteLabelToNote = (req, res) => {
    data = {
        "noteId": req.body.noteId,
        "label": req.body.label,
        "userId": req.body.payload.email
    }

    label.deleteLabelToNote(data, (err, result) => {
        if (err) {
            response.status = 400,
                response.message = "adding note to label is not possiable",
                response.data = err
        }
        else {
            response.status = 200
            response.message = "note added to label sucessfully"
            response.data = result
        }
        res.send(response);
    })

}