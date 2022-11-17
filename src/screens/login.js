import React from 'react'
import '../styles/screen.css'

const Login = () => {
  return (
    <>
        <div id="title-container">
            <h1 className="login-title">briq.</h1>
            <h1 className="login-title">world</h1>
        </div>
        <ul className='login-options'>
            <li>
                <div className="login-img"></div>
                <p>Login as user</p>
            </li>
            <li>
                <div className="login-img"></div>
                <p>Login as user</p>
            </li>
        </ul>
    </>
  )
}

export default Login