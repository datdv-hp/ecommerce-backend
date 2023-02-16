const { Schema } = require('mongoose'); // Erase if already required
const { datShopDB } = require('../databases/init.mongodb');

// Declare the Schema of the Mongo model
var productCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { collection: 'product_categories', timestamps: true }
);

//Export the model
module.exports = {
  ProductCategory: datShopDB.model('ProductCategory', productCategorySchema),
};
