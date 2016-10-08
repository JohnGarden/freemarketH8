var express = require('express');
var router = express.Router();

// var jsdom = require("jsdom");
// var window = jsdom.jsdom().defaultView;

router.post('/new', function(req, res, next) {
  console.log("Creating product!");
  console.log(req.body);
  console.log(req.body.product);
  console.log(req.body.product.name);
  console.log(req.body.product.price);
  console.log(req.cookies);
  console.log(req.cookies.shopId);

  //caga por enquanto eh pra poder usar jquery em vez de cookie
  // jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
  //   var $ = window.$;

  //   $("body").prepend("<h1>The title</h1>");
  //   console.log($("h1").html());
  // });
  
  req.db.get('shops').update( {_id: req.cookies.shopId}, 
   {$push: {products: {name: req.body.product.name, price: parseFloat(req.body.product.price), available: true}}} )
      .onFulfill(function() { res.redirect('/shops'); })
      .onReject(next);  
});

module.exports = router;
