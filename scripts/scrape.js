
// here are the request for the two packages to make the Headline possible using (ES6)
let request = require("request");
let cheerio = require("cheerio");

const scrape = function (cb) {

    request("https://reason.com/latest/", function(err, res, body){

    const $ = cheerio.load(body);

    const articles = [];

    $(".rcom-list-content--article").each(function(i, element){

        const head = $(element).find("h4").find("a").text().trim();
        const sum = $(element).find(".rcom-list-content--article-subhed").text().trim();
    console.log(sum);
        if(head && sum) {
            const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
            const sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();

            const dataToAdd = {
                headline: headNeat,
                summary: sumNeat
            };
            articles.push(dataToAdd);
        }


    });

    cb(articles);
    });
};
module.exports = scrape;
