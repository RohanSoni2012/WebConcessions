import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useConcsContext } from '../hooks/useConcContext'
import { useAuthContext } from '../hooks/useAuthContext'

import {saveAs} from 'file-saver'
import axios from 'axios'

export default function ConcDetails({conc}){
    const {dispatch}=useConcsContext()
    const {user}=useAuthContext()
    const {admin}=useAuthContext()
    var name=""
    if(user){name=user.email}
    else{name="Admin"}
    
    const real=name.substring(0,name.indexOf('@'))
    function capitalize(s)
    {
    return s && s[0].toUpperCase() + s.slice(1);
    }
    if(!user && !admin){
        return
    }
    const handleClick=async()=>{
       
          await fetch('/ir',{
                method:'DELETE',
            headers:admin? {'Authorization':`Bearer ${admin.token}`} : {'Authorization':`Bearer ${user.token}`} 
            })
            
        
        const response = await fetch('/Concession/'+conc._id,{
            method:'DELETE',
            headers:admin? {'Authorization':`Bearer ${admin.token}`} : {'Authorization':`Bearer ${user.token}`}
        })
        const json=await response.json()
        if(response.ok){
            dispatch({type:'DELETE_CONCS',payload:json})
        }
    }
    const download=async()=>{     
        //blob are object for representing a data which is not in json format and have block of data
        axios.post('Concession/Download',conc,{
            headers:{'Content-Type': 'application/json',
                 'Authorization':`Bearer ${user.token}`}
        })
        .then(()=>axios.get('fetchdownload',{responseType:'blob',headers:{'Authorization':`Bearer ${user.token}`}}))    
        .then((res)=>{
            const pdfBlob=new Blob([res.data],{type:'application/pdf'})
            saveAs(pdfBlob,'IRconcession.pdf')
        })      
    }

    return(<div class="info"><h3>Welcome, {capitalize(real)}</h3>
        <div className="workout-details">
            <h4><strong>Regno: </strong>{conc.userRegNo}</h4>
            <p><strong>From: </strong>{conc.from}</p>
            <p><strong>To: </strong>{conc.to}</p>
            <p><strong>via: </strong>{conc.via}</p>
            <p><strong>Class: </strong>{conc.clas}</p>
            <p><strong>Period: </strong>{conc.period}</p>
            <p><strong>Status: </strong></p>
            <p className="pending">{!conc.grant ? "Pending":false}</p>
            {conc.grant ? <p className={conc.reject ? "pending":"approve"}>{conc.reject ? "Application is rejected":"Application is approved"}</p>:false}
            {conc.reject ? <p className='pending'>Reason: <p className='approve'>{conc.comment}</p></p>:false}
            <p>{formatDistanceToNow(new Date(conc.createdAt),{addSuffix:true})}</p>
            {conc.grant ? !conc.reject ? <button className='Downbtn' onClick={download}>📄Download</button>:false:false}
            
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
        {!admin ? <div class="note"><label>Note:</label>
       <p>1.You have to fill the form in order to apply for concession</p>
        <p>2.Approvel of concession are subject to IR regulation</p>
        <p>3.Fill the details correctly</p>
        <p>4.Your application will be responded with 2 to 3 working days</p></div>:false}
        </div>
    )
}
