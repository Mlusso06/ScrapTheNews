let Note = require("../models/notes");
let makeDate = require("../scripts/date");

module.exports = {

    //getting all the notes with that ID 
    get: function(data, cb){
        Note.find({
            _headlineId: data._id
        }, cb);
    },

    // now saving the notes being created
    save: function(data, cb) {
        let newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };

        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(doc);
                cb(doc);
            }
        });

    },
    delete: function(data, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
};