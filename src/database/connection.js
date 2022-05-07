require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const url = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URL : 'mongodb://localhost:27017/voll-solutions-chanllenger';

const client = new MongoClient(url, OPTIONS);

const connection = async () => {
  try {
    client.connect();
    client.on('error', (error) => console.error(error));
    client.once('open', () => console.log('Connected to the database!'));
    console.log(url);
  } catch (err) {
    console.log('Connection failed');
  }
};

connection();

module.exports = { client };
