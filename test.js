var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var app = express();

var db = mongoose.connect('mongodb://localhost/newsDb');

var appSchema = mongoose.Schema({
  title: String,
  content: String
});

appModel = mongoose.model('app', appSchema);

app.get('/', function(req, res) {
  res.send('Testing server connection');
});

app.get('/scrape', function(req, res) {
  url = 'https://www.telegraphindia.com/1170403/jsp/sports/index.jsp';

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      // $('.secondLead').filter(function() {
      //   var data = $(this);
      //   var title = data.text();
      //   console.log('The second lead titles are ', title);
      //   appModel.create({ 'title': title});
      // });

      $('.secondLead h2').each(function(i,elem){
        console.log($(this).text())
        var data = $(this);
        var title = data.text();
        appModel.create({ 'title': title});
      });

      // $('.lead').filter(function() {
      //   var data = $(this);
      //   var title = data.text();
      //   console.log('The title is ', title);
      //   appModel.create({ 'title': title});
      // });

      $('.lead h2').each(function(i,elem){
        console.log($(this).text())
        var data = $(this);
        var title = data.text();
        appModel.create({ 'title': title});
      });
      
      // $('.story').filter(function() {
      //   var data = $(this);
      //   console.log(data.children().last().text());
      //   var content = data.text();
      //   appModel.create({ 'content': content});
      // });
    }
    res.send('Extracted data from the webpage');
  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000');
});
