import {useAuthContext} from "./useAuthContext"
import {useConcsContext } from "./useConcContext"
export const useLogout=()=>{
    const {dispatch}=useAuthContext()
    const {dispatch: concsDispatch}=useConcsContext()

    const logout=()=>{
        //remove user from storage
        localStorage.removeItem('user')
        localStorage.removeItem('admin')

        //dispatch logout action
        dispatch({type:'LOGOUT'})
        dispatch({type:'ADMIN_LOGOUT'})
        concsDispatch({type:'SET_CONCS',payload:null})
    }
    return {logout}
}