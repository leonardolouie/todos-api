const { MongoClient, ObjectID } = require('mongodb');


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


    //find 
  //  db.collection('Todos').find(
  //    {
  //    _id: new ObjectID('5e1888d76b5bef40a4945edd')
  //   }
  //    ).toArray().then((docs)=>{
  //    console.log('Todos')
  //    console.table(JSON.stringify(docs, undefined, 2))

  //  }, (err) => { 
  //   console.log('Unable to fetch todos', err)
  //  })

 //find by id 
   db.collection('Users').find(
    {
    name: 'Leonardo louie'
   }
    ).count().then((docs)=>{
    console.log('Todos')
    console.table(JSON.stringify(docs, undefined, 2))

  }, (err) => { 
   console.log('Unable to fetch todos', err)
  })


  // db.collection('Todos').find(
  //   {
  //   _id: new ObjectID('5e1888d76b5bef40a4945edd')
  //  }
  //   ).count().then((docs)=>{
  //   console.log('Todos')
  //   console.table(JSON.stringify(docs, undefined, 2))

  // }, (err) => { 
  //  console.log('Unable to fetch todos', err)
  // })


  //  // update 
  // db.collection('Todos').updateOne(
  //   {
  //   _id: new ObjectID('5e1888d76b5bef40a4945edd')
  //  },
  //  { $set: { text : "qwewqeqeqeqeqeqeq" } }
  //   ).then((docs)=>{
  //   console.log('Todos')
  //   console.table(JSON.stringify(docs, undefined, 2))

  // }, (err) => { 
  //  console.log('Unable to fetch todos', err)
  // })



  // client.close();
});