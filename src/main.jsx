import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext";
import { HotelProvider } from './context/HotelContext.jsx';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <HotelProvider>
    <App />
    </HotelProvider>
  </StrictMode>,
  </AuthProvider>
)
