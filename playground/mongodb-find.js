const { MongoClient } = require('mongodb');


const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'todoapp';
 
// Use connect method to connect to the server  
MongoClient.connect(url,  { useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);


  db.collection('Users').insertOne(
    {name:'Leonardo louie', age:'21', location: 'Lambak lalakhan Santa Maria bulacan' }, 
    
    (err, result)=>{

    assert.equal(null, err);
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))

  })

  db.collection('Todos').insertOne(
    {text:'Go eat food', completed: true }, 
    
    (err, result)=>{

    assert.equal(null, err);  
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))

  })
   


  

 
  client.close();
});