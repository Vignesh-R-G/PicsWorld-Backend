const express=require('express')
const searchcontroller=require('../Controllers/searchcontroller')
const router=express.Router()

router.route("/title/:title").get(searchcontroller.filterByTitle)

module.exports=router