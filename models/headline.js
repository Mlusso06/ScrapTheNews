let mongoose = require("mongoose");

// create a schema to hold your headline info
let Schema = mongoose.Schema;

// now build the db tables / colums object info
let headlinesSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    Summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

let Headline = mongoose.model("Headline", headlinesSchema);

module.exports = Headline;