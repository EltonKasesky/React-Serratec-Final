import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/routes/AppRouter'
import Header from './components/Header'

export default function App() {
  return (
    <div>
        <BrowserRouter>
            <AppRouter/>
            <Header/>
        </BrowserRouter>
    </div>
  )
}
