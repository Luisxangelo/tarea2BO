const { where } = require('sequelize');
const Tranfer = require('../models/transfer.models');
const catchAsync = require('../utils/cacthAsync');
const appError = require('../utils/app.error');
const User = require('../models/user.models');

exports.transferAmount = catchAsync(async (req, res, next) => {
  const { amount, accountNumber, senderUserId } = req.body;
  //recive la tx
  const userRX = await User.findOne({
    where: {
      accountNumber: User.accountNumber,
      status: 'activate',
    },
  });
  if (!userRX) {
    return next(
      new appError(
        `user with account ${accountNumber} not found or incorrect`,
        404
      )
    );
  }
  const receiverUserid = userRX.id;
  // realiza la tx
  const userTX = await User.findOne({
    where: {
      id: senderUserId,
      status: 'activate',
    },
  });
  if (!userTX) {
    return next(
      new appError(`user with id account ${id} not found or incorrect`, 404)
    );
  }

  if (amount > userTX.amount) {
    return next(new appError('insufficient balance', 401));
  }

  if (receiverUserid === userTX.id) {
    return next(
      new appError(
        'You cannot make transfers to the same origin account number',
        401
      )
    );
  }

  const newAmountUserTX = userTX.amount - amount;

  const newAmountUserRX = amount + receiverUserid.amount;

  await userTX.update({ amount: newAmountUserTX });
  await userRX.update({ amount: newAmountUserRX });

  return res.status(200).json({
    status: 'success',
    message: 'successful transfer!',
  });
});
