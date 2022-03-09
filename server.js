const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
const category = "food";

fs.writeFile('data.json', '[', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

const maxPage = 20;
for (let y = 1; y <= maxPage; y++) {
  request(
    "https://dribbble.com/search/shots/popular/web-design?q="+category+"&page="+y,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); // load HTML
        const ul = $(".shot-thumbnail").find("div > figure"); // find all images
        ul.each(function (i, el) {
          const noscript = $(el).find("noscript").first('img').html();
          const img = noscript.split('?')[0];
          const url = img.split('"')[1];// url image

          var content = noscript.split('?')[1].split('alt="')[1];
          var content = content.trim().slice(0,-2);

          
          list = {
            i : y+'.'+i,
            url: url,
            content: content
          };
          var data = null ;
          // if(y  == maxPage && i == ul.length-1){
          //   console.log(y,i);
          //   data = JSON.stringify(list)
          //   fs.appendFile('data.json', data, function (err) {
          //     if (err) throw err;
          //     console.log('Saved!');
          //   });
          //   fs.appendFile('data.json', ']', function (err) {
          //     if (err) throw err;
          //     console.log('Saved!');
          //   });
          // }else{
            data = JSON.stringify(list)+','
            fs.appendFile('data.json', data, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
          // }
        });
      } else {
        console.log(error);
      }
  });
}




