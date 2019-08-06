

const mongoose = require('mongoose');

const labelModel = mongoose.Schema({

    userId: {
        type: String,
        required: [true, "note id is required"]
    },
    label: {
        type: String,
        required: [true, "label is required"]
    },
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'notes'
    }]

});
const label = mongoose.model("label", labelModel);

class Label {
    constructor() {

    }
    /****
     * @param {cerate } 
     *  
     */
    async create(data, callback) {
        console.log("model data", data);

        const newLabel = new label({
            'userId': data.email,
            'label': data.label
        });
        console.log("data ", newLabel);

        newLabel.save((err, result) => {
            if (err) {
                throw new Error(err);

            }
            else {
                callback(null, result)
            }

        })
    }

    async   update(data,updateField,callback) {

        await label.updateOne({ "userId": data.userId, "label": data.label },updateField)
            .exec(function (err, result) {
                if (err) {
                    console.log("error in upadte module ", err);
                    callback(err, result);
                }
                else {
                    console.log(result.nModified === 0);

                    if (result) {
                        callback(null, "already Updated")
                    }
                    else {
                        callback(null, result)
                    }
                }
            })


    }

    async updateAll(data, callback) {
    
       await label.updateMany({ "userId": data.userId, "label": data.label }, { $set: { "label": data.updateLabel } })
            .exec(function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, result);
                }
                else {
                    if (result.nModified === 0) {
                        callback(null, "nothing to update");

                    }
                    else {
                        callback(null, result.nModified);
                    }
                }
            })
    }
    get(data, callback) {
        label.find({ "userId": data.userId, "label": data.label }, (err, result) => {

            if (err) {
                console.log("err in module ", err);
                callback(err, result);
            }
            else {
                console.log(result);

                if (result.length === 0) {
                    callback(null, "no such label");
                }
                else {
                    callback(null, result);
                }
            }
        })
    }

    getAll(data, callback) {
        console.log(data.userId);

        label.find({ "userId": data.userId }, (err, result) => {
            console.log(result);

            if (err) {
                console.log(err);
                callback(err, result)
            }
            else {
                if (result.length === 0) {
                    console.log("no label is present for this user");
                    callback(null, "no label is present for this user")
                }
                else {
                    callback(null, result)
                }
            }
        })
    }
    delete(data, callback) {

        label.deleteOne({ "userId": data.userId, "label": data.label }, (err, result) => {
            if (err) {
                console.log(err);
                callback(err, result);
            }
            else {
                console.log(result);
                callback(null, result)
            }
        })
    }

    deleteAll(data, callback) {
        label.deleteMany({ "userId": data.userId, "label": data.label }, (err, result) => {
            if (err) {
                console.log(err);
                callback(err, result);
            }
            else {
                if (result.deletedCount === 0) {
                    console.log("nothing to delete");
                    callback(null, "nothig to delete")
                }
                else {
                    console.log("delete count", result.deletedCount);
                    callback(null, result.deletedCount);
                }
            }
        })
    }

   
}
module.exports = Label;