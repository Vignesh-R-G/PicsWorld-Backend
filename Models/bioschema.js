const mongoose=require('mongoose')
const bioschema=mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        trim:true,
        required:true
    },
    Bio:{
        type:String,
        trim:true,
        required:true
    }
})

module.exports=mongoose.model("bioschema",bioschema)