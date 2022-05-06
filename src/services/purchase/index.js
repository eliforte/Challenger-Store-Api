const ModelProducts = require('../../database/products');
const ModelUsers = require('../../database/users');
const ModelPurchases = require('../../database/purchase');
const { ApiError: { NewError } } = require('../../helpers/error');
const Messages = require('../../helpers/messages');

module.exports.Buy = async (products, userId, totalPrice) => {
  const user = await ModelUsers.FindById(userId);
  if (user.balance < totalPrice) return NewError(Messages.BALANCE_NOT_ENOUGH_409);

  const newBalance = Math.round(user.balance - totalPrice).toFixed(2);
  const uptadeUserBalance = await ModelUsers.ChangeBalance(userId,newBalance);
  
  products.map(async (product) => {
    const productHas = await ModelProducts.FindById(product._id);
    if (productHas.quantity < product.quantity) return NewError(Messages.QUANTITY_NOT_ENOUGH_409);
  
    const newQuantity = productHas.quantity - product.quantity;
  
    await ModelProducts.Edit(product._id, { quantity: newQuantity });
  })

  const createPurchase = await ModelPurchases.Create({ products, userId, totalPrice });
  return {
    purchase: { id: createPurchase.insertedId },
    user: { ...uptadeUserBalance },
  };
};
