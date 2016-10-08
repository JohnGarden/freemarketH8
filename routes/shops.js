var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.db.get('shops').find()
      .then(function(docs) {
        res.render('shoplist',
          {
            title: "FreeMarket H8",
            shoplist: docs || [],
          });
      })
      .onReject(next);
});

router.get('/new', function(req, res) {
  res.render('new_shop', { title: "Nova Loja"} );
});

router.post('/new', function(req, res, next) {
  console.log("Creating store!");
  console.log(req.body.store.name);
  console.log(req.body.store.owner);

  req.db.get('shops').insert({name: req.body.store.name})
      .onFulfill(function() { res.redirect('/'); })
      .onReject(next);
});

router.get('/:shopId', function(req, res, next) {
  req.db.get('shops').findById(req.params.shopId)
      .then(function(shop) {
        if (!shop) return next();
        var cookie = req.cookies.cookieName;
        res.cookie('shopId', req.params.shopId, { maxAge: 900000, httpOnly: true });
        res.render('shop', {title: shop.name, shop: shop, shopId: req.params.shopId});
      })
      .onReject(next);
});

module.exports = router;
