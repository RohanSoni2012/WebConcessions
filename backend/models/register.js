const mongoose=require('mongoose')

const Schema=mongoose.Schema
const userSchema=new Schema({
    regNo:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:false
    },
    DOB:{
        type:String,
        required:true,
        unique:false
    }
})
module.exports=mongoose.model('organizations',userSchema)