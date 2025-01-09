import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [admin,setAdmin]=useState(false)
    const {login,error,isLoading}=useLogin()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(admin)
        await login(email,password,admin)
    }
    return(
        <form className='login' onSubmit={handleSubmit}>
        <h3>Login</h3>
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
        {/* <p for="admin" className="switch">Admin Login?</p> */}
        <input className="checkbox" id="admin"
        type='checkbox'
        onChange={(e)=>{setAdmin(e.target.checked)
        }}
        />
       <label for="admin" className="switch"></label>
       <p className="Ask">Admin login</p>
        <button disabled={isLoading} className="Logbtn">Login</button>
        {error && <div className='error'>{error}</div>}
    </form>
    )
}
export default Login