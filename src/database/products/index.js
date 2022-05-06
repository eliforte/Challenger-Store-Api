const { ObjectId } = require('mongodb');
const { client } = require('../connection');

const DB_COLLECTION = 'products';

const userCollection = client.db(process.env.DB_NAME).collection(DB_COLLECTION);


module.exports.Create = async (infoProducts) => await userCollection.insertOne({ ...infoProducts });

module.exports.FindByName = async (name) => userCollection.findOne({ name });

module.exports.FindById = async (id) => userCollection.findOne(ObjectId(id));

module.exports.FindAll = async () => userCollection.find({}).toArray();

module.exports.Edit = async (id, infoGame) => {
  const { value } = await userCollection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: infoGame },
    { returnDocument: 'after', returnOriginal: false },
  );
  
  return value;
};

module.exports.Delete = async (id) => await userCollection.deleteOne({ _id: ObjectId(id) });
