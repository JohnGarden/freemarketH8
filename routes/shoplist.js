var express = require('express');
var router = express.Router();

/* GET shop page. */
router.get('/', function(req, res, next) {
  res.render('shoplist', { title: 'Lojas H8' });
});

module.exports = router;