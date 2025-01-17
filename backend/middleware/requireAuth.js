const jwt = require('jsonwebtoken')
const User=require('../models/User')

const requireAuth=async(req,res,next)=>{

    //verify authentication
    const {authorization}=req.headers

    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }

    const token=authorization.split(' ')[1]
    try{
        const {regNo}=jwt.verify(token,process.env.SECRET)
        req.user=await User.findOne({regNo}).select('regNo')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }


}
module.exports=requireAuth