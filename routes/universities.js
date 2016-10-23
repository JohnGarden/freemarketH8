var express = require('express');
var middleware = require('./routemiddleware.js')();
var router = express.Router();

router.get('/', isAuthenticated, function(req, res) {
   req.db.get('universities').find()
      .then(function(docs) {
        res.render('universities', {
          title: "Suga Xingu",
          universities: docs || [],
        });
      });
});

module.exports = router;