const express =require('express')
const {signupUser,loginUser,loginAdmin,signupAdmin}=require('../controllers/userController')
const router=express.Router()

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/adminLogin',loginAdmin)
router.post('/adminSignup',signupAdmin)


module.exports=router