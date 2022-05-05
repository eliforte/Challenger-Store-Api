const { CREATED } = require('http-status-codes').StatusCodes;
const { CreateUser } = require('../../../services/users');

module.exports.Register = async (req, res, next) => {
  try {
    const { email, password, name, role, balance } = req.body;
    const newUser = await CreateUser(email, password, name, role, balance);
    return res.status(CREATED).json(newUser);
  } catch (err) {
    next(err);
  }
};