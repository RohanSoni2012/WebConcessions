import { ConcContext } from "../context/ConcContext";
import { useContext } from "react";

export const useConcsContext=()=>{
    const context=useContext(ConcContext)

    if(!context){
        throw Error('Error of context provider')
    }

    return context
}