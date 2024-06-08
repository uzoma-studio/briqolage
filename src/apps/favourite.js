import React from "react";
import styledd from "styled-components";
import Typography from '@mui/material/Typography'; 
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../styles/screen.css';

import Window from "../components/window";

import Favourites from '../components/favourite/favourites'
import { getFavourites } from "../components/favourite/FavoriteHandler";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function Favourite() {
  const isSmallScreen = window.innerWidth < 768; // Define the breakpoint for small screens

  const windowStyle = isSmallScreen ? {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } : {
    top: '10vh',
    left: '40vw',
    width: '40em',
  };
	
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  

  const tabNames =['Art', 'Music']

  const defaultText = 
    <Box sx={{padding: 5}}>
      <Typography variant="body2" align="center" >
        Nothing to show yet.
      </Typography>
      <Typography variant="body2" align="center">
        Your favourite items from the {tabNames[value]} app will show up here
      </Typography>
    </Box>


  return (
    <Window title="Your Favourites" icon={{
      id: 'favourites',
      alt: 'favourites',
      src: "https://res.cloudinary.com/nieleche/image/upload/v1669862318/folder_ujxk7g.png"
    }}
    style={windowStyle}
    >
    <div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab sx={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }} label="Art" {...a11yProps(0)} />
            <Tab sx={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }} label="Music" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel px={0} value={value} index={0}>
          
          {
            getFavourites().length > 0 ?
              <Favourites className="ArtworksCon" />
              :
              defaultText
          }
        
        </TabPanel>
        <TabPanel value={value} index={1}>
            {defaultText}
        </TabPanel>
  
    </div>
    </Window>
  );
}


