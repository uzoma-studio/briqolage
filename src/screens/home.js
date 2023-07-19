import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import '../styles/screen.css';
import Music from '../apps/music';
import About from '../apps/about';
import Gallery from '../apps/gallery';
import Insta from '../apps/insta';
import Help from '../apps/help';
import Favourite from '../apps/favourite';
import Search from '../apps/search';
import Chat from '../apps/chat';


const Home = ({ session }) =>  {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('null')
  const [avatar_url, setAvatarUrl] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null); // Add this line to define 'data' variable
  const [isDropdownOpen, setDropdownOpen] = useState(false);

useEffect(() => {
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const current = new Date().toLocaleString('en-us', {weekday:'short'});
  const date = current.toString().split(' ')[0]; 

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };


  return (
    <>   
      <Box component="span" className="MainMenu" sx={{position: 'absolute', top: 0, left: 0, right: 0,  zIndex: '1000'  }}>
        <div>
          <ul className='MenuTag'>
                <li>
                  <div>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button  className="HomeMenu font-face-nmR" {...bindTrigger(popupState)}>
                        B Menu
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>Screen Saver</MenuItem>
                          <MenuItem onClick={popupState.close}>Pick Playist</MenuItem>
                          <MenuItem onClick={popupState.close}>Login</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                    </PopupState>
                  </div>
                </li>
                <li className="abouttext">
                    <About/> 
                </li>
                <li>
                    <Help/>
                </li>
          </ul>
        </div>

        <div>
          <ul className='MenuTag MTright'>
                <li>
                    <IconButton className="padding0" aria-label="account" color="inherit">
                      <VolumeUpIcon sx={{ fontSize: 'medium'}} />
                    </IconButton>
                </li>
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
                       <div  style={{ position: 'absolute', backgroundColor: 'white' }} className="dropdown-content">
                  
                      <MenuItem>
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

      <div style={{marginTop: '70px', zIndex: '100'}}> 
        <div id="title-container">
          
          <div className="flex-container">
              <div>
            
                    <div className="drag-wrapper">
                      <Gallery/>
                    </div>
              </div>

              <div className="aboutimage">
                    <div className="drag-wrapper">
                        <About/>
                    </div>
              </div>
          </div>
          
          <div className="flex-container">
              
              <div className="drag-wrapper">
              <Chat username={data ? data.username : session.user.email} setUsername={setUsername} />

              </div>
              <div className="drag-wrapper">
                <Music />
              </div>
          </div>


          <div className="flex-container">
              <div className="drag-wrapper">
                <Insta />
              </div>
             
          </div>
        </div>

        <div className="fav-container"> 
          <div className="drag-wrapper">
              <Favourite />
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

