const express=require('express')
const {getConc,createConc,getAconc,deleteConcs,updateOrg,updateAorg,getallConc,updateConc,irdata}=require('../controllers/concController')
const requireAuth=require('../middleware/requireAuth')
const {pdfDoc}=require('../controllers/pdfController')

const router=express.Router()
router.use(requireAuth)

router.post('/',createConc)

router.patch('/:id',updateConc)

router.get('/',getConc)

router.get('/admin',getallConc)

router.get('/:regNo',getAconc)

router.delete('/:id',deleteConcs)

router.post('/Download',pdfDoc)

router.get('/ir',(req,res)=>{
    console.log("ok")
    res.status(200)
})
//update register and Admin for access database

router.post('/update',updateOrg)

router.post('/Aupdate',updateAorg)

module.exports=router
