'use strict';

var express     = require('express');
var parser      = require('body-parser');
var app         = express();
var router      = express.Router();
var Product = require('./models/product');

// Database
require('./database');
require('./seed');

// Server
app.use('/', express.static('public'));
app.use(parser.json());
app.use('/api', router);

// TODO: split out the routes to another file

router.get('/products', function(req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            res.status(500).json({message: err.message});
        }
        res.json({
            products: products
        });
    });
});

router.post('/products', function(req, res) {
    var product = req.body;
    Product.create(product, function(err, product) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        res.json({'product':product, message: 'Product Created'});
    });
});

router.put('/products/:id', function(req, res) {
    var id = req.params.id;
    var product = req.body;
    if (product && product._id !== id) {
        return res.status(500).json({err: "Id's do not match"});
    }
    Product.findByIdAndUpdate(id, product, function(err, product) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
        res.json({'product':product, message: 'Todo Updated'});
    });
});

app.listen(3000, function() {
    console.log('Serving app or port 3000!');
});