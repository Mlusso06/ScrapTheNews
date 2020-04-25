import scarpe from "../scripts/scrape";
import date from "../scripts/date";

let Headline = require("../models/headline");

module.exports = {
    fetch: function(cb)
    // creating teh scrape function
     {
        scarpe(function(data){
            let articles = data;
            for (var i=0; i < articles.lenghth; i++) {
                articles[i].date = makeDate();
                // setting saved to all articles to false if saved
                articles[i].saved = false;
            }

            //mongo function to take the headlin many articles
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err, docs);
            });

        })

    },

    // delete property to remove an article
    delete: function(query, cb) {
        Headline.remove(query, cb);

    },
    // all the items from the collection and sort them
    get: function(query, cb) {
        Headline.find(query).sort({
            _id: -1
        })
        .exec(function(err, doc){
            cb(doc);
        });
    },

    // update the articles 
    update: function(query, cb){
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}