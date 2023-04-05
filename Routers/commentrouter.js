const express=require('express')
const commentcontroller=require('../Controllers/commentcontroller')
const router=express.Router()

router.route("/postcomments").post(commentcontroller.postcomment)
router.route("/getcomments/:postid").get(commentcontroller.getcomment)
router.route("/deletecomment/:id").delete(commentcontroller.deletecomment)

module.exports=router
