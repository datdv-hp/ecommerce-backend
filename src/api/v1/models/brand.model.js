const { Schema } = require('mongoose'); // Erase if already required
const { datShopDB } = require('../databases/init.mongodb');

// Declare the Schema of the Mongo model
var brandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { collection: 'brands', timestamps: true }
);

//Export the model
module.exports = {
  Brand: datShopDB.model('Brand', brandSchema),
};
