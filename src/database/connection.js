require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(processo.env.MONGODB_URL, OPTIONS);

const connection = async () => {
  try {
    client.connect();
    client.on('error', (error) => console.error(error));
    client.once('open', () => console.log('Connected to the database!'));
  } catch (err) {
    console.log('Connection failed');
  }
};

connection();

module.exports = { client };
