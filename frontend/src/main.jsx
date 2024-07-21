import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { DataFunction } from './assets/Auth/Context.jsx'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <DataFunction>
  <Toaster/> 
  <App />
  </DataFunction>
 
</React.StrictMode>,
  
)
