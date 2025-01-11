require('dotenv').config()
const {mongoose } = require("mongoose")
const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const concRoutes=require('./routes/concession') 
const userRoutes=require('./routes/user')
const irRoutes=require('./routes/ir')

const cors=require('cors')
const pdf=require('html-pdf')
const Railway=require('./models/RailwayConc')
const pdfTemplate=require('./document')

const PORT=process.env.PORT||5050
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`connected to db & listening on port ${PORT}`)
    })
})
.catch((error)=>{console.log(error)})

app.get('/fetchdownload/',(req,res)=>{
     res.sendFile(`${__dirname}/result.pdf`)
})
app.use('/Concession',concRoutes)
app.use('/ir',irRoutes)
app.use('/user',userRoutes)
