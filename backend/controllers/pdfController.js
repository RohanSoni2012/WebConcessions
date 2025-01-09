const Railway=require('../models/RailwayConc')
const mongoose=require('mongoose')
const pdf=require('html-pdf')


const pdfTemplate=require('../document')

const pdfDoc=async(req,res)=>{

    const {_id}=req.body
    console.log(_id)
    const concId=`SH${_id}`
    const data=await Railway.find({concId})
    pdf.create(pdfTemplate(data[0]),{}).toFile('result.pdf',(err)=>{
       if(err){
        res.send(Promise.reject())
       } 
       res.send(Promise.resolve());
    })
}


module.exports={pdfDoc}