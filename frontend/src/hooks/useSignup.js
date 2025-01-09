import { useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext()

    const signup=async(email,password,admin)=>{
        setIsLoading(true) 
        setError(null)

        const response=await fetch(admin ? 'user/adminSignup':'/user/signup',{
           method:'POST',
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify({email,password})
        })
        const json=await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to local storage
            if(admin){
                localStorage.setItem('admin',JSON.stringify(json))
            }
            else{
                localStorage.setItem('user',JSON.stringify(json))
            }

            //update auth context
            if(admin){
                dispatch({type:'ADMIN_LOGIN',payload:json})
            }
            else{
                dispatch({type:'LOGIN',payload:json})
            }
            // setIsLoading(false)

            // if(!admin){
            //     dispatch({type:"ADMIN_LOGOUT"})
            //     localStorage.removeItem('admin')
            // }

        }
    }
    return {signup,isLoading,error}
}
