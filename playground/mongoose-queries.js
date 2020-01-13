const { mongoose }= require('./../server/db/mongoose')
const { ObjectID } = require('mongodb')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

var id = '5e1c818c39aa2162c097052f'
var userId = '5e1c591852eca21af88ecf6a'
// if(!ObjectID.isValid(id)) {
//     console.log('ID is invalid')
// }
// else { 
//     Todo.findById(id).then((todo) => {
//         if(!todo) return console.log('ID not found')
//         console.log('Todo by id', todo)
//     }).catch((err) => {
//         console.log('ID is invalid')
//     })
    
// }

// Todo.find({
//     _id:id
// }).then((todos) => {
//     if(!todo) return console.log('ID not found')
//     console.log('Todos', todos)
// })

// Todo.findOne({
//     _id:id
// }).then((todo) => {
//     if(!todo) return console.log('ID not found')
//     console.log('Todos', todo)
// })




if(!ObjectID.isValid(userId)) {
    console.log('ID is invalid')
}
else { 
    User.findById(userId).then((user) => {
        if(!user) return console.log('ID not found')
        console.log('Todo by id', user)
    }).catch((err) => {
        console.log('ID is invalid')
    })
    
}