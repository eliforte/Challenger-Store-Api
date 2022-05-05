require('dotenv').config();
const bcrypt = require('bcrypt');
const { FindByEmail, Create, FindById } = require('../../database/users');
const { ApiError: { NewError } } = require('../../helpers/error');
const { CreateToken } = require('../../middlewares/auth');
const { EMAIL_EXIST_409, USER_NOT_EXIST_404, INCORRECT_401 } = require('../../helpers/messages');

module.exports.CreateUser = async (email, password, name, role, balance) => {
  const userExist = await FindByEmail(email);
  if (userExist) return NewError(EMAIL_EXIST_409);

  const cryptoPassword = await bcrypt.hash(password, 10);

  const newUser = await Create({ email, password: cryptoPassword, name, role, balance });
  const findNewUser = await  FindById(newUser.insertedId);

  delete findNewUser.password;
  newUser.role = role
  const token = CreateToken(newUser);

  return {
    user: { ...findNewUser },
    token,
  };
};

module.exports.LoginUser = async ({ email, password }) => {
  const userExist = await FindByEmail(email);
  if (!userExist) return NewError(USER_NOT_EXIST_404);

  const cryptoPassword = await bcrypt.compare(password, userExist.password);
  if (cryptoPassword) return NewError(INCORRECT_401);
  
  delete userExist.password;
  const token = CreateToken(userExist);
  
  return {
    user: { ...userExist },
    token,
  };
};