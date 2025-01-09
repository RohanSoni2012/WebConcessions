const User=require('../models/User')
const Admin=require('../models/Admin')
const jwt=require('jsonwebtoken')

const createToken=(regNo)=>{
    return jwt.sign({regNo},process.env.SECRET,{expiresIn:'3d'})
}

const signupUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.signup(email,password)

        //create Token
        const token=createToken(user.regNo)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.login(email,password)

        //create Token
        const token=createToken(user.regNo)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
const loginAdmin=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await Admin.login(email,password)

        //create Token
        const token=createToken(user.regNo)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
const signupAdmin=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await Admin.signup(email,password)

        //create Token
        const token=createToken(user.regNo)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
module.exports={signupUser,loginUser,loginAdmin,signupAdmin}
