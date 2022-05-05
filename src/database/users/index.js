const { ObjectId } = require('mongodb');
const { client } = require('../connection');

const DB_NAME = 'vull-solution-api';
const DB_COLLECTION = 'users';

const userCollection = client.db(DB_NAME).collection(DB_COLLECTION);

module.exports.Create = async ({ email, password, name }) => userCollection.insertOne({ email, password, name });
module.exports.FindByEmail = async (email) => userCollection.findOne({ email });
module.exports.FindById = async (id) => userCollection.findOne(ObjectId(id));
