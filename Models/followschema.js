const mongoose=require('mongoose')

const followschema=mongoose.Schema({
    From:{
        type:String,
        required:true
    },
    To:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("followschema",followschema)
