const mongoose=require('mongoose')
const Concession=require('../models/Conc')
const organizations=require('../models/register')
const Aorganizations=require('../models/Aregister')
const Railway=require('../models/RailwayConc')
// const pdf=require('react-pdf-html')

const getConc=async(req,res)=>{
    const userRegNo=req.user.regNo
    const conc=await Concession.find({userRegNo}).sort({createdAt:-1})

    res.status(200).json(conc)
}
const getallConc=async(req,res)=>{
    const conc=await Concession.find({grant:false}).sort({createdAt:-1})
    res.status(200).json(conc)
}

const createConc=async(req,res)=>{
    const {from,via,clas,period}=req.body
    let emptyFields=[]
    if(!from){
        emptyFields.push('from')
    }
    if(!via){
        emptyFields.push('via')
    }
    if(!clas){
        emptyFields.push('class')
    }
    if(!period){
        emptyFields.push('period')
    }
    
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }
    try{
        //
        const userRegNo=req.user.regNo
        const conc=await Concession.create({from,via,clas,period,userRegNo})
        res.status(200).json(conc)
    }catch(error){
        res.status(400).json({error:error.message})
    }
   
}

const deleteConcs=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such application"})
    }
    const concession=await Concession.findOneAndDelete({_id:id})
    if(!concession){
        return res.status(404).json({error:"No such application"})
    }
    res.status(200).json(concession)
}

const getAconc=async(req,res)=>{
    const {regNo}=req.params
    const concession=await Concession.findById(regNo)
    if(!concession){
        return res.status(404).json({error:"No such application"})
    }
    res.status(200).json(concession)
}
const updateOrg=async(req,res)=>{
    const {regNo,email,name,DOB}=req.body
    try{
        //
        const conc=await organizations.create({regNo,email,name,DOB})
        res.status(200).json(conc)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
const updateAorg=async(req,res)=>{
    const {email}=req.body
    try{
        const conc=await Aorganizations.create({email})
        res.status(200).json(conc)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
const updateConc=async(req,res)=>{
    const {id}=req.params
    const {approval,comment}=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such workout"})
    }
    if(approval){
        const conc=await Concession.findOneAndUpdate({_id: id},{grant:true},{new:true})
        if(!conc){
            return res.status(404).json({error:"No such workout"})
        }
        if(conc){console.log(conc._id)
                const userReg=conc._id
                const userRegNo=conc.userRegNo
                
                const concId=`SH${userReg}`
                Railway.trim(concId,userRegNo)
                res.status(200).json(conc)
        }
    }else{
        const conc=await Concession.findOneAndUpdate({_id: id},{reject:true,grant:true,comment:comment },{new:true})
        if(!conc){
            return res.status(404).json({error:"No such workout"})
        }
        res.status(200).json(conc)
    }
//    const conc=await approval ? Concession.findOneAndUpdate({_id: id},{
//         grant:true},{new:true}) : Concession.findOneAndUpdate({_id: id},{reject:true,grant:true },{new:true})
    
   
}
const irdata=async(req,res)=>{
    const userRegNo=req.user.regNo
    const collegeId=`SH${userRegNo}`
    const conc=await Railway.find({collegeId})
    res.status(200).json(conc)
}
const irdelete=async(req,res)=>{
    const {id}=req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:"no such application"})
    // }
    // const concId=`SH${id}`
    // console.log(concId)
    // Railway.findOneAndDelete({concId:concId})
    const userRegNo=req.user.regNo
    const collegeId=`SH${userRegNo}`
    console.log(collegeId)
    const conc=await Railway.findOneAndDelete({collegeId})
    res.status(200).json(conc)
 
}


module.exports={getConc,createConc,deleteConcs,getAconc,updateOrg,updateAorg,getallConc,updateConc,irdata,irdelete}