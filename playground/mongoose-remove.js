const { mongoose }= require('./../server/db/mongoose')
const { ObjectID } = require('mongodb')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

var id = '5e1c818c39aa2162c097052f'
var userId = '5e1c591852eca21af88ecf6a'


// Todo.remove({}).then((result) => {
//     console.log(result)

// }).catch((error) => {
//     console.log(error)
// })

// Todo.findOneAndRemove('5e1d4dab1d80c65c641b9417').then((todo) => {
//     console.log(todo)
// })



Todo.findByIdAndRemove('5e1d4dab1d80c65c641b9417').then((todo) => {
    console.log(todo)
})
