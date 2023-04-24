const express=require('express')
const followschema=require('../Models/followschema')

exports.addfollow=async(req,res)=>{
    try{
        const follow=await new followschema({
            From:req.body.from,
            To:req.body.to
        })
        await follow.save()
        res.json({status:true,msg:follow})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Adding the follow"})
    }
}

exports.getfollowers=async(req,res)=>{
    try{
        const followers=await followschema.find({To:req.params.email})
        if(followers.length===0)
            res.json({status:false,count:followers.length,msg:"No followers found"})
        else
            res.json({status:true,count:followers.length,msg:followers})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getfollowers"})
    }
}

exports.getfollowing=async(req,res)=>{
    try{
        const following=await followschema.find({From:req.params.email})
        if(following.length===0)
            res.json({status:false,count:following.length,msg:"No following found"})
        else
            res.json({status:true,count:following.length,msg:following})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in getfollowing"})
    }
}

