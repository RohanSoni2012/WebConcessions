import React from 'react'
import {Routes,Route, Navigate,useLocation} from 'react-router-dom'
import Home from '../pages/home';
import Locate from '../pages/locate';
import Login from '../pages/login';
import Signup from '../pages/signup';
import { useAuthContext } from '../hooks/useAuthContext';

import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes(){
    const {user,admin}=useAuthContext()
    const location=useLocation();
    return(
        <AnimatePresence>
        <Routes location={location} key={location.pathname}>
        <Route path='/'
        element={user||admin ? <Home/>:<Navigate to="/locate"/>}/>
        <Route path='/login'
        element={user||admin ? <Home/>:<Login/>}
        />
        <Route path='/signup'
        element={user||admin ? <Home/>:<Signup/>}
        />
         <Route path='/locate'
        element={user||admin ? <Home/>:<Locate/>}/>
      </Routes>
      </AnimatePresence> 
    )
}
export default AnimatedRoutes