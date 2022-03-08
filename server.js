const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');

request('https://dribbble.com/search/shots/popular/web-design?q=shop', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML
    
        $('.js-thumbnail-grid shots-grid group dribbbles container-fluid is-scrolled').each((i, el) => {
            $(el).children('.shot-thumbnail js-thumbnail shot-thumbnail-container').each((i, el) => {
                $(el).children('.js-thumbnail-base shot-thumbnail-base disabled-shot-section dribbble-shot dribbble video multi-shot').each((i, el) => {
                    $(el).children('.js-thumbnail-placeholder shot-thumbnail-placeholder').each((i, el) => {
                        log($(el))
                    });
                });  
            });
        });
    }
      else {
        console.log(error);
      }
});


