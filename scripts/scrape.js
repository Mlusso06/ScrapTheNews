
// here are the request for the two packages to make the Headline possible using (ES6)
const request = require("request");
const cheerio = require("cheerio");

const scrape = function (cb) {

    request("https://reason.com/latest/", function(err, res, body){

    let $ = cheerio.load(body);

    let articles = [];

    $(".rcom-list-content--article").each(function(i, element){

        let head = $(element).find("h4").find("a").text().trim();
        let sum = $(element).find(".rcom-list-content--article-subhed").text().trim();
    console.log(sum);
        if(head && sum) {
            let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
            let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();

            let dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            };
            articles.push(dataToAdd);
            console.log(dataToAdd)
        }

    });

    cb(articles);
    });
};
module.exports = scrape;
