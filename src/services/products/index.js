const ModelProducts = require('../../database/products');
const { ApiError: { NewError } } = require('../../helpers/error');
const Messages = require('../../helpers/messages');

const validadeId = (id) => {
  if (!ObjectId.isValid(id)) return NewError(Messages.INVALID_ID_400);
};

module.exports.Create = async (name, price, quantity, description, infoUser) => {
  const productExist = await ModelProducts.FindByName(name);
  if (productExist) return NewError(Messages.PRODUCT_EXIST_409);
  const newProduct = await ModelProducts.Create({ name, price, quantity, description, infoUser });
  return newProduct;
};

module.exports.GetAll = async () => await Model.FindAll();

module.exports.FindOne = async (id) => {
  validadeId(id);
  const product = await ModelProducts.FindById(id);
  if (!product) return NewError(Messages.PRODUCT_NOT_EXIST_404);
  return product;
};

module.exports.Edit = async (id, infoProduct) => {
  validadeId(id);
  const product = await ModelProducts.Edit(id, infoProduct);
  if (!product) return NewError(Messages.PRODUCT_NOT_EXIST_404);
  return product;
};

module.exports.Delete = async (id) => {
  validadeId(id);
  await ModelProducts.Delete(id);
};
