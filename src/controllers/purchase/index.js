const { OK } = require('http-status-codes').StatusCodes;
const PurchaseService = require('../../services/purchase');

module.exports.Buy = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { products, totalPrice } = req.body;
    const buyedProduct = await PurchaseService.Buy(products, userId, totalPrice);
    return res.status(OK).json(buyedProduct);
  } catch (err) {
    next(err);
  }
};
