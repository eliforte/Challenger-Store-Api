const { ACCEPTED } = require('http-status-codes').StatusCodes;
const Users = require('../../../services/users');

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginAccepted = await Users.Login(email, password);
    return res.status(ACCEPTED).json(loginAccepted);
  } catch (err) {
    next(err)
  }
};