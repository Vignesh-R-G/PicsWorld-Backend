const express=require('express')
const searchcontroller=require('../Controllers/searchcontroller')
const router=express.Router()

router.route("/title/:title").get(searchcontroller.filterByTitle)
router.route("/filter/:category").get(searchcontroller.filterByCategory)
router.route("/filterbyuser/:email").get(searchcontroller.filterByUser)

module.exports=router