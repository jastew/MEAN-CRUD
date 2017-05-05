var Product = require('./models/product');

var productNames = ['Rice Milk', 'Almond Milk', 'Oat Milk'];

Product.find({}, function(err, products) {
    if (!products.length) {
        productNames.forEach(function(product) {
            // If there are no products, add new ones
            Product.create({
                name: product
            });
        });
    }
});