const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const { datShopDB } = require('../databases/init.mongodb');
const crypto = require('crypto');
// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: {
      type: Array,
      default: [],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    refreshToken: {
      type: String,
      default: '',
    },
    passwordChagedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { collection: 'users', timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordChagedAt = Date.now();
  }
  next();
});

userSchema.method('isPasswordMatched', async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
});

userSchema.method('createPasswordResetToken', async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
});

//Export the model
module.exports = {
  User: datShopDB.model('User', userSchema),
};
