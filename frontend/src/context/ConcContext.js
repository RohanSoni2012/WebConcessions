import {createContext,useReducer} from 'react'

export const ConcContext=createContext()
export const ConcReducer=(state,action)=>{
    switch(action.type){
        case 'SET_CONCS':
            return{
                conc:action.payload
            }
        case 'CREATE_CONCS':
            return{
                conc:[action.payload,...state.conc]
            }
        case 'DELETE_CONCS':
            return{
                conc:state.conc.filter((w)=>w._id!==action.payload._id)
            }
        default:
            return state
    }

}

export const ConcContextProvider=({children})=>{
 const [state,dispatch]=useReducer(ConcReducer,{
    conc:null
 }) 
    return(
        <ConcContext.Provider value={{...state,dispatch}}>
            {children}
        </ConcContext.Provider>
    )
}