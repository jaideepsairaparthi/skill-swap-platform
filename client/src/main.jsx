import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { storeAuthToken } from './authTokenHandler.js';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

storeAuthToken(); // Automatically handle token storage

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter> {/* Wrap the app with BrowserRouter */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
