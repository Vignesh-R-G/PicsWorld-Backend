const express=require('express')
const mongoose=require('mongoose')
const uploads=require('../Models/uploadschema')
const userschema=require('../Models/userschema')
exports.filterByTitle=async(req,res)=>{
    const details=await uploads.find({Title:req.params.title})
    if(details.length==0){
        return res.json({status:false,message:"No Posts found"})
    }
    else{
        return res.json({status:true,msg:details})
    }
}

exports.filterByCategory=async(req,res)=>{
    try{
        const posts=await uploads.find({Category:req.params.category}).sort({PostedDate:-1})
        if(posts.length==0){
            res.json({status:false,message:"No Posts Found"})
        }
        else{
            res.json({status:true,msg:posts})
        }
    }
    catch{
        res.json({status:false,msg:"Error occured in Category"})
    }
}

exports.filterByUser=async (req,res)=>{
    try{
        const user=await userschema.find({Email:req.params.email})
        if(user){
            res.json({status:true,msg:user})
        }
        else{
            res.json({status:false,msg:"No user Found"})
        }
    }
    catch(e){
        res.json({status:false,message:"Error occured in Searching the user"})
    }
}

