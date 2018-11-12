var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'Pizzeria'

/* GET listing, all pizzas*/
router.get('/', function(req, res, next) {
  mongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>{
      if(err) return next(createError(500))
      const database = client.db(dbName)
      const collection = database.collection('Pizzas')
      collection.find({}).toArray((err,docs) => {
          if(err) return next(createError(500))
          res.status(200).json(docs);
      })
  })
  //res.render('index', { title: 'Express' });
});

/* GET specific pizza */
/* router.get('/', (req, res, next) => {
    mongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>{
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.find({})
    })

});*/

/* POST pizza */
router.post('/', (req, res, next) => {
    mongoClientl.connect(url, {useNewUrlParser : true}, (err, client) =>{
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.insertOne(req.body, err =>{
            if(err) return next(createError(500))
            res.status(201).end();
        })
    })

});

module.exports = router;