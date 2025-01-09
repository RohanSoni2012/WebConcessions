import { useEffect} from "react"
import ConcDetails from "../components/ConcDetails"
import ConcForm from "../components/ConcForm"
import { useConcsContext } from "../hooks/useConcContext"
import { useAuthContext } from "../hooks/useAuthContext"
import ConcDerailsAdmin from "../components/ConcDetailsAdmin"

const Home=()=>{

    const {conc,dispatch}=useConcsContext()
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
    var length=0
    if(conc!=null){
    const jsonObjects = conc.map(str => str.length);
    length = jsonObjects.length;
    }
    useEffect(()=>{
       
        const fetchConcs=async()=>{
            if(!admin){
            const response=await fetch('/Concession',{
                headers:{'Authorization':`Bearer ${user.token}`}
            })
            const json=await response.json()

            if(response.ok){
                // setConc(json)
                dispatch({type:'SET_CONCS',payload:json})
            }}
            
            else{
                const response=await fetch('/Concession/admin',{
                    headers:{'Authorization':`Bearer ${admin.token}`}
                })
                const json=await response.json()
    
                if(response.ok){
                    // setConc(json)
                    dispatch({type:'SET_CONCS',payload:json})
                }
            }
            
        }
        if(admin||user){
        fetchConcs()
        }
    },[dispatch,user,admin])
    return(<>
        {!admin ? <div className="home">
            {admin ? <h1>Admin control</h1>:false}
        <div id="workouts">
            {conc && conc.map((conc)=>(
                <ConcDetails key={conc._id} conc={conc} />
            ))}
            
           {length===0 ? <div class="info">
            <h3>Welcome, {capitalize(real)}</h3>
        <p>No application</p>
       {!admin? <div class="note"><label>Note:</label>
        <p>1.You have to fill the form in order to apply for concession</p>
        <p>2.Approvel of concession are subject to IR regulation</p>
        <p>3.Fill the details correctly</p>
        <p>4.Your application will be responded with 2 to 3 working days</p></div>:false}
        
        </div>:""}
    </div>
  
            
                {!admin ?length===0?<ConcForm/>:false :"" }  
        </div>: 
        <div className="home">
        <div id="workouts">
        <h3>Welcome, Admin</h3>
        {conc && conc.map((conc)=>(
                <ConcDerailsAdmin key={conc._id} conc={conc} />
            ))}
    </div></div> }
    </>
    )
}
export default Home;
