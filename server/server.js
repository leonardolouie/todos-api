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



app.get('/todos', authenticate,  (req, res) => 
{   

    Todo.find({ _creator:req.user._id}).then((Todo) => {
        res.send({
            Todo
        })
    }, (e) => {
        res.send(e)
    })
    
})


app.get('/todos/:id', authenticate, (req, res) => {

    var { id } = req.params

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    else { 
        Todo.findOne({
             _id: id,
            _creator:req.user._Id
        }).then((todos) => {
            if(!todos)  return res.status(400).send()
            res.send({todos})
        }).catch((err) => {
            return res.status(400).send();
        })
        
    }

})

app.delete('/todos/:id', authenticate, (req, res) => {

    var { id} = req.params

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    else { 
        Todo.findOneAndRemove({
            _id:id,
            _creator:req.user.id
        }).then((todos) => {
            if(!todos)  return res.status(400).send()
            res.send({todos})
        }).catch((err) => {
            return res.status(400).send();
        })
        
    }

})

app.patch('/todos/:id', authenticate, (req, res ) => {

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

    Todo.findOneAndUpdate({
        _id:id,
        _creator:req.user.id
    }, {
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


app.post('/user/login', (req,res) => {
    var body = _.pick(req.body, ['email', 'password'])
    
    User.findByCredentials(body.email, body.password).then((user)=>{
     user.generateAuthToken().then((token) => {
         res.header('x-auth', token).send()
     })
    }).catch((e) => {
        res.status(400).send()
    })
})


app.delete('/users/me/token', authenticate, (req, res) => { 
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }).catch( (e) =>{
        res.status(400).send()
    }) 
  
})


app.get('/users/me', authenticate, (req,res) => {
   res.send(req.user)
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))


module.exports = { app }