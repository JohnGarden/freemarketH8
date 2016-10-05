var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    req.db.get('shops').find({},{}, function(e,docs){
        res.render('shoplist', {
            title: "FreeMarket H8",
            shoplist: docs,
        });
    });
});

router.get('/new', function(req, res, next) {
  res.render('new_shop', { title: "Nova Loja"} );
});

router.post('/new', function(req, res, next) {
  console.log("Creating store!");
  console.log(req.body.store.name);
  console.log(req.body.store.owner);

  req.db.get('shops').insert({name: req.body.store.name});

  res.redirect('/');
});

/* GET Shop page. */
router.get('/:shopId', function(req, res, next) {
  res.render('shop', { title: req.params.shopId });
});

module.exports = router;