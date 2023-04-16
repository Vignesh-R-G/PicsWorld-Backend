const multer=require('multer')
const {v4:uuidv4}=require('uuid')
const path=require('path')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"https://pics-world-backend-r7e4.onrender.com/uploads")
    },
    filename:function(req,file,cb){
        cb(null,`${uuidv4()}_${path.extname(file.originalname)}`)
    }
})

const fileFilter=(req,file,cb)=>{
    const allowedFileTypes=["image/jpeg","image/jpg","image/png","image/webp"]
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const uploadMiddleware=multer({storage,fileFilter})

module.exports=uploadMiddleware