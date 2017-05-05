var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
    name: String,
    price: Number
});

// create a model
var Product = mongoose.model('Product', productSchema);

module.exports = Product;