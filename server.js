const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');

request(
    "https://dribbble.com/search/shots/popular/web-design?q=shop",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        var list = [];
        const $ = cheerio.load(html); // load HTML
        const ul = $(".shot-thumbnail").find("div > figure"); // find all images
        ul.each(function (i, el) {
          const noscript = $(el).find("noscript").first('img').html();
          const img = noscript.split('?')[0];
          const url = img.split('"')[1];// url image

          const content = noscript.split('?')[1].split('alt="')[1];
          console.log(content);

          list.push({
            url: url,
            content: content
          });
          // noscript.each(function (i, el){
          //     // const img = $(el).tagName('img');
          //     console.log($(el).children('img').eq(0).attr('src'));
          //     // const src = img.html();
          //     // list.push(src);
          // });
        });
        fs.writeFileSync('data.json', JSON.stringify(list));
      } else {
        console.log(error);
      }
    }
  );


