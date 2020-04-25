let mongoose = require("mongoose");

// create a schema to hold your headline info
let Schema = mongoose.Schema;

// now build the db tables / colums object info - get info from the headline data base
let noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});

let Note = mongoose.model("Note", noteSchema);

module.exports = Note;