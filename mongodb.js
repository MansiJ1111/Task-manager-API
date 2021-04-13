//CRUD create read update delete


const{MongoClient,ObjectID}=require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'



MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true},(error,client)=>{
    if(error){
         return console.log("Connection not formed")
    }
    const db=client.db(databaseName)

//    db.collection('users').findOne({name:'Mansi'},(error,user)=>{
//     if(error){
//         return console.log('Unable to connect')
//     }
//     console.log(user)

//    })

// db.collection('users').find({age:22}).toArray((error,users)=>{
//        console.log(users)
//     })

 

//  db.collection('users').find({age:22}).count((error,count)=>{
//     console.log(count)
//  })

// db.collection('task').findOne({_id:new ObjectID("605e2a2fc9593a2f4c25470e")},(error,task)=>{
// if(error){
//    return console.log('Unable to fetch')
// }
// console.log(task)

// })

// db.collection('task').find({completed:false}).toArray((error,tasks)=>{
//     console.log(tasks)
// })

// db.collection('users').updateOne({
//     _id: new ObjectID('605e285ad4dcec2938f8df01')
// },{
//     $inc:{
//         age:1 
//     }
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })
 
// db.collection('task').updateMany({
//     completed: false


// },{

//     $set:{
//         completed:true
//     }
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


// db.collection('users').deleteMany({
//     age:22
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })
db.collection('task').deleteOne({
    description:"cd Assignment"
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})

})


