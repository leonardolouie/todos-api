const { MongoClient, ObjectID } = require('mongodb');


const assert = require('assert')
 
// Connection URL
const url = 'mongodb://localhost:27017'
 
// Database Name
const dbName = 'todoapp'
 
// Use connect method to connect to the server
MongoClient.connect(url,  { useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err)
  console.log("Connected successfully to server");
 
  const db = client.db(dbName)

  client.close()
});