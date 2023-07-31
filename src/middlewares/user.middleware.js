const User = require('../models/user.model');
const appError = require('../utils/app.error');
const catchAsync = require('../utils/cacthAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'activate',
    },
  });
  if (!user) {
    return next(new appError(`user with id ${id} not found!`, 404));
  }
  req.user = user;
  next();
});
