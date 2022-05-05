const { ACCEPTED, CREATED } = require('http-status-codes').StatusCodes;
const Users = require('../../services/users');

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginAccepted = await Users.Login(email, password);
    return res.status(ACCEPTED).json(loginAccepted);
  } catch (err) {
    next(err)
  }
};

module.exports.Register = async (req, res, next) => {
  try {
    const { email, password, name, role, balance } = req.body;
    const newUser = await Users.Create(email, password, name, role, balance);
    return res.status(CREATED).json(newUser);
  } catch (err) {
    next(err);
  }
};
