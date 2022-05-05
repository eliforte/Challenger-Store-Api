require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_MALFORMED_401, MISSING_TOKEN_401, NOT_ADMIN_401 } = require('../../helpers/messages');
const { FindByEmail } = require('../../database/users');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports.CreateToken = (body) => {
  const actionsUsers = body.role === 'admin' ? process.env.ADMIN_ACTIONS : process.env.CLIENT_ACTIONS;
  return jwt.sign({ data: { ...body, actions: actionsUsers } }, process.env.SECRET, jwtConfig)
};

module.exports.VerifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(MISSING_TOKEN_401.status).json(MISSING_TOKEN_401);
    }
    const decode = jwt.verify(authorization, process.env.SECRET);
    const { email } = decode.data;

    const foundedEmail = await FindByEmail(email);

    if (!foundedEmail) return next(JWT_MALFORMED_401);

    next();
  } catch (err) {
    next(JWT_MALFORMED_401);
  }
};
