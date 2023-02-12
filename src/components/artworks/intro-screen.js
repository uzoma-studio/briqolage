import React from 'react'
import Typography from '@mui/material/Typography'; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const IntroScreen = ({ isExploreClicked, setIsExploreClicked, bgImage }) => {

    const image = bgImage ? `http://${bgImage.slice(2)}` : null

  return (
    <Box sx={{ padding: 5, backgroundImage: `url(${image})` }}>
        <Typography paragraph={true} variant="h5" align="center" color='#fff'>
            Welcome to the Briqolage Art Explorer
        </Typography>
        <Typography variant="body2" paragraph={true} align="center" color='#fff'>
            A trippy adventure awaits
        </Typography>
        <Box textAlign='center'>
            <Button variant="contained" size="medium" color="secondary" align="center" onClick={() => setIsExploreClicked(!isExploreClicked)}>
            EXPLORE
            </Button>
        </Box>
    </Box>
)}

export default IntroScreen