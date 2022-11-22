import React from 'react'
import './App.css'
import { Button } from '@mui/material';
import Background from './components/background'

import Login from './screens/login'

const App = () => {
  
  return (
      <Background>
        <Login />
      </Background>
  )
}

export default App
