var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res) {
  res.send('Testing server connection');
});

app.get('/scrape', function(req, res) {
  url = 'https://www.telegraphindia.com/1170403/jsp/sports/index.jsp';

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var title, description;

      var json = {title: "", description: ""};
      $('.secondLead').filter(function() {
        var data = $(this);
        title = data.text();

        json.title = title;
      });

    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    });

    res.send('Check your console');
  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000');
});
