var express = require("express");
var router = express.Router();
var constants = require("../constants.js");
var NewsAPI = require("newsapi");
var newsapi = new NewsAPI(constants.dev.news_api_key);

/* GET users listing. */
router.get("/topheadlines", function (req, res, next) {
  newsapi.v2
    .topHeadlines({
      country: "gb",
      language: "en",
      pageSize: req.query.page_size,
      page: req.query.page,
    })
    .then((response) => {
      res.send(response);
    });
});

router.get("/categories", function (req, res, next) {
  newsapi.v2
    .topHeadlines({
      category: req.query.category,
      country: "gb",
      language: "en",
      pageSize: req.query.page_size,
      page: req.query.page,
    })
    .then((response) => {
      res.send(response);
    });
});

router.get("/search", function (req, res, next) {
  newsapi.v2
    .topHeadlines({
      q: req.query.keyword,
      language: "en",
      pageSize: req.query.page_size,
      page: req.query.page,
    })
    .then((response) => {
      res.send(response);
    });
});

module.exports = router;
