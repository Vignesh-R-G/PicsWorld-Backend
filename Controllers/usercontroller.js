const express=require('express')
const mongoose=require('mongoose')
const userschema=require('../Models/userschema')
const uploadschema=require('../Models/uploadschema')
const bioschema=require('../Models/bioschema')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const profileschema = require('../Models/profileschema')
require('dotenv/config')

exports.signup=async(req,res)=>{
    try{
        const emailcheck=await userschema.findOne({Email:req.body.email})
        if(emailcheck){
            res.json({status:false,msg:"Email Already Exist !"})
        }
        else{
            const hashedpassword=await bcrypt.hash(req.body.password,10)
            const newuser=await new userschema({
                Name:req.body.name,
                Email:req.body.email,
                Age:req.body.age,
                MobileNumber:req.body.mno,
                Password:hashedpassword
            })
            await newuser.save()
            res.json({status:true,msg:"Account created successfully !"})
        }   
    }
    catch(err){
        res.json({status:false,msg:"Error Occured in signup"})
    }
}

exports.login=async(req,res)=>{
        const user=await userschema.findOne({Email:req.body.email})
        if(user){
            const checkpassword=await bcrypt.compare(req.body.password,user.Password)
            if(checkpassword){
                const token=await jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:"1d"})
                res.json({status:true,msg:"Signed in successfully !",token:token,username:user.Name,useremail:user.Email})
            }
            else{
                res.json({status:false,msg:"Invalid password"})
            }
        }
        else{
            res.json({status:false,msg:"User not found!"})
        }
    
}

exports.verify=async(req,res)=>{
    const token=await req.body.token
    try{
        const tokenverify=await jwt.verify(token,process.env.SECRETKEY,async(err,decoded)=>{
            if(err){
                res.json({status:false,msg:"Authentication Expired"})
            }
            else{
                const user=await userschema.findById({_id:decoded.id})
                res.json({status:true,msg:"Login successful !",username:user.Name,useremail:user.Email})
            }
        })
    }
    catch(err){
        res.json({status:false})
    }

}

exports.userposts=async(req,res)=>{
    const posts=await uploadschema.find({Email:req.params.useremail}).sort({Date:-1})
    if(posts.length>0){
        res.json({status:true,msg:posts})
    }
    else{
        res.json({status:false,msg:"No posts Found"})
    }
}


exports.addbio=async(req,res)=>{
    try{
        const bio=await new bioschema({
            Name:req.body.name,
            Email:req.body.email,
            Bio:req.body.bio
        })
        await bio.save()
        res.json({status:true,msg:bio.Bio})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in adding the bio"})
    }
}

exports.editbio=async(req,res)=>{
    try{
        const bio=await bioschema.updateOne({_id:req.body.id},{$set:{Bio:req.body.bio}})
        res.json({status:true,msg:bio.Bio})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in updating the bio"})
    }
}

exports.getbio=async(req,res)=>{
    try{
        const bio=await bioschema.findOne({Email:req.params.email})
        if(bio)
            res.json({status:true,msg:bio})
        else
            res.json({status:false,msg:""})
    }
    catch(e){
        res.json({status:false,msg:"Error occured in Getting the bio"})
    }
}

exports.getprofile=async(req,res)=>{
    try{
        const profile=await profileschema.findOne({Email:req.params.email})
        if(profile){
            res.json({status:true,msg:profile.Image})
        }
        else{
            res.json({status:false,msg:""})
        }
    }
    catch(e){
        res.json({status:false,msg:"Error occured in setting the profile image"})
    }
}

exports.uploadprofile=async(req,res)=>{
    const uploaddata=await new profileschema({
        Name:req.body.name,
        Email:req.body.email,
        Image:req.body.image
    })
    await uploaddata.save()
    res.json({status:true,msg:"Post uploaded successfully"})
}

exports.updateprofile=async(req,res)=>{
    const profile=await profileschema.updateOne({Email:req.body.email},{$set:{Image:req.body.image}})
    res.json({status:true,msg:"Post uploaded successfully"})
}
