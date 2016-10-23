var mi = require('mongoimport');
var dbconfig = require("../config.js");

var jsonfile = require('jsonfile');

// Export Shops
var file = 'shops.json';
jsonfile.readFile(file, function(err, obj) {
  if (err) {
    return console.log(err);
  }
  var config = {
    fields: obj, // {array} data to import 
    db: dbconfig.db, // {string} name of db 
    collection: 'shops', // {string|function} name of collection, or use a function to 
    //  return a name, accept one param - [fields] the fields to import 

    // they're options 
    host: dbconfig.host, // {string} [optional] by default is 27017 
    username: dbconfig.user, // {string} [optional] 
    password: dbconfig.passwd, // {string} [optional] 
    callback: (err, db) => {

        if (err) {
          return console.log(err);
        }
        console.log(db);

      } // {function} [optional] 
  };
  mi(config);
});

// Export Universities
var file = 'universities.json';
jsonfile.readFile(file, function(err, obj) {
  if (err) {
    return console.log(err);
  }
  var config = {
    fields: obj, // {array} data to import 
    db: dbconfig.db, // {string} name of db 
    collection: 'universities', // {string|function} name of collection, or use a function to 
    //  return a name, accept one param - [fields] the fields to import 

    // they're options 
    host: dbconfig.host, // {string} [optional] by default is 27017 
    username: dbconfig.user, // {string} [optional] 
    password: dbconfig.passwd, // {string} [optional] 
    callback: (err, db) => {

        if (err) {
          return console.log(err);
        }
        console.log(db);

      } // {function} [optional] 
  };
  mi(config);
});