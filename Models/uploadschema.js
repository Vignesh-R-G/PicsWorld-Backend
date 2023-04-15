const mongoose=require('mongoose')

const uploadschema=mongoose.Schema({
    Title:{
        type:String,
        required:true,
        trim:true
    },
    Description:{
        type:String,
        required:true,
        trim:true
    },
    Category:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    PostedBy:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        trim:true,
        required:true
    },
    PostedDate:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("uploadschema",uploadschema)