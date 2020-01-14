const validator =require('validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema( {
    email:{ 
     type:String,
     required:true,
     minlength :1,
     trim:true,
     unique:true,
     validate : {
         validator :validator.isEmail,
         message: '{VALUE} is not valid email'
     }
    },
    password:{
        type:String, 
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
         type:String, 
         required:true
        },
        token:{
         type:String, 
         required:true
        }
    }]
    
});

UserSchema.methods.toJSON =  function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
      var user = this;
      var access = 'auth';
      var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();

      user.tokens.push({access,token})
     
      return user.save().then(()=>{
          return token;
      })

}


UserSchema.statics.findBySample = function (sample) {
    return this
}


UserSchema.statics.findByToken = function (token) { 
    
    var User = this
    var decoded;


    try {
        decoded = jwt.verify(token, 'abc123')

    } catch (e) {
      return Promise.reject()
    }
      
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
     
}

UserSchema.pre('save', function(next) {

    var user = this
    var { password } = user
    if(user.isModified('password')) { 
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, (err, hash)=>{
              user.password = hash
              next();
            })
         })
    } else { 
        next();
    }
    
})


const User = mongoose.model('User', UserSchema)

module.exports = { 
    User
}
