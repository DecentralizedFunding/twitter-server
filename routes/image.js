const express = require('express');
const router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');

console.log('start');

router.get('/', function(req, res, next) {
  const options = {
    uri: `https://mobile.twitter.com/${req.query.user}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  rp(options)
    .then(($) => {
      //var url = $('.profile .avatar').find('img').html();
      var url = $('.profile').find('img').attr('src');
      var params = {'result': url};
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(params)
    })
    .catch((err) => {
      var params = {'result': err};
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(params)
    });
});

module.exports = router;
