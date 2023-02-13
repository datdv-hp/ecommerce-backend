const userServices = require('../services/user.service');
const asyncHandler = require('express-async-handler');
const httpError = require('http-errors');

const { validateMongodbId } = require('../validations/mongoID.validate');
const { sendEmail } = require('../services/email.service');

const registerUser = asyncHandler(async (req, res) => {
  const userData = req.body;
  if (!userData.email || !userData.password) {
    throw httpError.BadRequest('Email and password are required');
  }

  const newUser = await userServices.createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Created successfully',
    elements: newUser,
    expose: {},
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw httpError.BadRequest('Email and password are required');
  }
  const userLogin = await userServices.authUser({ email, password });

  res.cookie('refreshToken', userLogin.refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    // secure: true,
    maxAge: 86400000 * 3,
  });

  delete userLogin.refreshToken;

  res.status(200).json({
    status: 200,
    message: 'OK! Login successfully.',
    elements: userLogin,
    expose: {},
  });
});

const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  console.log(JSON.stringify(cookies));
  if (!cookies?.refreshToken) {
    throw httpError.Unauthorized('No refresh token in Cookies');
  }
  const refreshToken = cookies.refreshToken;
  const newAccessToken = await userServices.handleRefreshToken(refreshToken);
  res.status(200).json({
    status: 200,
    message: 'OK! New accessToken',
    elements: { accessToken: newAccessToken },
    expose: {},
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userServices.getAllUsers();
  console.log('ALL USER >>>');
  if (users) {
    res.status(200).json({
      status: 200,
      message: 'OK! All users have been successfully retrieved.',
      elements: users,
      expose: {},
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
  console.log('USER >>>');
  const { id } = req.params;
  validateMongodbId(id);
  const user = await userServices.getUser(id);
  res.status(200).json({
    status: 200,
    message: 'OK! An user has been successfully retrieved.',
    elements: user,
    expose: {},
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const user = await userServices.deleteUser(id);
  res.status(200).json({
    status: 200,
    message: 'OK! An user has been successfully deleted.',
    elements: user,
    expose: {},
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);

  const updatedUser = await userServices.updateUser(_id, req.body);
  res.status(200).json({
    status: 200,
    message: 'OK! An user has been successfully updated.',
    elements: updatedUser,
    expose: {},
  });
});

const blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const blockedUser = await userServices.blockUser(id);
  res.status(200).json({
    status: 200,
    message: 'OK! User is blocked.',
    elements: blockedUser,
    expose: {},
  });
});

const unblockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const unblockedUser = await userServices.unblockUser(id);
  res.status(200).json({
    status: 200,
    message: 'OK! User is unblocked.',
    elements: unblockedUser,
    expose: {},
  });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  console.log(JSON.stringify(cookies));
  if (!cookies?.refreshToken) {
    throw httpError.Unauthorized('No refresh token in Cookies');
  }
  const refreshToken = cookies.refreshToken;
  await userServices.logout(refreshToken);
  res.clearCookie('refreshToken', {
    httpOnly: true,
  });
  res.status(200).json({
    status: 200,
    message: 'OK! Logged out.',
    elements: null,
    expose: {},
  });
});

const forgotPasswordToken = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const resetToken = await userServices.createResetToken(email);
  const data = {
    to: email,
    text: `Hey ${email}. Please follow this link to reset your password. This link is valid till 10 minutes from now.`,
    subject: 'Reset your password',
    resetToken: resetToken,
  };
  await sendEmail(data);
  res.json(resetToken);
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { password, repeatedPassword } = req.body;
  const { resetToken } = req.params;
  console.log(typeof resetToken);
  const userResetPassword = await userServices.resetPassword(
    resetToken,
    password
  );

  res.status(200).json({
    status: 200,
    message: 'OK! Password reset successfully',
    elements: { user: userResetPassword },
    expose: {},
  });
});

module.exports = {
  registerUser,
  loginUser,
  handleRefreshToken,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  logoutUser,
  forgotPasswordToken,
  resetPassword,
};
