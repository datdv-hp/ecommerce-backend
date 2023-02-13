const { User } = require('../models/user.model');
const httpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../configs/jwtToken.config');
const { generateRefreshToken } = require('../configs/refreshToken.config');
const crypto = require('crypto');

const createUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw httpError.Conflict('Email already exists');
    }
    const createdUser = await User.create(userData);
    return createdUser;

    // return await newUser.save();
  } catch (error) {
    throw new Error(error);
  }
};

const authUser = async (userData) => {
  try {
    const { email, password } = userData;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw httpError.Unauthorized('Incorrect email or password!');
    }

    const isPasswordMatched = await foundUser.isPasswordMatched(password);
    if (!isPasswordMatched) {
      throw httpError.Unauthorized('Incorrect password!');
    }
    const refreshToken = generateRefreshToken(foundUser?.id);
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    const user = {
      id: foundUser?._id,
      email: foundUser?.email,
      accessToken: generateToken(foundUser?._id),
      refreshToken: refreshToken,
    };
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const logout = async (refreshToken) => {
  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      return;
    }
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(`LOGOUT::: ${result}`);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const handleRefreshToken = async (refreshToken) => {
  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
      throw httpError.Forbidden();
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (!decoded || foundUser.id !== decoded.id) {
      throw httpError.Forbidden();
    }
    const accessToken = generateToken(decoded.id);
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw httpError.BadRequest('Not found any User have your provided ID');
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw httpError.BadRequest('Not found any User have your provided ID');
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (id, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      throw httpError.BadRequest('Not found any User have your provided ID');
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

const blockUser = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    if (!user) {
      throw httpError.BadRequest('Not found any User have your provided ID');
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
const unblockUser = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!user) {
      throw httpError.BadRequest('Not found any User have your provided ID');
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const createResetToken = async (email) => {
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw httpError.NotFound('Email invalid or not exist. Not found user.');
    }

    const resetToken = await foundUser.createPasswordResetToken();
    await foundUser.save();
    return resetToken;
  } catch (error) {
    throw new Error(error);
  }
};

const resetPassword = async (resetToken, password) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const foundUser = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!foundUser) {
      throw httpError.BadRequest('Token invalid');
    } else {
      foundUser.password = password;
      foundUser.passwordResetToken = undefined;
      foundUser.passwordResetExpires = undefined;
      await foundUser.save();
      return foundUser._id;
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  authUser,
  handleRefreshToken,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  logout,
  createResetToken,
  resetPassword,
};
