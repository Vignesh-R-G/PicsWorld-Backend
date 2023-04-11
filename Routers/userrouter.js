const express=require('express')
const usercontroller=require('../Controllers/usercontroller')
const router=express.Router()

router.route("/register").post(usercontroller.signup)
router.route("/login").post(usercontroller.login)
router.route("/verify").post(usercontroller.verify)
router.route("/posts/:username").get(usercontroller.userposts)
  
module.exports=router