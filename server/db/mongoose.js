var mongoose = require('mongoose')
mongoose.Promise = global.Promise
// eslint-disable-next-line no-undef
mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true,  useUnifiedTopology: true })


module.exports = { 
  mongoose
}

