var express = require('express');
var router = express.Router();
var { latestDataJsons } = require('../downloadLatestData');

/**
 * @swagger
 * /{jsonname}:
 *   description: Vraag een JSON op
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: jsonname
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: JSON response wanneer gevonden
 *       404:
 *         description: JSON niet gevonden
 */
router.get('/:jsonname', function(req, res, next) {
  // return json in case its present in latestDataJsons
  if (req.params.jsonname in latestDataJsons) {
    res.json(latestDataJsons[req.params.jsonname]);
  } else {
    next();
  }
});

module.exports = router;
