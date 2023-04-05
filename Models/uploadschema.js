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
    Imageurl:{
        type:String,
        required:true
    },
    PostedBy:{
        type:String,
        required:true
    },
    PostedDate:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("uploadschema",uploadschema)