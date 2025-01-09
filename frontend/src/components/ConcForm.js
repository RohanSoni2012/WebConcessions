import { useState } from "react";
import {useConcsContext } from "../hooks/useConcContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {motion} from 'framer-motion'
import {WR,HR,CR} from '../data/stationData'

export default function ConcForm(){
    const {dispatch}=useConcsContext()
    const [from,setFrom]=useState('Churchgate')
    const [via,setVia]=useState('Dadar')
    const [clas,setClass]=useState('')
    const [period,setPeriod]=useState('')
    const [error,setError]=useState(null)
    const [region,setRegion]=useState("WR")
    const[emptyFields,setEmptyFields]=useState([])
    const {user}=useAuthContext()
   
    const setCR=()=>{
        setRegion("CR")
        setVia("Kurla")
        setFrom('CSMT')
    }
    const setHR=()=>{
        setRegion("HR")
        setVia("NA")
        setFrom('CSMT')
    }

    const handleSubmit=async(e)=>{
      
        e.preventDefault() 
        const conc={from,via,clas,period}
        const concCheck=from.toUpperCase()
        if( concCheck==="GOVANDI"){
            setError("Sorce and destination can't be same")
            return
        }
        if(!user){
            setError('You must be logged in')
            return
        }
        const forms=await fetch('/Concession',{
            headers:{'Authorization':`Bearer ${user.token}`}
        })
        const jsonn=await forms.json()
        if(jsonn.length>0){
            setError('You have already applied')
            return
        }
        const season=await fetch('/ir',{
            headers:{'Authorization':`Bearer ${user.token}`}
        })
        const dataS=await season.json()
        if(dataS.length>0){
            setError('You have on going active IR season pass please try sometime later')
            return
        }

        const response=await fetch('/Concession',{
            method:'POST',
            body:JSON.stringify(conc),
            headers:{'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
        }
        })
        const json=await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            console.log(json.emptyFields)
        }
        if(response.ok){
            setFrom('')
            setVia('')
            setError(null)
            setEmptyFields([])
            console.log('Concession has been applied')
            dispatch({type:'CREATE_CONCS',payload:json})
        }

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
        <h2>Apply for Concession</h2>
        <label className="lay">From:</label>
        {/* <input
        type='text'
        onChange={(e)=>setFrom(e.target.value)}
        value={from}
        className={emptyFields.includes('form')?'error':''}
        /> */}
     <div class="radioo2">
      <input type="radio" id="regionChoic1" name="REGION" value="WR" defaultChecked onChange={(e)=>setRegion(e.target.value)} className={emptyFields.includes('period')?'error':''}/>
      <label for="regionChoic1">Western</label>
      <input type="radio" id="regionChoic2" name="REGION" value="CR" onChange={(e)=>setCR(e.target.value)} className={emptyFields.includes('period')?'error':''}/>
      <label for="regionChoic2">Central</label>
      <input type="radio" id="regionChoic3" name="REGION" value="HR" onChange={(e)=>setHR(e.target.value)} className={emptyFields.includes('period')?'error':''}/>
      <label for="regionChoic3">Hourbour</label>
    </div>
        <select className="dropbox" name="WR" onChange={(e)=>setFrom(e.target.value)}>
            {region==="WR"? WR.map((text)=>(
                <option value={text}>{text}</option>
            )):region==="CR"?CR.map((text)=>(
                <option value={text}>{text}</option>
            )):HR.map((text)=>(
                <option value={text}>{text}</option>
            ))}
        </select>
        <label className="lay">To:</label>
        <input id="default" type="text" value="Govandi" disabled="disabled"></input>
        <label className="lay">via:</label>
        {region==='WR'?<select className="dropbox" name="VIA" onChange={(e)=>setVia(e.target.value)}>
            <option value={"Dadar"}>Dadar</option>
            <option value={"Bandra"}>Bandra</option>
        </select>:region==='CR'? <input
        type='text'
        value="Kurla" disabled="disabled"
        />:<input
        type='text'
        value="NA" disabled="disabled"
        />}
  <legend>Class:</legend>
    <div class="radioo">
      <input type="radio" id="contactChoice1" name="class" value="Second" onChange={(e)=>setClass(e.target.value) } className={emptyFields.includes('class')?'error':''}/>
      <label for="contactChoice1">Second</label>

      <input type="radio" id="contactChoice2" name="class" value="First" onChange={(e)=>setClass(e.target.value)} className={emptyFields.includes('class')?'error':''}/>
      <label for="contactChoice2">First</label>
    </div>
    <legend>Period:</legend>
    <div class="radioo">
      <input type="radio" id="contactChoic1" name="period" value="Monthly" onChange={(e)=>setPeriod(e.target.value)} className={emptyFields.includes('period')?'error':''}/>
      <label for="contactChoic1">Monthly</label>

      <input type="radio" id="contactChoic2" name="period" value="Quarterly" onChange={(e)=>setPeriod(e.target.value)} className={emptyFields.includes('period')?'error':''}/>
      <label for="contactChoic2">Quarterly</label>
    </div>
        <motion.button whileHover={{scale:1.1}}>Apply</motion.button>
        {error && <div className="error">{error}</div>}
    </form>
    )
}
