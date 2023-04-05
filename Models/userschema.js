const mongoose=require('mongoose')
const userschema=mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    MobileNumber:{
        type:Number,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("userschema",userschema)