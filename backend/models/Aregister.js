const mongoose=require('mongoose')

const Schema=mongoose.Schema
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
module.exports=mongoose.model('Aorganizations',userSchema)