require('dotenv').config();
const { ObjectId } = require('mongodb');
const { client } = require('../connection');

const DB_COLLECTION = 'users';

const userCollection = client.db(process.env.DB_NAME).collection(DB_COLLECTION);

module.exports.Create = async ({ email, password, name }) => userCollection.insertOne({ email, password, name });
module.exports.FindByEmail = async (email) => userCollection.findOne({ email });
module.exports.FindById = async (id) => userCollection.findOne(ObjectId(id));
