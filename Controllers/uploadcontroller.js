const express=require('express')
const mongoose=require('mongoose')
const uploadschema=require('../Models/uploadschema')
const jwt=require('jsonwebtoken')
require('dotenv/config')

exports.upload=async (req,res)=>{
        const uploaddata=await new uploadschema({
            Title:req.body.title,
            Description:req.body.description,
            Category:req.body.category,
            Imageurl:req.body.imageurl,
            PostedBy:req.body.postedby
        })
        await uploaddata.save()
        res.json({status:true,msg:"Post uploaded successfully"})
    
        
}

exports.getAllPosts=async (req,res)=>{

    try{
        const posts=await uploadschema.find().sort({PostedDate:-1})
        res.json({status:true,msg:posts})
    }
    catch(err){
        res.json({status:false,msg:"Failed to retrieve all posts !"})
    }
}

