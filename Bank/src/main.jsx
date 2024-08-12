import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Table from "Table.jsx"

createRoot(document.getElementById('root')).render(
  <div>
        <App />
        <Table />
  </div>
  
)
