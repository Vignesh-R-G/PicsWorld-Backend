const mongoose=require('mongoose')
const profileschema=mongoose.Schema({
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
    Image:{
        type:String,
        trim:true,
        required:true
    }
})

module.exports=mongoose.model("profileschema",profileschema)