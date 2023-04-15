const mongoose=require('mongoose')
const likeschema=mongoose.Schema({
    PostId:{
        type:String,
        required:true
    },
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
    Like:{
        type:Boolean,
        default:false
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model("likeschema",likeschema)