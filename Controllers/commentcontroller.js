const express=require('express')
const mongoose=require('mongoose')
const commentschema=require('../Models/commentschema')

exports.postcomment=async(req,res)=>{
    const comment=await new commentschema({
        PostId:req.body.postid,
        UserName:req.body.username,
        Comment:req.body.comment
    })
    await comment.save()
    res.json({status:true,msg:comment})
}

exports.getcomment=async(req,res)=>{
    const postid=await req.params.postid
    const comments=await commentschema.find({PostId:postid},{PostId:0}).sort({Date:-1})
    if(comments.length!=0){
        res.json({status:true,msg:comments})
    }
    else{
        res.json({status:false,message:"No comments found"})
    }
}

exports.deletecomment=async(req,res)=>{
    const commentid=await req.params.id
    const deletecomments=await commentschema.deleteOne({_id:commentid})
    res.json({status:true,msg:deletecomments})
}
