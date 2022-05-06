const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const {
  SCHEMALogin,
  SCHEMARegister,
  SCHEMACreateProduct,
  SCHEMAEditProduct,
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
    if(!req.body.balance) req.body.balance = 0;
    const { error } = SCHEMARegister.validate(req.body);
    if (error) return next({ message: error.message, status: BAD_REQUEST });
    next();
  } catch (err) {
    next(err)
  }
};

module.exports.CreateProduct = async (req, _res, next) => {
  try {
    const { error } = SCHEMACreateProduct.validate(req.body);
    if (error) return next({ message: error.message, status: BAD_REQUEST });
    next();
  } catch (err) {
    next(err)
  }
};

module.exports.EditProduct = async (req, _res, next) => {
  try {
    const { error } = SCHEMAEditProduct.validate(req.body);
    if (error) return next({ message: error.message, status: BAD_REQUEST });
    next();
  } catch (err) {
    next(err)
  }
};

