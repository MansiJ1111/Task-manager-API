const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Tasks=require('./task')

const userSchema=new mongoose.Schema({

    name:{
type:String,
required: true,
trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,
        validate(value){
if(value.toLowerCase().includes('password')){
    throw new Error("Password cannot contaion 'password'")
}
        }
    },
    email:{
        unique:true,
type:String,
required: true,
trim:true,
lowercase:true,
validate(value){
    if(!validator.isEmail(value)){
        throw new Error("Email not valid")
    }
}
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0)
            throw new Error("Age should be positive.");
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar: {
        type:Buffer
    }
},{

    timestamps:true
})

userSchema.virtual('tasks',{
ref:'Tasks',
localField:'_id',//user id is relationship between that and task owner field
foreignField:'owner'

})

 


userSchema.methods.toJSON=function (){
    const user=this
    const userObject=user.toObject()


    delete userObject.password
    delete userObject.tokens
    delete userObject.avatars
    return userObject
}


userSchema.methods.generateAuthToken=async function (){
const user=this
const token=jwt.sign({_id: user._id.toString() },process.env.JWT_SECRET)

user.tokens=user.tokens.concat({token})
await user.save()
return token
}

userSchema.statics.findbByCredentials=async (email,password)=>{
 const user=await User.findOne({email})
 if(!user){
     throw new Error('Unable to login')

 }
 const isMatched=await bcrypt.compare(password,user.password)
 if(!isMatched){
     throw new Error('Unable to login')

 }
 return user
}


//Hash the plain text password
userSchema.pre('save', async function(next){

const user =this
if(user.isModified('password')){
user.password=await bcrypt.hash(user.password,8)

}
    next()
})


//Delete task user when user deletes its profile.

userSchema.pre('remove',async function(next){
    const user=this
    await Tasks.deleteMany({owner:user._id})
    next()
})

const User =mongoose.model('Users',userSchema)

module.exports=User