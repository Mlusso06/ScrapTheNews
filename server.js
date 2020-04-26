// pulling starter code from the server.js on activity 20 scrap
let express = require("express");
// let logger = require("morgan");
let mongoose = require("mongoose");
let exphbs = require("express-handlebars");
let bodyParser = require("body-parser");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
let axios = require("axios");
let cheerio = require("cheerio");


// use the mongo deployed db, or local
// let db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//connect to the mongoose
// mongoose.connect(db, function(error){
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log("mongoose connnection is sucessful");
//     }
// });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadLines', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// setting our port, and using the .env file to hide my real port
let PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

// set up the express router

let router = express.Router();


// need to require my config router for handlebars to pass
require("./config/routes")(router);

// clean up the file directory for my static items / images
app.use(express.static(__dirname + "/public"));

// use the handlebars server set up from previous activities
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));


// make sure my request are going through the router middleware
app.use(router);










// setting up the standard server listing function
app.listen(PORT, function () {
    console.log("Listing on port http://localhost:" + PORT);
})

