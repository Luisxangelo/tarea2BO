const { where } = require('sequelize');
const User = require('../models/user.models');
const catchAsync = require('../utils/cacthAsync');
const appError = require('../utils/app.error');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');

exports.signUp = catchAsync(async (req, res) => {
  const { name, password } = req.body;
  const numberAccount = Math.round(Math.random() * 999999);

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    password: encryptedPassword,
    accountNumber: numberAccount,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'succes',
    message: 'the user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
      status: user.status,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      status: 'activate',
    },
  });
  if (!user) {
    return next(
      new appError(`User with Account ${accountNumber} not found`, 404)
    );
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new appError('Incorrect Account number or password', 401));
  }
  const token = generateJWT(user.id);

  res.status(200).json({
    status: 'succes',
    token,
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
      status: user.status,
    },
  });
});

exports.getHistory = catchAsync(async (req, res, next) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    messagge: 'user retrieved successfully',
    user,
  });
});
