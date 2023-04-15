const express=require('express')
const uploadcontroller=require("../Controllers/uploadcontroller")
const uploadMiddleware = require('../Middleware/MulterMiddleware')
const router=express.Router()
const uploadschema=require('../Models/uploadschema')

router.post("/upload",uploadMiddleware.single('photo'),async(req,res)=>{
    const photo=req.file.filename
    console.log(photo)
    const uploaddata=await new uploadschema({
        Title:req.body.title,
        Description:req.body.description,
        Category:req.body.category,
        photo:photo,
        PostedBy:req.body.postedby,
        Email:req.body.postedemail
    })
    await uploaddata.save()
    res.json({status:true,msg:"Post uploaded successfully"})
})


router.route("/getAllPosts").get(uploadcontroller.getAllPosts)
router.route("/deletepost/:id").delete(uploadcontroller.deletePosts)

module.exports=router