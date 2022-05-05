require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_MALFORMED_401, MISSING_TOKEN_401, NOT_ADMIN_401 } = require('../../helpers/messages');
const { FindByEmail } = require('../../database/users');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports.CreateToken = (body) => jwt.sign({ data: body }, process.env.SECRET, jwtConfig);

module.exports.VerifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(MISSING_TOKEN_401.status).json(MISSING_TOKEN_401);
    }

    const decode = jwt.verify(authorization, process.env.SECRET);
    const { email, role } = decode.data;

    const foundedEmail = await FindByEmail(email);

    if (!foundedEmail) return next(JWT_MALFORMED_401);

    if(role === 'admin') {
      decode.data.actions = process.env.ADMIN_ACTIONS;
    }

    req.user = decode.data.actions = process.env.CLIENT_ACTIONS;

    next();
  } catch (err) {
    next(JWT_MALFORMED_401);
  }
};
