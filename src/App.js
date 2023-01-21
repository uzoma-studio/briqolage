import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'
import Background from './components/background'
import Login from './screens/login'
import Home from './screens/home'
import { Route, Link, Routes } from 'react-router-dom'

const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  return (
    <Background>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
  {!session ? <Login /> : <Home key={session.user.id} session={session} />}
</div>
  
</Background>
      
  )
}

export default App
