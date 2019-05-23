var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  imagePath: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  }
});

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getAllProducts = function (callback) {
  Product.find(callback)
}

module.exports.getProductByID = function (id, callback) {
  Product.findById(id, callback);
}