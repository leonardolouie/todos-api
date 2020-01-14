const _ = require('lodash')
const { mongoose } = require('./db/mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')


const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const { authenticate } = require('./middleware/authenticate')

const app = express();
const port =  process.env.PORT || 3000


app.use(bodyParser.json());


app.get('/',  (req, res) => 
{   
  res.send('API FOR TODOS APP')
    
})

app.post('/todos',  (req, res) => 
{   
     
    const body = _.pick(req.body, ['text'])
    const todo = new Todo(body)

    todo.save().then((doc) => {
        res.send(doc)

    }, (err)=> {

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

app.delete('/todos/:id', (req, res) => {

    var { id} = req.params

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    else { 
        Todo.findByIdAndDelete(id).then((todos) => {
            if(!todos)  return res.status(400).send()
            res.send({todos})
        }).catch((err) => {
            return res.status(400).send();
        })
        
    }

})

app.patch('/todos/:id', (req, res ) => {

    var { id } = req.params
    var body = _.pick(req.body, ['text', 'completed'])
     
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {
        $set:  body 
    }, {new :  true}).then((todos) => {
        if(!todos)  return res.status(400).send()
        res.send({todos, message:'sucess'})
    }).catch((err) => {
        return res.status(400).send();
    })


});

app.post('/user', (req, res) => {
      
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body)

    user.save().then(()=> {
       return  user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((err) => { 
        res.send(err)
    })
 
})


app.get('/users/me', authenticate, (req,res) => {
   res.send(req.user)
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))


module.exports = { app }