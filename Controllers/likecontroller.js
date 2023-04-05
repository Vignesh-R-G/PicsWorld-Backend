const express=require('express')
const likeschema=require('../Models/likeschema')

exports.postlike=async(req,res)=>{
    try{
        const like=await new likeschema({
            Name:req.body.name,
            PostId:req.body.postid,
            Like:req.body.like,
        })
        await like.save()
        const likes=await likeschema.find({PostId:req.body.postid}).count()
        res.json({status:true,msg:"Liked successfully !",likecount:likes})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Like"})
    }
}

exports.getlike=async(req,res)=>{
    try{
        const likes=await likeschema.find({PostId:req.params.postid}).sort({Date:-1})
        res.json({status:true,msg:likes})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in Get Likes"})
    }
}

exports.checklike=async(req,res)=>{
    try{
        const likes=await likeschema.findOne({$and:[{Name:req.body.name},{PostId:req.body.postid}]})
        if(likes){
            res.json({status:true,likeid:likes._id})
        }
        else{
            res.json({status:false})
        }
    }
    catch(err){
        res.json({status:false,msg:"Error occured in checklike"})
    }
}

exports.dislike=async(req,res)=>{
    try{
        const deletelike=await likeschema.deleteOne({_id:req.params._id})
        res.json({status:true,msg:"Disliked successfully",dislike:deletelike})
    }
    catch(err){
        res.json({status:false,msg:"Error occured in DisLike"})
    }
}