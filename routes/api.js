var express = require('express');
var router = express.Router();
var { latestDataJsons } = require('../downloadLatestData');

/* GET json */
router.get('/:jsonname', function(req, res, next) {
  // return json in case its present in latestDataJsons
  if (req.params.jsonname in latestDataJsons) {
    res.json(latestDataJsons[req.params.jsonname]);
  } else {
    next();
  }
});

module.exports = router;
