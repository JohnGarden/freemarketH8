var express = require('express');
var middleware = require('./routemiddleware.js')();
var router = express.Router();

router.get('/:universityId', isAuthenticated, function(req, res, next) {
  req.db.get('shops').find()
      .then(function(docs) {
        var shoplist = [];
        var myshops = [];
        for (var i = 0; i < docs.length; i++) {
          if (docs[i].hasOwnProperty('universityid') && docs[i]['universityid'] == req.params.universityId) {
            if (docs[i].hasOwnProperty('ownerid') && docs[i]['ownerid'] == req.user.id) {
              myshops.push(docs[i]);
            } else {
              shoplist.push(docs[i]);
            }
          }
        }

        req.db.get('universities').findById(req.params.universityId)
            .then(function(university) {

          var isAdmin = false;
          if (university.hasOwnProperty('adminid')) {
            if (university['adminid'] == req.user.id) {
              isAdmin = true;
              res.render('shoplist',
                {
                  title: "FreeMarket H8",
                  shoplist: shoplist || [],
                  myshoplist: myshops,
                  pendingRequests: university['requests'],
                });
            }
          }

          if(!isAdmin) {
            if (university.hasOwnProperty('requests')) {
              var requestSent = false;
              for (var i = 0; i < university['requests'].length; i++) {
                if (university['requests'][i]['userid'] == req.user.id)
                {
                  requestSent = true;
                  if (university['requests'][i]['accepted']) {
                    res.render('shoplist',
                    {
                      title: "FreeMarket H8",
                      shoplist: shoplist || [],
                      myshoplist: myshops,
                      pendingRequests: [],
                    });
                  } else {
                    // O admin não verificou o request
                    res.render('pendingrequest');
                  }
                }
              }
              if (!requestSent) {
                // Solicitar acesso
                res.render('pendingrequest');
              }
            }
          }
        })
            .onReject(next);
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

module.exports = router;
