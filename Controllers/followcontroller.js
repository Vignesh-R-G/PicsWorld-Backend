const express=require('express')
const followschema=require('../Models/followschema')

exports.addfollow=async(req,res)=>{
    try{
        const follow=await new followschema({
            From:req.body.from,
            To:req.body.to,
            FromName:req.body.fromname,
            ToName:req.body.toname
        })
        await follow.save()
        res.json({status:true,msg:follow})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Adding the follow"})
    }
}

exports.isfollowing=async(req,res)=>{
    try{
        const useremail=await req.body.useremail
        const searchuseremail=await req.body.searchuseremail
        const isfollow=await followschema.find({$and:[{From:useremail},{To:searchuseremail}]})
        if(isfollow.length>0){
            res.json({status:true,msg:"Following"})
        }
        else{
            res.json({status:false,msg:"Not following"})
        }
    }
    catch(err){
        res.json({status:false,msg:"Error occured in isfollowing"})
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

exports.unfollow=async(req,res)=>{
    try{
        const useremail=await req.params.useremail
        const searchuseremail=await req.params.searchuseremail
        const deletefollow=await followschema.deleteOne({To:searchuseremail})
        res.json({status:true,msg:deletefollow})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Unfollow"})
    }
}

