import {BrowserRouter,Routes,Route, Navigate,useLocation} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';
import Home from './pages/home';
import Locate from './pages/locate';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {

  const {user,admin}=useAuthContext()
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <AnimatedRoutes/>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
