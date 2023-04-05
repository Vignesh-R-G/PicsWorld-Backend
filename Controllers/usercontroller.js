const express=require('express')
const mongoose=require('mongoose')
const userschema=require('../Models/userschema')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
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
                res.json({status:true,msg:"Signed in successfully !",token:token,username:user.Name})
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
                res.json({status:true,msg:"Login successful !",username:user.Name})
            }
        })
    }
    catch(err){
        res.json({status:false})
    }

}
