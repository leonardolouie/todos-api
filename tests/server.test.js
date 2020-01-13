const expect = require('expect')
const request = require('supertest')

const { app } = require('../server/server')

const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/todo')

beforeEach((done) => {
    Todo.remove({}).then((done)=>{
        return done()
    })
})


describe('POST /todos', ()=> {

     it('Should Create new todo', (done) => {
         var text = 'Test todo text'

       request(app).post('/todos').send({text}).expect(200).expect((res)=>{
       expect(res.body.text).toBe(text)
       }).end((err, res)=>{
            
        if(err) {
          return  done(err)
        }
        Todo.find().then((todos) => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done();
        }).catch((err)=>{ return done() }) 
       })
     })


})