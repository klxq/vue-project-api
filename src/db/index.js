var mongo = require('mongodb');
var dbinfo = require('../config/dbinfo');

// get mongo instance
var Server = mongo.Server,
    Db = mongo.Db;
var server = new Server(dbinfo.ip, dbinfo.port, {auto_reconnect: true});

db = new Db(dbinfo.db, server);

// collection name
var COLLECTION_FILM = 'film';
var COLLECTION_DETAIL = 'detail';

// invoke when db is open
db.open(function(err, db) {
  if(!err) {
    console.log('Connected to ' + dbinfo.db + ' database');
    db.collection(COLLECTION_FILM, {strict: true}, function(err, collection) {
      if(err) {
        console.log('Initial database with default data');
        initialDB();
      }
    });
  } else {
    console.error(err);
  }
});

exports.findAllFilms = function(req, res) {
  db.collection(COLLECTION_FILM, function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.findDetailByID = function(req, res) {
  var id = req.params.id;
  db.collection(COLLECTION_DETAIL, function(err, collection) {
    collection.find({id:id}).toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.editDetailByID = function(req, res) {
  var item = req.body;
  db.collection(COLLECTION_DETAIL, function(err, collection) {
    delete item["_id"]
    collection.update({id:item.id}, item, null, function(err, result) {
      if(!err) {
        res.json({"status": true});
      } else {
        res.error(501, err);
      }
    });
  });
};

// initial default DB
var initialDB = function() {
  db.collection(COLLECTION_FILM, function(err, collection) {
    collection.insert(require('./list'), {safe: true}, function(err, result) {});
  });
  db.collection(COLLECTION_DETAIL, function(err, collection) {
    collection.insert(require('./detail.json'), {safe: true}, function(err, result) {});
  });
};
