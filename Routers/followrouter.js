const express=require('express')
const router=express.Router()
const followcontroller=require('../Controllers/followcontroller')

router.route("/addfollow").post(followcontroller.addfollow)
router.route("/getfollowers/:email").get(followcontroller.getfollowers)
router.route("/getfollowing/:email").get(followcontroller.getfollowing)
router.route("/isfollowing").post(followcontroller.isfollowing)
module.exports=router