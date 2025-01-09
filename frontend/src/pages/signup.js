import { useState} from "react"
import { useSignup } from "../hooks/useSignup"
import {motion} from 'framer-motion'
export default function Signup(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [match,setmatch]=useState(false)
    const [admin,setAdmin]=useState(false)
    const {signup,error,isLoading}=useSignup()

    // useEffect(()=>{
    //     if(!confirmPassword==password){
    //         setmatch(true)
    //     }
    //     else setmatch(false)
    // },confirmPassword)

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(password===confirmPassword){
            await signup(email,password,admin)
        }
        else{
            setmatch(true)
        }
        
    }
    return(
        <motion.div>
        <motion.form className='signup' onSubmit={handleSubmit}
        >
            <h3>Sign up</h3>
            <label>Email</label>
            <input
            type='email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            />
            <label>Password</label>
            <input
            type='password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            />
            <label>Confirm Password</label>
            <input
            type='password'
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className={match ? "error" : ""}
            />
            {match && <p className="error">Confirm password should matchup with upper</p>}
            <p for="admin">Admin Signup?</p>
             <input className="check"
            id="admin"
            type='checkbox'
            onChange={(e)=>{setAdmin(e.target.checked)
            }}
            />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </motion.form>
        </motion.div>
    )
}
