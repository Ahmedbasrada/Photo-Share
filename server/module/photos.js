const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
  title:{
    type: String,
    require: true,

  },
  description:{
    type: String,
    require: true,
    
  },
  
  likes:{
    type: Number,
    default: 0
  },
  
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        require: true
    },
       
 
})



ModelSchema.virtual("id").get(function() {
  return this._id.toHexString()
})

const Model = mongoose.model('Photos', ModelSchema)
module.exports = Model