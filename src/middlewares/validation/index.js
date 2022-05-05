const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const {
  SCHEMALogin,
  SCHEMARegister,
} = require('../../helpers/schemas');

module.exports.Login = async (req, _res, next) => {
  try {
    const { error } = SCHEMALogin.validate(req.body);
    if (error) return next({ message: error.message, status: BAD_REQUEST });
    next();
  } catch (err) {
    next(err)
  }
};

module.exports.Register = async (req, _res, next) => {
  try {
    const { error } = SCHEMARegister.validate(req.body);
    if (error) return next({ message: error.message, status: BAD_REQUEST });
    next();
  } catch (err) {
    next(err)
  }
};