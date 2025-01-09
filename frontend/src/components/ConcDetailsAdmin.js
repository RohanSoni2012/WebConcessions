import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useConcsContext } from '../hooks/useConcContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
export default function ConcDetailsAdmin({conc}){
    const[commentbox,setCommentbox]=useState(false)
    const[comment,setComment]=useState("")
    const {dispatch}=useConcsContext()
    const {user}=useAuthContext() 
    const {admin}=useAuthContext()
    
    const handleClick1=async()=>{
        const approval=true
        const grant={approval}
        const response = await fetch('/Concession/'+conc._id,{
            method:'PATCH',
            body:JSON.stringify(grant),
            headers:admin? {'Content-Type':'application/json','Authorization':`Bearer ${admin.token}`} : {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`}
        })
        const json=await response.json()
        if(response.ok){
            dispatch({type:'DELETE_CONCS',payload:json})
        }
    }
    const handleClick2=async()=>{
        const approval=false
        const grant={approval,comment}
        const response = await fetch('/Concession/'+conc._id,{
            method:'PATCH',
            body:JSON.stringify(grant),
            headers:admin? {'Content-Type':'application/json','Authorization':`Bearer ${admin.token}`} : {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`}
        })
        const json=await response.json()
        if(response.ok){
            dispatch({type:'DELETE_CONCS',payload:json})
        }
    }

    const SetFalse=()=>{
        setCommentbox(false)
    }
    const SetTrue=()=>{
        setCommentbox(true)
    }
    return(<div class="info">
        
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
            
            

            {admin ? <button className="grant" onClick={handleClick1}>✅Approve</button>:false}
            {admin ? <button className="grant" onClick={SetTrue}>❌Decline</button>:false}
            {commentbox ? <div className='popupContainer'>
                <div className='popupContent'>
                <div className="outer">
                    <div className="inner">
                     <label className="cross" onClick={SetFalse}>Back</label>
                        </div>
                    </div>
                {/* <span className="closeButton" onClick={SetFalse}>×</span> */}
                <div className='boxxcontent'>
                <h2>Comment Box</h2>
                <textarea className="textbox" id="commentBox" rows="4" cols="50" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                <button className="grant" onClick={handleClick2}>Submit</button>
                </div>
                </div>
            </div>:false}
        </div>
        </div>
    )
}