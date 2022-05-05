require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const { JWT_MALFORMED_401, MISSING_TOKEN_401 } = require('../../helpers/messages');
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
      return res.status(UNAUTHORIZED).json(MISSING_TOKEN_401);
    }
    const decoded = jwt.verify(authorization, process.env.SECRET);
    const { email } = decoded.data;
    const foundedEmail = await FindByEmail(email);
    if (!foundedEmail) return next(JWT_MALFORMED_401);
    req.user = decoded.data;
    next();
  } catch (err) {
    next(JWT_MALFORMED_401);
  }
};
