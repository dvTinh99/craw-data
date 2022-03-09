const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
const category = "shop";
for (let y = 1; y < 2; y++) {
  request(
    "https://dribbble.com/search/shots/popular/web-design?q="+category+"&page="+y,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        var list = [];
        const $ = cheerio.load(html); // load HTML
        const ul = $(".shot-thumbnail").find("div > figure"); // find all images
        ul.each(function (i, el) {
          const noscript = $(el).find("noscript").first('img').html();
          const img = noscript.split('?')[0];
          const url = img.split('"')[1];// url image

          var content = noscript.split('?')[1].split('alt="')[1];
          var content = content.trim().slice(0,-2);

          list.push({
            i : i,
            url: url,
            content: content
          });
        });
        fs.writeFileSync('data'+y+'.json', JSON.stringify(list));
      } else {
        console.log(error);
      }
    }
  );
}


