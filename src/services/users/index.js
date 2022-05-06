require('dotenv').config();
const bcrypt = require('bcrypt');
const Model = require('../../database/users');
const { ApiError: { NewError } } = require('../../helpers/error');
const { CreateToken } = require('../../middlewares/auth');
const Messages = require('../../helpers/messages');

module.exports.Create = async (email, password, name, role, balance) => {
  const userExist = await Model.FindByEmail(email);
  if (userExist) return NewError(Messages.EMAIL_EXIST_409);

  const cryptoPassword = await bcrypt.hash(password, 10);

  const newUser = await Model.Create({ email, password: cryptoPassword, name, role, balance });
  const findNewUser = await Model.FindById(newUser.insertedId);

  delete userExist.balance;
  delete findNewUser.password;
  newUser.role = role
  const token = CreateToken(newUser);

  return {
    user: { ...findNewUser },
    token,
  };
};

module.exports.Login = async (email, password) => {
  const userExist = await Model.FindByEmail(email);
  if (!userExist) return NewError(Messages.USER_NOT_EXIST_404);

  const cryptoPassword = await bcrypt.compare(password, userExist.password);
  if (!cryptoPassword) return NewError(Messages.INCORRECT_401);
  
  delete userExist.balance;
  delete userExist.password;
  const token = CreateToken(userExist);
  
  return {
    user: { ...userExist },
    token,
  };
};

module.exports.GetAll = async () => await Model.FindAll();

module.exports.AddBalance = async (id, newBalance) => {
  const userExist = await Model.FindById(id);
  if (!userExist) return NewError(Messages.USER_NOT_EXIST_404);
  const updatedBalance = await Model.ChangeBalance(id, newBalance);
  return updatedBalance;
};
