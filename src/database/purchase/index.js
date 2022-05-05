const { ObjectId } = require('mongodb');
const { client } = require('../connection');
const DB_COLLECTION = 'purchase';

const userCollection = client.db(process.env.DB_NAME).collection(DB_COLLECTION);

module.exports.Create = async ({ products, userInfo, totalPrice }) => await userCollection.insertOne({ products, userInfo, totalPrice });

module.exports.FindAllByUserId = async (userId) => userCollection.find({ userId }).toArray();

module.exports.FindById = async (id) => userCollection.findOne(ObjectId(id));