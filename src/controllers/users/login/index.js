const { ACCEPTED } = require('http-status-codes').StatusCodes;
const { LoginUser } = require('../../../services/users');

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginAccepted = await LoginUser(email, password);
    return res.status(ACCEPTED).json(loginAccepted);
  } catch (err) {
    next(err)
  }
};