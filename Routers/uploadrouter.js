const express=require('express')
const uploadcontroller=require("../Controllers/uploadcontroller")
const router=express.Router()

router.route("/upload").post(uploadcontroller.upload)
router.route("/getAllPosts").get(uploadcontroller.getAllPosts)

module.exports=router