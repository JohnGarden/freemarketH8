var express = require('express');
var router = express.Router();

/* GET Shop list page. */
router.get('/', function(req, res, next) {
  res.render('shoplist', { title: 'Lojas H8' });
});

/* GET Shop page. */
router.get('/:shopId', function(req, res, next) {
  res.render('shop', { title: req.params.shopId });
});

module.exports = router;