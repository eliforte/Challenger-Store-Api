const {
  UNAUTHORIZED, CONFLICT, NOT_FOUND, BAD_REQUEST,
} = require('http-status-codes').StatusCodes;

module.exports.JWT_MALFORMED_401 = { message: 'Jwt malformed', status: UNAUTHORIZED };
module.exports.MISSING_TOKEN_401 = { message: 'Missing auth token', status: UNAUTHORIZED };
module.exports.EMAIL_EXIST_409 = { message: 'Email already registered', status: CONFLICT };
module.exports.INCORRECT_401 = { message: 'Incorrect username or password', status: UNAUTHORIZED };
module.exports.USER_NOT_EXIST_404 = { message: 'User not exist', status: NOT_FOUND };
module.exports.INVALID_ENTRIES_400 = { message: 'Invalid entries', status: BAD_REQUEST };
module.exports.NOT_ADMIN_401 = { message: 'Restricted to administrators', status: UNAUTHORIZED };
module.exports.INVALID_ID_400 = { message: 'Invalid product ID', status: BAD_REQUEST };
module.exports.PRODUCT_NOT_EXIST_404 = { message: 'Product not exist', status: NOT_FOUND };
module.exports.PRODUCT_EXIST_409 = { message: 'Product already registered', status: CONFLICT };
module.exports.BALANCE_NOT_ENOUGH_409 = { message: 'Balance not enough', status: CONFLICT };
module.exports.QUANTITY_NOT_ENOUGH_409 = { message: 'Quantity not enough', status: CONFLICT };

