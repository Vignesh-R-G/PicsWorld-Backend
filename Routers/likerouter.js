const express=require('express')
const router=express.Router()
const likecontroller=require('../Controllers/likecontroller')

router.route("/postlikes").post(likecontroller.postlike)
router.route("/getlikes/:postid").get(likecontroller.getlike)
router.route("/dislikes/:_id").delete(likecontroller.dislike)
router.route("/checklikes").post(likecontroller.checklike)

module.exports=router