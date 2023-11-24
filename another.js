const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/reunion-housing';

MongoClient.connect(url, function (err, client) {
  console.log('Connected successfully to server');
  client.close();
});
