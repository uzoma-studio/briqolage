import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/screen.css';
import Music from '../apps/music';
import About from '../apps/about';
import Gallery from '../apps/gallery';
import Insta from '../apps/insta';
import Help from '../apps/help';
import Favourite from '../apps/favourite';
import Search from '../apps/search';
import Chat from '../apps/chat';
import Blog from '../apps/blog';
import Screensaver from '../components/screensaver';
import Shop from '../apps/shop';
import Login from './login';

const Home = ({ session }) =>  {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('null')
  const [avatar_url, setAvatarUrl] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // Add this line to define 'data' variable
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [briqMenuOpen, setBriqMenuOpen] = useState(false);
  const [isScreenSaverActive, setScreenSaverActive] = useState(false);
  const inactivityTimeout = 30000; // 30 seconds of inactivity

useEffect(() => {

  if (session) {
    // Fetch profile data only if session is not null
    const getProfile = async () => {
      try {
        setLoading(true);
        const { user } = session;
    
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, avatar_url`)
          .eq('id', user.id)
          .single();
    
        if (error && status !== 406) {
          throw error;
        }
    
        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        } else {
          setIsModalOpen(true);
        }
        setData(data); // Update 'data' state with the retrieved profile data
       
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    getProfile()
  } else {
    setLoading(false);
  }
  
}, [session])


const updateProfile = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      avatar_url,
    };

    let { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      throw error;
    } else {
      // Refresh the page
      window.location.reload();
    }
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const current = new Date().toLocaleString('en-us', {weekday:'short'});
  const date = current.toString().split(' ')[0]; 

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const handleToggleBriqMenu = () => {
    setBriqMenuOpen(!briqMenuOpen);
  };

  const handleScreenSaverButtonClick = () => {
    setScreenSaverActive(true);
    setBriqMenuOpen(false);
  };



useEffect(() => {
  let timer;
  // Function to reset the inactivity timer when the mouse is moved
  const resetInactivityTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(setScreenSaverActive(true), inactivityTimeout);
  };

  // Event listener to detect mouse movement and resett the inactivity timer
  const handleMouseMove = () => {
    resetInactivityTimer();
    setScreenSaverActive(false);
  };

  // Add the event listener on mount
  document.addEventListener('mousemove', handleMouseMove);

  // Clear the event listener on unmount
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    clearTimeout(timer); // Clear the timeout when the component unmounts
  };
}, []);
  return (
    <>   
  
     {isScreenSaverActive && (
        <Screensaver />
      )}
      <Box component="span" className="MainMenu" sx={{position: 'absolute', top: 0, left: 0, right: 0,  display: 'block' }}>
        <div>
          <ul className='MenuTag'>
                <li>
                  <div>
                    <Button onClick={handleToggleBriqMenu} className="HomeMenu font-face-nmR" >
                    B Menu
                    </Button>
                    {briqMenuOpen && (
                    <div  style={{ position: 'absolute', backgroundColor: 'white', zIndex: '1000' }} className="dropdown-content">
                  
                    <MenuItem>
                    <div className="aligncenter font-face-nmR" aria-live="polite">
                      <button type="button" sx={{color: 'white'}}  onClick={handleScreenSaverButtonClick} className="button">
                       Screen Saver
                      </button>
                    </div>
                    </MenuItem>
                
                   </div>
                    )}
                  </div>
                </li>
                <li className="abouttext">
                    <About icon={null} /> 
                </li>
                <li>
                    <Help/>
                </li>
          </ul>
        </div>

        <div>
          <ul className='MenuTag MTright'>
               
                <li>
                  <div>
                    <Button
                      id="demo-positioned-button1"
                      aria-controls={open ? 'demo-positioned-menu1' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleToggle}
                      sx={{color: 'white'}}
                    >
                       <IconButton className="padding0" aria-label="account" color="inherit">
                        <AccountCircleIcon sx={{ fontSize: 'medium'}} />
                      </IconButton>
                    </Button>
                    {isDropdownOpen && (
                       <div  style={{ position: 'absolute', backgroundColor: 'white', zIndex: '1000'}} className="dropdown-content">
                  
                      <MenuItem>
                      {session ? (
                         <div className="aligncenter font-face-nmR" aria-live="polite">
                         {loading ? (
                           <p>Loading...</p>
                         ) : (
                           <form onSubmit={updateProfile} className="form-widget">
                             {/*<div>
                               <label htmlFor="username"> {session.user.email}</label>
                             </div>*/}
                             <div>
                               <label  style={{
                                   color: 'purple', 
                                 }} htmlFor="username">Name</label>
                               <input
                                 id="username"
                                 type="text"
                                 value={username || ''}
                                 style={{
                                   maxWidth: '150px', 
                                   borderColor: 'purple', // Set the border color here
                                   borderWidth: '2px', // Optional: Set the border width
                                   borderStyle: 'solid', // Optional: Set the border style
                                 }}
                                 onChange={(e) => setUsername(e.target.value)}
                               />
 
                   
                             </div>
                             <div>
                               <button className="button primary" disabled={loading}>
                                 Update profile
                               </button>
                             </div>
                           </form>
                         )}
                         <button type="button" sx={{color: 'white'}} className="button" onClick={() => supabase.auth.signOut()}>
                           Sign Out
                         </button>
                       </div>
                      ) : (
                      
                          <Login/>
                      )}
                     
          
                      </MenuItem>
                  
                     </div>
                     )}
                  </div>
                </li>

                <li>
                    <Search/>
                </li>
                <li>
                  <Typography variant="body2" className='font-face-nmR' gutterBottom>
                    {date} {time}
                  </Typography>
                </li>
            </ul>
        </div>
      </Box>

    

      {isModalOpen && (
        <div className="modal">
        <div className="modalContent"> 
       {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={updateProfile} className="form-widget">
              <div>
                <p className="modalHeading">Hi there, your profile isn't available, please add your username to continue</p>
                <input
                  id="username"
                  type="text"
                  style={{ border: '1px solid purple', marginTop: '1rem', zIndex: '1000'}}
                  value={username || ''}
                  placeholder="Enter a username..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <button className="button primary p20" disabled={loading}>
                  Update profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      )}

      <div style={{ zIndex: '99'}}> 
        <div id="title-container">
          
          <div className="flex-container" style={{paddingTop: '15px'}}>
              <div>
            
                    <div className="drag-wrapper">
                      <Gallery/>
                    </div>
              </div>

              <div className="aboutimage">
                    <div className="drag-wrapper">
                        <About icon={{id: 'aboutIcon', alt: 'about', src: "https://res.cloudinary.com/nieleche/image/upload/v1669859352/aboutbriq_grwbqc.png" }}/>
                    </div>
              </div>

              <div>
                <div className="drag-wrapper">
                  <Favourite />
                </div>
              </div>
          </div>
          
          <div className="flex-container">
              
              <div className="drag-wrapper" style={{padding: '25px'}}>
              <Chat username={data ? data.username : (session?.user?.email || 'Guest')} setUsername={setUsername} />

              </div>
              <div className="drag-wrapper" style={{paddingTop: '35px'}}>
                <Music />
              </div>
          </div>


          <div className="flex-container">
              <div className="drag-wrapper">
                <Insta />
              </div>
              <div className="drag-wrapper"  style={{padding: '0px'}}>
                <Blog />
              </div>
              <div className="drag-wrapper" style={{position: 'relative', top: '70px'}}>
                <Shop />
              </div>
          </div>
        </div>


      </div>

      <BottomNavigation className="FooterTag" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        showLabels >
        <BottomNavigationAction sx={{bottom: 37,}} label="briq FM" icon={  <Music /> } />
        <BottomNavigationAction sx={{bottom: 37,}} label="briq Art" icon={ <Gallery/> } />
        <BottomNavigationAction sx={{bottom: 37,}} label="Instagram" icon={   <Insta /> } />
      </BottomNavigation>
    </>
  )
}

export default Home

