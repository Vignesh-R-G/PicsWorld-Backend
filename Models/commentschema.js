const mongoose=require('mongoose')
const commentschema=mongoose.Schema({
    PostId:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        trim:true,
        required:true
    },
    Comment:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("commentschema",commentschema)