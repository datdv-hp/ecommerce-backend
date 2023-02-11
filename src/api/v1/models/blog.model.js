const { Schema } = require('mongoose');
const { datShopDB } = require('../databases/init.mongodb');
var blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberOfViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    images: {
      type: String,
      default:
        'https://www.shutterstock.com/image-illustration/work-home-stay-safe-covid19-600w-1713771061.jpg',
    },
    author: {
      type: String,
      default: 'ADMIN',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    collection: 'blogs',
    timestamps: true,
  }
);

module.exports = {
  Blog: datShopDB.model('User', blogSchema),
};
