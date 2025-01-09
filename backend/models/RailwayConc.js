const mongoose=require('mongoose')
const Concession=require("./Conc")
const students=require("./User")

const Schema=mongoose.Schema

const railSchema=new Schema({
    concId:{
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
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    via:{
        type:String,
        required:true
    },
    clas:{
        type:String,
        required:true
    },
    period:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    collegeId:{
        type:String,
        required:true,
        unique:true
    },
    createdAt: {
        type: Date, expires: '4320m', index: true,
        default: Date.now}
})


railSchema.statics.trim=async function(concId,userRegNo){
    const collegeId=`SH${userRegNo}`
const conc=await Concession.findOne({userRegNo})
const std=await students.findOne({regNo:userRegNo})
console.log(userRegNo)
if(!std){
    throw Error('This regno can not be found')
}
const name=std.name
const DOB=std.DOB
const from=conc.from
const to=conc.to
const via=conc.via
const clas=conc.clas
const period=conc.period
const college="Shah and Achore"

const user=await this.create({concId,name,DOB,from,to,via,clas,period,college,collegeId})
}

module.exports=mongoose.model('Railway',railSchema)