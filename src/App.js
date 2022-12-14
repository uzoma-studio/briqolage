import React from 'react'
import './App.css'
import Background from './components/background'
import Login from './screens/login'
import Home from './screens/home'
import { Route, Link, Routes } from 'react-router-dom'

const App = () => {
  
  return (
      <Background>
           <Routes>
          <Route exact path='/' element={Home()} />
          <Route exact path='/login' element={Login()} />
          </Routes>
      </Background>
  )
}

export default App
