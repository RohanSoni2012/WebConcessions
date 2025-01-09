const express=require('express')
const requireAuth=require('../middleware/requireAuth')
const {irdata,irdelete}=require('../controllers/concController')

const router=express.Router()
router.use(requireAuth)

router.get('/',irdata)
router.delete('/',irdelete)

module.exports=router