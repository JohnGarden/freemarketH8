var express = require('express');
var middleware = require('./routemiddleware.js')();
var router = express.Router();

router.get('/', isAuthenticated, function(req, res, next) {
  req.db.get('shops').find()
      .then(function(docs) {
        var myshops = [];
        for (var i = 0; i < docs.length; i++) {
          if (docs[i].hasOwnProperty('ownerid') && docs[i]['ownerid'] == req.user.id) {
            myshops.push(docs[i]);
          }
        }

        res.render('shoplist',
          {
            title: "FreeMarket H8",
            shoplist: docs || [],
            myshoplist: myshops,
          });
      })
      .onReject(next);
});

router.get('/new', isAuthenticated, function(req, res) {
  res.render('new_shop', { title: "Nova Loja"} );
});

router.post('/new', isAuthenticated, function(req, res, next) {
  console.log("Creating store!");
  console.log(req.body.store.name);
  console.log(req.body.store.owner);
  console.log(req.user);

  req.db.get('shops').insert({name: req.body.store.name, ownerid: req.user.id})
      .onFulfill(function() { res.redirect('/'); })
      .onReject(next);
});

router.get('/:shopId', isAuthenticated, function(req, res, next) {
  req.db.get('shops').findById(req.params.shopId)
      .then(function(shop) {
        var isOwner = false;
        if (shop.hasOwnProperty('ownerid') && shop['ownerid'] == req.user.id) {
          isOwner = true;
        }

        if (!shop) return next();
        var cookie = req.cookies.cookieName;
        res.cookie('shopId', req.params.shopId, { maxAge: 900000, httpOnly: true });
        res.render('shop', {title: shop.name, shop: shop, shopId: req.params.shopId, isOwner: isOwner});
      })
      .onReject(next);
});

module.exports = router;
