const Label = require('../app/modules/labelModule')

const label = new Label();

class LabelService {

    constructor() {

    }


    async createLabel(data, callback) {
        // const label = new Label();
        console.log("services data ", data);

        await label.create(data, (err, result) => {
            if (err) {
                throw new Error(err);
            }
            else {
                callback(null, result);

            }
        })
    }

    editLabel(data, callback) {
        var update = { $set: { "label": data.updateLabel } };
        label.update(data, update, (err, result) => {

            if (err) {
                console.log("err in service", err);

                callback(err, result);
            }
            else {
                callback(null, result);
            }
        })
    }

    editManyLabel(data, callback) {
        label.updateAll(data, (err, result) => {

            if (err) {
                console.log("err in service", err);

                callback(err, result);
            }
            else {
                callback(null, result);
            }
        })
    }
    getAll(data, callback) {
        // const label=new Label();
        label.getAll(data, (err, result) => {
            if (err) {
                console.log("error in service", err);
                callback(err, result);
            }
            else {
                callback(null, result);
            }
        })
    }
    searchLabel(data, callback) {
        // const label=new Label();
        label.get(data, (err, result) => {
            if (err) {
                console.log("error in service", err);
                callback(err, result);
            }
            else {
                callback(null, result);
            }
        })
    }

    deleteLabel(data, callback) {
        label.delete(data, (err, result) => {
            if (err) {
                callback(err, result);
            }
            else {
                callback(null, result);
            }
        })
    }
    deleteAllLabel(data, callback) {
        label.deleteAll(data, (err, result) => {
            if (err) {
                console.log(err);
                callback(err, result);
            }
            else {
                callback(null, result)
            }
        })
    }

    addLabelToNote(data, callback) {
        let updateField = { $addToSet: { "notes": data.noteId } }
        label.update(data, updateField, (err, result) => {
            if (err) {
                console.log(err);
                callback(err, result)
            }
            else {
                callback(null, result);
            }
        })
    }
    deleteLabelToNote(data, callback) {
        //    label.get()

        let updateField = { $pull: { notes: { $in: [data.noteId] } } }
        label.update(data, updateField, (err, result) => {
            if (err) {
                console.log(err);
                callback(err, result)
            }
            else {
                callback(null, result);
            }
        })
    }



}

module.exports = LabelService;