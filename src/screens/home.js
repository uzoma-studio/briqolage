import React from 'react'
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import '../styles/screen.css';
import Music from '../apps/music';
import About from '../apps/about';
import Gallery from '../apps/gallery';
import Insta from '../apps/insta';

function Home() {
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



  return (
    <>   
      <Box component="span" className="MainMenu" sx={{position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div>
          <ul className='MenuTag'>
                <li>
                  <div>
                    <Button
                      id="demo-positioned-button"
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      className="HomeMenu"
                    >
                      B Menu
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem onClick={handleClose}>Screen Saver</MenuItem>
                      <MenuItem onClick={handleClose}>Pick Playist</MenuItem>
                      <MenuItem onClick={handleClose}>Login</MenuItem>
                    </Menu>
                  </div>
                </li>
                <li>
                       <Typography variant="body2" gutterBottom>
                          About
                        </Typography>
                </li>
                <li>
                       <Typography variant="body2" gutterBottom>
                          Help
                        </Typography>
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
                    <IconButton className="padding0" aria-label="account" color="inherit">
                      <AccountCircleIcon sx={{ fontSize: 'medium'}} />
                    </IconButton>
                </li>
                <li>
                    <IconButton className="padding0" aria-label="search" color="inherit">
                      <SearchIcon sx={{ fontSize: 'medium'}} />
                    </IconButton>
                </li>
                <li>
                       <Typography variant="body2" gutterBottom>
                          {date} {time}
                        </Typography>
                </li>
            </ul>
        </div>
          
      </Box>

      <div>
        <div id="title-container">
          <div className="flex-container">
              <div>
                <Gallery/>
              </div>

              <div>
                <About/>
              </div>
          </div>
          
          <div>
              <Music />
          </div>
          <div>
            <Insta />
          </div>
        </div>

        <div className="fav-container">
        <ul>
            <li>
                <img alt="favourites" src="https://res.cloudinary.com/nieleche/image/upload/v1669862318/folder_ujxk7g.png" width={90} height={90} />
                <Typography variant="body2" gutterBottom>
                    Your Favourites
                </Typography>
            </li>
        </ul>
        </div>

      </div>

      <BottomNavigation className="FooterTag" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        showLabels >
        <BottomNavigationAction sx={{bottom: 37,}} label="briq FM" icon={ <img alt="briq fm" src="https://res.cloudinary.com/nieleche/image/upload/v1669288824/sound_c1kbdo.png" width={80} height={80} /> } />
        <BottomNavigationAction sx={{bottom: 37,}} label="briq Art" icon={   <img alt="briq art" src="https://res.cloudinary.com/nieleche/image/upload/v1669288824/art_i12sdq.png" width={80} height={80} /> } />
        <BottomNavigationAction sx={{bottom: 37,}} label="Instagram" icon={  <img alt="instagram" src="https://res.cloudinary.com/nieleche/image/upload/v1669288824/instaa_a2hir1.png" width={80} height={80} /> } />
      </BottomNavigation>
    </>
  )
}

export default Home

