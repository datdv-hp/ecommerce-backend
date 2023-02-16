const { Schema } = require('mongoose');
const { datShopDB } = require('../databases/init.mongodb');

var productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, require: true, unique: true, lowercase: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    images: { type: Array },
    color: { type: String, required: true },
    ratings: [
      {
        stars: Number,
        comment: String,
        postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    totalRating: {
      type: String,
      default: 0,
    },
  },
  { collection: 'products', timestamps: true }
);

module.exports = {
  Product: datShopDB.model('Product', productSchema),
};
