const express=require('express')
const usercontroller=require('../Controllers/usercontroller')
const router=express.Router()

router.route("/register").post(usercontroller.signup)
router.route("/login").post(usercontroller.login)
router.route("/verify/:token").post(usercontroller.verify)
router.route("/posts/:useremail").get(usercontroller.userposts)
router.route("/addbio").post(usercontroller.addbio)
router.route("/editbio").put(usercontroller.editbio)
router.route("/getbio/:email").get(usercontroller.getbio)
router.route("/getprofile/:email").get(usercontroller.getprofile)
router.route("/uploadprofile").post(usercontroller.uploadprofile)
router.route("/uploadprofile").put(usercontroller.updateprofile)
  
module.exports=router