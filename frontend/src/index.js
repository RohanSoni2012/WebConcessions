import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConcContextProvider } from './context/ConcContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 

  <React.StrictMode>
    <AuthContextProvider>
    <ConcContextProvider>
    <App />
    </ConcContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


