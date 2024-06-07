const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({ 
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        require: true
    },
    photo:{
        type: mongoose.Schema.ObjectId,
        ref: 'Photos',
        require: true
    },
       
 
})



// لحذف 
// v
// من الجدول
// و تعديل كتابه
// _id to id ☺
ModelSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) =>{
        delete ret._id
    }
})

const Model = mongoose.model('Likes', ModelSchema)
module.exports = Model