const express=require('express')
const uploadcontroller=require("../Controllers/uploadcontroller")
const router=express.Router()
const uploadschema=require('../Models/uploadschema')

router.route("/upload").post(uploadcontroller.uploadPost)
router.route("/getAllPosts").get(uploadcontroller.getAllPosts)
router.route("/deletepost/:id").delete(uploadcontroller.deletePosts)

module.exports=router