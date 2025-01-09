const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')
const Rorganizations=require('./Aregister')

const Schema=mongoose.Schema

const adminschema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

adminschema.statics.signup=async function(email,password){

    if(!email||!password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough it must conatin 8 char including number,special char,Chapital Letter')
    }

    const exists=await this.findOne({email})
    if (exists){
        throw Error('Email already in use')
    }
    const register=await Rorganizations.findOne({email})
    if(!register){
        throw Error('Admin email is required')
    }

    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const regNo=register.regNo
    console.log(regNo)
    const user=await this.create({email,password:hash,regNo})
    return user
}
adminschema.statics.login=async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user=await this.findOne({email})

    if (!user){
        throw Error('Incorrect Email')
    }
    const match=await bcrypt.compare(password,user.password)
    
    if(!match){
        throw Error('Incorrect password')
    }
    return user

}

module.exports=mongoose.model('admin',adminschema)