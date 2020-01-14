const {SHA256} = require('crypto-js')

const jwt =  require('jsonwebtoken')

var data ={ 
    id: 5
}

var token = jwt.sign(data, '123abc')

const decoded =jwt.verify(token , '123abc')
console.log('decoded', decoded )

// var message = "I am user number 1"
// var hash =SHA256(message).toString();

// console.log("Message", message)
// console.log("Hashing", hash)


// var data = {
//     id: 4, 
// }

// var token = { 
//     data, 
//     hash:SHA256(JSON.stringify(data) + "todosapphash").toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + "todosapphash").toString();

 
// if(resultHash === token.hash) {
//     console.log("Data was not changed")
// } else {
//     console.log("Data was changed do not trust")
// }