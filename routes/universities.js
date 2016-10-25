var express = require('express');
var middleware = require('./routemiddleware.js')();
var router = express.Router();

router.get('/', isAuthenticated, function(req, res) {
   req.db.get('universities').find()
      .then(function(docs) {
        res.cookie('universityId', '');
        res.render('universities', {
          title: "Universidades",
          universities: docs || [],
          showBackBtn: false,
        });
      });
});

router.get('/request', isAuthenticated, function(req, res) {
   req.db.get('universities').find()
      .then(function(docs) {
        res.render('universities', {
          title: "Universidades",
          universities: docs || [],
          backBtnLink: "/",
          showBackBtn: true,
        });
      });
});

router.post('/request', isAuthenticated, function(req, res, next) {
  console.log("Request Access to University!");
  console.log(req.user.id);
  console.log(req.body.universityId);
  console.log(req.user.displayName);
  console.log(req.user);

  // Cria request em university
  req.db.get('universities').update(
        {_id: req.body.universityId},
        {$addToSet:
          {
            requests:
            {
              userid: req.user.id,
              name: req.user.displayName,
              accepted: false
            }
          }
        }
      )
      .onFulfill(function() { res.redirect('/'); })
      .onReject(next);
      console.log("Request created");


  // req.db.get('university').insert({name: req.body.store.name, ownerid: req.user.id})
  //     .onFulfill(function() { res.redirect('/'); })
  //     .onReject(next);
});


router.post('/request/accepted', isAuthenticated, function(req, res, next) {
  console.log("Admin Accepted Access to University!");
  console.log(req.body.universityId);
  console.log(req.body.userId);
  console.log(req.user);

  // Deleta request do aluno em university
  req.db.get('universities').update(
    { _id: req.body.universityId},
    { $pull:
      {
        requests:
        {
          userid: req.body.userId
        }
      }
    }
  )
  .onFulfill(function() {
    // Aceita request do aluno em university
    req.db.get('universities').update(
      { _id: req.body.universityId},
      { $addToSet:
        {
          requests:
          {
            userid: req.body.userId,
            name: req.body.displayName,
            accepted: true
          }
        }
      }
    );


    res.redirect("/shops/" + req.body.universityId); })
  .onReject(next);
  console.log("Request deleted");


});

module.exports = router;
