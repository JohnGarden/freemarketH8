var express = require('express');
var middleware = require('./routemiddleware.js')();
var router = express.Router();

// var jsdom = require("jsdom");
// var window = jsdom.jsdom().defaultView;

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
        res.render('shop', 
          {
            title: shop.name, 
            shop: shop, 
            shopId: req.params.shopId, 
            isOwner: isOwner,
            universityId: shop.universityid
          });
      })
      .onReject(next);
});

router.post('/new', isAuthenticated, function(req, res, next) {
  console.log("Creating product!");
  console.log(req.body);
  console.log(req.cookies);

  //checa se ja existe item com esse nome
  var isNameRepeated = false;
  req.db.get('shops').findById(req.cookies.shopId)
    .then(function(shop) {
      console.log(shop.products);
      console.log(shop.products.length );

      for(i=0; shop.products.length; i++){
        if(shop.products[i].name.localeCompare(req.body.product.name)==0){
          isNameRepeated = true;
        }
      }
    });
    
  setTimeout(function(){
    if (!isNameRepeated){ 
      //cria item na loja
      req.db.get('shops').update(
        {_id: req.cookies.shopId},
        {$addToSet: {products: {name: req.body.product.name, price: parseFloat(req.body.product.price), available: true}}}
      )
      .onFulfill(function() { res.redirect('/shops/' + req.cookies.shopId); })
      .onReject(next);
      console.log("Product created");
      console.log(isNameRepeated);
    }
    else {
      console.log("Product with same name already exists");
      // alert("Product with same name already exists");
      // fazer um jeito de avisar pro user que ja existe item com esse nome
      res.redirect('/shops/' + req.cookies.shopId);
    }
  }, 1000);
  
  //caga por enquanto eh pra poder usar jquery em vez de cookie
  // jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
  //   var $ = window.$;

  //   $("body").prepend("<h1>The title</h1>");
  //   console.log($("h1").html());
  // });
  
  // if (req.db.get('shops').find({_id: req.cookies.shopId, products: {name: req.body.product.name}}).toArray().length < 1){
});

router.post('/delete', isAuthenticated, function(req, res, next) {
  //deleta todas os items com o nome entrado
  //o nome de cada item deve ser unico pela funcao de criar acima
  console.log("Deleting product!");
  console.log(req.body);
  
  req.db.get('shops').update(
    {_id: req.cookies.shopId},
    {$pull: {products: {name: req.body.product.name}}}
  )
  .onFulfill(function() { res.redirect('/shops/' + req.cookies.shopId); })
  .onReject(next);
});

router.post('/delete_shop', isAuthenticated, function(req, res, next) {
  //deleta loja pra sempre
  //talvez precise de uma confirmação melhor do usuário
  console.log("Deleting shop!");
  console.log(req.body);
  console.log(req.cookies);
  
  req.db.get('shops').remove(
    {_id: req.cookies.shopId}
  )
  .onFulfill(function() { res.redirect('/universities'); })
  .onReject(next);
});

module.exports = router;
