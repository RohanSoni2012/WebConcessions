const mongoose=require('mongoose')

const Schema=mongoose.Schema

const concSchema=new Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        default:"Govandi"
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
    grant:{
        type:Boolean,
        default:false
    },
    reject:{
        type:Boolean,
        default:false
    },
    userRegNo:{
        type:String,
        required:true
    },
    comment:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('Concession',concSchema)