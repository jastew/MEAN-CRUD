var express = require('express');
var Product = require('../models/product');

var router = express.Router();

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

module.exports = router;