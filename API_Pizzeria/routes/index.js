var express = require('express');
var router = express.Router();

/*const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'Pizzeria'*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
