const express=require('express')
const mongoose=require('mongoose')
const uploads=require('../Models/uploadschema')
exports.filterByTitle=async(req,res)=>{
    const details=await uploads.find({Title:req.params.title})
    if(details.length==0){
        return res.json({status:true,message:"No pics found"})
    }
    else{
        return res.json({status:true,msg:details})
    }
}