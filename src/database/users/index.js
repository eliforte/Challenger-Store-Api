require('dotenv').config();
const { ObjectId } = require('mongodb');
const { client } = require('../connection');

const DB_COLLECTION = 'users';

const userCollection = client.db(process.env.DB_NAME).collection(DB_COLLECTION);

module.exports.Create = async ({ email, password, name, role, balance }) => await userCollection.insertOne({ email, password, name, role, balance });

module.exports.FindByEmail = async (email) => userCollection.findOne({ email });

module.exports.FindById = async (id) => userCollection.findOne(ObjectId(id));

module.exports.ChangeBalance = async (id, balance) => {
  const { value } = await userCollection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { balance } },
    { returnOriginal: false , returnDocument: 'after'},
  );

  return value;
};
