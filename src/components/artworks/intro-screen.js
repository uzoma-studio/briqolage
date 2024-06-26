import React from 'react';
import Typography from '@mui/material/Typography'; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const IntroScreen = ({ isExploreClicked, setIsExploreClicked, bgImage, bgVideo, isLargeScreen }) => {
  return (
    <Box className="font-face-nmR" sx={{ padding: 5 }}>
      {bgImage && (
        <>
          {isLargeScreen ? (
            bgVideo && (
              <video className="backgroundVideo"
              style={{
                zIndex: '-1',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} loop autoPlay muted controls={false}>
                <source src={bgVideo} type="video/mp4" />
              </video>
            )
          ) : (
            <img className="backgroundImage" style={{
              zIndex: '-1',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} src={bgImage} alt="background" />
          )}
        </>
      )}
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
  );
}

export default IntroScreen;
