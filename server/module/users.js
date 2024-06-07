const mongoose = require('mongoose')
const ModelSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
        maxlength: 50
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true,
        minlength: 6
    }
})

ModelSchema.virtual("id").get(function() {
    return this._id.toHexString()
})
ModelSchema.set("toJSON", {virtuals: true})


const Model = mongoose.model('Users', ModelSchema)
module.exports = Model