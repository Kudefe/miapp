var express = require('express');
var router = express.Router();

/* front page redirected to /games */
router.get('/', function(req, res, next) {
  res.redirect('/games')
});

module.exports = router;
