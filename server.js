const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');

request('https://dribbble.com/search/shots/popular/web-design?q=shop', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        var list = [];
        const $ = cheerio.load(html); // load HTML
        const ul = $('.shot-thumbnail').find('div > figure'); // find all images
        ul.each(function (i, el){
            const noscript = $(el).find('noscript');
            noscript.each(function (i, el){
                // const img = $(el).tagName('img');
                console.log($(el).first().html());
                // const src = img.html();
                // list.push(src);
            });
        });
        console.dir(list);
    }
    else {
    console.log(error);
    }
});


