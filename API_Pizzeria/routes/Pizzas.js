var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'Pizzeria'

//var busqueda = 'pepperoni'

/* GET specific pizza */
router.get('/', (req, res, next) => {
    mongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>{
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.find({"nombre" : req.query.nombre}).toArray((err,docs) => {
            if(err) return next(createError(500))
            res.status(200).json(docs);
        })
    })

});

/* PUT update pizza*/
router.put('/', (req, res, next) =>{
    mongoClient.connect(url, {useNewUrlParser: true}, (err, client)=> {
        if (err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.findOneAndUpdate({"nombre": req.query.nombre}, {$set : req.body},function(err, client) {
            if (err) throw err;
            //console.log("1 document updated");
            res.status(200).end();
    })
})
})
/* POST pizza */
router.post('/', (req, res, next) => {
    mongoClient.connect(url, {useNewUrlParser : true}, (err, client) =>{
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.insertOne(req.body, err =>{
            if(err) return next(createError(500))
            res.status(201).end()
        })
    });

});

/*DELETE pizza*/
router.delete('/', (req, res, next) => {
    mongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>{
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.deleteOne({"nombre" : req.query.nombre}, function(err, client) {
            if (err) throw err;
            //console.log("1 document deleted")
            res.status(200).end()
        })
    })
});

module.exports = router;