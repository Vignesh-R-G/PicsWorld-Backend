const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const userrouter=require('./Routers/userrouter')
const uploadrouter=require('./Routers/uploadrouter')
const searchrouter=require('./Routers/searchrouter')
const commentrouter=require('./Routers/commentrouter')
const likerouter=require('./Routers/likerouter')
const cors=require('cors')

require('dotenv/config')

const app=express()
app.use(express.json())
app.use(cors())

app.use(morgan('dev'))
app.use(express.static('Public'))

app.use("/user",userrouter)
app.use("/profile",uploadrouter)
app.use("/search",searchrouter)
app.use('/comments',commentrouter)
app.use('/like',likerouter)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("Server started at port : "+PORT)
})

const MYDB=process.env.MYDB
mongoose.connect(MYDB)
db=mongoose.connection
db.on("open",(err)=>{
    if(err){
        console.log("Connection Error")
    }
    else{
        console.log("Database Connected")
    }
})




