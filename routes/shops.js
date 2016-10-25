var express = require('express');
var middleware = require('./routemiddleware.js')();
var router = express.Router();

router.get('/new/:universityId', function(req, res) {
  console.log("sugação da universidade");
  console.log(req.params);
  var backBtnLinkPath = "/shops/" + req.params.universityId;
  res.render('new_shop',
    {
      title: "Nova Loja",
      universityId: req.params.universityId,
      showBackBtn: true,
      backBtnLink: backBtnLinkPath,
    }
  );
});



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

              console.log("Pending Requests");
              console.log(university['requests']);
              console.log("university ID");
              console.log(university._id);

              res.cookie('universityId', university._id);
              res.render('shoplist',
                {
                  title: "FreeMarket Admin",
                  shoplist: shoplist || [],
                  myshoplist: myshops,
                  pendingRequests: university['requests'],
                  isAdmin: isAdmin,
                  universityId: university._id,
                  backBtnLink: "/universities",
                  showBackBtn: true,
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
                    res.cookie('universityId', university._id);
                    res.render('shoplist',
                    {
                      title: "FreeMarket",
                      shoplist: shoplist || [],
                      myshoplist: myshops,
                      pendingRequests: [],
                      isAdmin: isAdmin,
                      universityId: university._id,
                      backBtnLink: "/universities",
                      showBackBtn: true,
                    });
                  } else {
                    // O admin não verificou o request
                    res.render('pendingrequest',
                      {
                        backBtnLink: "/universities",
                        showBackBtn: true,
                      });
                  }
                }
              }
              if (!requestSent) {
                // Solicitar acesso
                res.render('request_access',
                  {
                    title: university.name,
                    universityId: university._id,
                    backBtnLink: "/universities",
                    showBackBtn: true,
                  });
              }
            }
          }
        })
            .onReject(next);
      })
      .onReject(next);
});



router.post('/new', isAuthenticated, function(req, res, next) {
  console.log("Creating store!");
  console.log(req.body.store.name);
  console.log(req.body.store.owner);
  console.log(req.body.universityId);
  console.log(req.user);

  req.db.get('shops').insert(
    {
      name: req.body.store.name,
      ownerid: req.user.id,
      universityid:  req.body.universityId
    }
  ).then(function(shop) {
    res.redirect('/shop/' + shop._id + '/edit');
  }, next);
});

module.exports = router;
