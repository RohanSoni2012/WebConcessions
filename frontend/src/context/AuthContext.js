import {createContext,useReducer,useEffect} from 'react'
 
export const AuthContext=createContext()

export const authReducer=(state,action)=>{
    switch (action.type){
        case 'LOGIN':
            return{user:action.payload}
        case 'LOGOUT':
            return {user:null}
        case "ADMIN_LOGIN":
            return{admin:action.payload}
        case "ADMIN_LOGOUT":
            return{admin:null}
        default:
            return state
    }
}
export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,{
        user:null,admin:null
    })
    // const [state,dispatch]=useReducer(authReducer,{
    //     admin:null
    // })
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        const admin=JSON.parse(localStorage.getItem('admin'))
        if(user){
            dispatch({type:'LOGIN',payload:user})
        }
        if(admin){
            dispatch({type:'ADMIN_LOGIN',payload:admin})
        }
    },[])
    console.log('AuthContext state: ',state)
    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}