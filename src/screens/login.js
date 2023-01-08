import React from 'react'
import Typography from '@mui/material/Typography';
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
                <img alt="login as user" src="https://res.cloudinary.com/nieleche/image/upload/v1669113287/Sample_User_Icon_mos5vr.png" width={60} height={60} />
                <Typography variant="body2" gutterBottom>
                    Login as user
                </Typography>
            </li>
            <li>
                <img alt="login as guest" src="https://res.cloudinary.com/nieleche/image/upload/v1669113287/door_waglrw.png" width={60} height={60} />
                <Typography variant="body2" gutterBottom>
                    Login as guest
                </Typography>
            </li>
        </ul>
    </>
  )
}

export default Login

