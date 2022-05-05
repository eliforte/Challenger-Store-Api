const { ObjectId } = require('mongodb');
const { client } = require('../connection');
const DB_COLLECTION = 'products';

const userCollection = client.db(process.env.DB_NAME).collection(DB_COLLECTION);

module.exports.Create = async ({ name, price, quantity, description }) => (
  await userCollection.insertOne({ name, price, quantity, description })
);

module.exports.FindByName = async (name) => userCollection.findOne({ name: { $regex: `/${name}/i` } });

module.exports.FindById = async (id) => userCollection.findOne(ObjectId(id));

module.exports.FindAll = async () => userCollection.find({}).toArray();

module.exports.Edit = async (id, infoGame) => {
  const { value } = await userCollection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: infoGame },
    { returnOriginal: false , returnDocument: 'after'},
  );

  return value;;
};

module.exports.Delete = async (id) => await userCollection.deleteOne({ _id: ObjectId(id) });
