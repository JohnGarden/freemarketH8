var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET ShopList page. */
router.get('/shoplist', function(req, res) {
    var db = req.db;
    var collection = db.get('shopcollection');
    collection.find({},{},function(e,docs){
        res.render('shoplist', {
            "shoplist" : docs
        });
    });
});

module.exports = router;
