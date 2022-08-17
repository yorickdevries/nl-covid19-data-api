var express = require('express');
var router = express.Router();
var { latestDataJsons } = require('../downloadLatestData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(latestDataJsons);
});

module.exports = router;
