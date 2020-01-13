const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express();
const port =  process.env.PORT || 3000


app.use(bodyParser.json());


app.get('/',  (req, res) => 
{   
  res.send('API FOR TODOS APP')
    
})
app.post('/todos',  (req, res) => 
{   
    console.log(req.body)
    const todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) =>{
        res.send(doc)
    }, (err)=>{
      res.send(err)
    }
    )
})

app.get('/todos',  (req, res) => 
{   
   
    Todo.find().then((Todo) => {
        res.send({Todo})
    }, (e) => {
        res.send(e)
    })
    
})


app.get('/todos/:id', (req, res) => {

    var { id} = req.params
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    else { 
        Todo.findById(id).then((todos) => {
            if(!todos)  return res.status(400).send()
            res.send({todos})
        }).catch((err) => {
            return res.status(400).send();
        })
        
    }

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


module.exports = { app }