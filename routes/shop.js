var express = require('express');
var middleware = require('./routemiddleware.js')();
var router = express.Router();

// var jsdom = require("jsdom");
// var window = jsdom.jsdom().defaultView;

router.get('/:shopId', isAuthenticated, function(req, res, next) {
  req.db.get('shops').findById(req.params.shopId)
      .then(function(shop) {
        if (!shop) return next();
        var isOwner = false;
        if (shop.hasOwnProperty('ownerid') && shop['ownerid'] == req.user.id) {
          isOwner = true;
        }

        res.render('shop',
          {
            title: shop.name,
            shop: shop,
            isOwner: isOwner
          });
      }, next);
});

router.get('/:shopId/edit', isAuthenticated, function(req, res, next) {
  req.db.get('shops').findById(req.params.shopId)
      .then(function(shop) {
        if (!shop) return next();
        var isOwner = false;
        if (shop.hasOwnProperty('ownerid') && shop['ownerid'] == req.user.id) {
          isOwner = true;
        }
        if (!isOwner) return res.redirect('/shop/' + req.params.shopId);

        res.render('shop_edit',
          {
            title: shop.name,
            shop: shop
          });
      }, next);
});

router.post('/:shopId/new', isAuthenticated, function(req, res, next) {
  console.log("Creating product!");
  console.log(req.body);
  console.log(req.params.shopId);

  req.db.get('shops').findById(req.params.shopId)
    .then(function(shop) {
      console.log(shop.products);

      //checa se ja existe item com esse nome
      var isNameRepeated = (shop.products || []).some(function(elm) {
        return elm.name.localeCompare(req.body.product.name) == 0;
      });

      if (isNameRepeated) {
        console.log("Product with same name already exists");
        // alert("Product with same name already exists");
        // fazer um jeito de avisar pro user que ja existe item com esse nome
        res.redirect('/shop/' + req.params.shopId);
        return;
      }

      //cria item na loja
      req.db.get('shops').updateById(req.params.shopId,
        {$addToSet: {products: {name: req.body.product.name, price: parseFloat(req.body.product.price), available: true}}}
      )
          .onFulfill(function() {
            console.log("Product created");
            res.redirect('/shop/' + req.params.shopId); })
          .onReject(next);
    }, next);

  //caga por enquanto eh pra poder usar jquery em vez de cookie
  // jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
  //   var $ = window.$;

  //   $("body").prepend("<h1>The title</h1>");
  //   console.log($("h1").html());
  // });

  // if (req.db.get('shops').find({_id: req.cookies.shopId, products: {name: req.body.product.name}}).toArray().length < 1){
});

router.post('/:shopId/delete', isAuthenticated, function(req, res, next) {
  //deleta todas os items com o nome entrado
  //o nome de cada item deve ser unico pela funcao de criar acima
  console.log("Deleting product!");
  console.log(req.body);

  req.db.get('shops').updateById(req.params.shopId,
    {$pull: {products: {name: req.body.product.name}}}
  ).then(function() {
    res.redirect('/shop/' + req.params.shopId);
  }, next);
});

router.post('/:shopId/delete_shop', isAuthenticated, function(req, res, next) {
  //deleta loja pra sempre
  //talvez precise de uma confirmação melhor do usuário
  console.log("Deleting shop!");
  console.log(req.body);
  console.log(req.cookies);

  req.db.get('shops').removeById(req.params.shopId)
      .then(function() {res.redirect('/universities');}, next);
});

module.exports = router;
