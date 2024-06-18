import React, { useState, useEffect } from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { pink, green } from '@mui/material/colors';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ReactPlayer from 'react-player';
import ReactDOM from 'react-dom';
import FavoriteHandler from '../favourite/FavoriteHandler';
import './img-gallery.css';

const IMGGallery = ({ artworkImages }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
    setIsFullScreen(true);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    '&:hover': {
      backgroundColor: pink[700],
    },
  }));

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsFullScreen(false);
  };

  const prevSlide = () => {
    setSlideNumber(slideNumber === 0 ? artworkImages.length - 1 : slideNumber - 1);
  };

  const nextSlide = () => {
    setSlideNumber((slideNumber + 1) % artworkImages.length);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ height: '350px' }}>
      {isFullScreen && openModal && ReactDOM.createPortal(
        <div className='sliderWrap'>
          <Brightness1Icon className='btnClose' sx={{ cursor: 'pointer', fontSize: 'small', color: '#FF4A92' }} onClick={handleCloseModal} />
          <ColorButton className='btnPrev' onClick={prevSlide} sx={{ border: 2, borderRadius: 10, color: 'black', fontSize: 10, fontWeight: 'bold', px: 2, borderColor: 'black' }} size="small" variant="contained">Prev</ColorButton>
          <GreenButton className='btnNext' onClick={nextSlide} sx={{ border: 2, borderRadius: 10, color: 'black', fontSize: 10, fontWeight: 'bold', px: 2, borderColor: 'black' }} size="small" variant="contained">Next</GreenButton>
          <div className='fullScreenImageContainer' style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1000, backgroundColor: 'black', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className='fullScreenImage'>
              {isLargeScreen ? (
                <ReactPlayer className="backgroundVideo" style={{ objectFit: 'cover', width: '100%', height: '100%' }} width='100%' height='100%' url={artworkImages[slideNumber].video.url} playing loop controls={false} />
              ) : (
                <img className="backgroundImage" src={artworkImages[slideNumber].image.url} alt="background" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
              )}
            </div>
          </div>
        </div>, document.body
      )}
      <ImageList cols={3}>
        {artworkImages.map((slide, index) => (
          <ImageListItem sx={{ width: '100%', height: '100%' }} key={index}>
            <div className='single' onClick={() => handleOpenModal(index)}>
              {isLargeScreen ? (
                <video className="backgroundVideo" loop autoPlay muted controls={false} style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                  <source src={slide.video.url} type="video/mp4" />
                </video>
              ) : (
                <img className="backgroundImage" src={slide.image.url} alt="background" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              )}
            </div>
            <FavoriteHandler index={index} url={slide.image.url} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default IMGGallery;
