const express= require('express')
require('./db/mongoose')
const User=require('./models/user')
const Tasks=require('./models/task')
const userRoute=require('./routers/user')
const taskRoute=require('./routers/task')
const { findById, populate } = require('./models/user')



const app=express()
const port=process.env.PORT 


app.use(express.json())
app.use(userRoute)
app.use(taskRoute)


app.listen(port,()=>{

     console.log("Server started on "+port)
})




