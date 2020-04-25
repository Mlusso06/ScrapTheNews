
// require the scrape sript to run
let scrape = require("../scripts/scrape");
// now bring in the two controller
let headlinesController = require("../controllers/headlines");
let notesController = require("../controllers/notes");


module.exports = function (router) {
    // redender to the home page
    router.get("/", function (req, res) {
        res.render("home");
    });

    // render the saved articles
    router.get("/saved", function (req, res) {
        res.render("saved");
    });
    // now we will fetch the with fuction to let me know that there are new articles, or not.
    router.get("/api/fetch", function (req, res) {
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today.  Check back tomorrow!!!"
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " New articles!!"
                });
            }
        });
    });
    // now get headlines, but allows you the user to pick a saved article
    router.get("/api/headlines", function (req, res) {
        let query = {};
        if (req.query.saved) {
            query = req.query;
        }
        headlinesController.get(query, function (data) {
            res.json(data);
        });
    });
    // going to delete based on the headlines ID to control which one
    router.delete("/api/headlines/:id", function (req, res) {
        let query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    // update articles as needed
    router.patch("/api/headlines", function(req, res){
        headlinesController.update(req.body, function(err, data){
            res.json(data);
        });
    });
router.get("/api/notes/:headlines_id?", function(req, res){
    let query = {};
    if (req.params.headlines_id) {
        query._id = req.params.headlines_id;
    }
    notesController.get(query, function(err, data){
        res.json(data);
    });
});
router.delete("/api/notes/:id", function(req, res) {
    let query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err, data){
        res.json(data);
    });
});
// using the users notes and post it to the location with help
router.post("/api/notes", function(req, res){
    notesController.save(req.body, function(data){
        res.json(data);
    });
});

}