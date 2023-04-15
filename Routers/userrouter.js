const express=require('express')
const usercontroller=require('../Controllers/usercontroller')
const profileschema = require('../Models/profileschema')
const uploadMiddleware = require('../Middleware/MulterMiddleware')
const router=express.Router()

router.route("/register").post(usercontroller.signup)
router.route("/login").post(usercontroller.login)
router.route("/verify").post(usercontroller.verify)
router.route("/posts/:useremail").get(usercontroller.userposts)
router.route("/addbio").post(usercontroller.addbio)
router.route("/editbio").put(usercontroller.editbio)
router.route("/getbio/:email").get(usercontroller.getbio)
router.route("/getprofile/:email").get(usercontroller.getprofile)
router.post("/uploadprofile",uploadMiddleware.single('photo'),async(req,res)=>{
    const photo=req.file.filename
    console.log(photo)
    const uploaddata=await new profileschema({
        Name:req.body.name,
        Email:req.body.email,
        Image:photo,
    })
    await uploaddata.save()
    res.json({status:true,msg:"Post uploaded successfully"})
})

router.put("/uploadprofile",uploadMiddleware.single('photo'),async(req,res)=>{
    const photo=req.file.filename
    const profile=await profileschema.updateOne({Email:req.body.email},{$set:{Image:photo}})
    res.json({status:true,msg:"Post uploaded successfully"})
})
  
module.exports=router