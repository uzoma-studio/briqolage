import React, { useState }  from 'react'
import { supabase } from '../supabaseClient'
import Typography from '@mui/material/Typography';
import '../styles/login.css'
import Window from "../components/window";

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: process.env.REACT_APP_EMAIL_REDIRECT
      }
    });
    if (error) throw error;

    // Save user data to local storage
    const { data: user } = await supabase.auth.getUser();
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect or perform other actions upon successful login
    // For example, you can navigate to the home page
    // window.location.href = '/';

    // Display alert box with message
    alert('Check your mail for the login link');
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    setLoading(false);
  }
};


    
    
  return (
    <Window title="Login" icon={{
      id: 'Login',
      alt: 'login',
      src: "https://res.cloudinary.com/nieleche/image/upload/v1715559862/20-1User_13-512_zorsuc.webp"
    }}
    style={{width: '100vw', top: '2vh'}}
    >
     <div className="login-overlay">
      <div className="login-container">
          <div className='login-options' sx={{ display: 'flex',  justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div id="title-container"> 
                  <h1 className="login-title">briq.</h1>
                  <h1 className="login-title">world</h1>
              </div>
              <div className="row">
                  <div className="col-6 form-widget"  aria-live="polite">
                      <img alt="login as user" src="https://res.cloudinary.com/nieleche/image/upload/v1669113287/Sample_User_Icon_mos5vr.png" width={60} height={60} />
                      <Typography variant="body2" sx={{mb: 0, color: 'white'}} gutterBottom>
                          Sign in via magic link with your email below
                      </Typography>
                  
                      {loading ? (
                      'Sending magic link...'
                      ) : (
                      <form onSubmit={handleLogin}>
                          <input
                          id="email"
                          className="inputField"
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoFocus/>

                    
                          <button className="Loginbtn button block" aria-live="polite">
                            Send magic link
                          </button>
                      </form>
                      )}
                  </div>
              </div>
          </div>
        </div>
      </div>
      </Window>
  )
}


