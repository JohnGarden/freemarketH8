var express = require('express');
var router = express.Router();

/* GET lojas page. */
router.get('/', function(req, res, next) {
  res.render('lojas', { title: 'Lojas H8' });
});

module.exports = router;
