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

  //const db =;
 
  //delete Many

    // client.db(dbName).collection('Todos').deleteMany({text:'Go eat food'}).then((res)=> {
    //     console.log(res);
    // })


  //Delete one
  
//   client.db(dbName).collection('Todos').deleteOne({text:'Go eat food'}).then((res)=> {
//     console.log(res);
//   })

  //find one and delete

//   client.db(dbName).collection('Todos').findOneAndDelete({completed:false}).then((res)=> {
//     console.log(res);
//   })



  //client.close();
});