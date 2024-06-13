import React, { useState } from 'react';
import styledd from 'styled-components';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import FavoriteHandler from './FavoriteHandler';
import Box from '@mui/material/Box';

import '../artworks/img-gallery.css';

const FAVGallery = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
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
  };

  const artworkImages = JSON.parse(localStorage.getItem('favorites')) || [];

  const prevSlide = () => {
    setSlideNumber((prevSlideNumber) =>
      prevSlideNumber === 0 ? artworkImages.length - 1 : prevSlideNumber - 1
    );
  };

  const nextSlide = () => {
    setSlideNumber((prevSlideNumber) =>
      prevSlideNumber + 1 === artworkImages.length ? 0 : prevSlideNumber + 1
    );
  };

  return (
    <div className='Gallery'>
      {openModal && (
        <div className='sliderWrap'>
          <Brightness1Icon
            className='btnClose'
            sx={{
              cursor: 'pointer',
              fontSize: 'small',
              color: '#FF4A92',
            }}
            autoFocus
            onClick={handleCloseModal}
          />
          <ColorButton
            className='btnPrev'
            onClick={prevSlide}
            sx={{
              border: 2,
              borderRadius: 10,
              color: 'black',
              fontSize: 10,
              fontWeight: 'bold',
              px: 2,
              borderColor: 'black',
            }}
            size='small'
            variant='contained'
          >
            Prev
          </ColorButton>

          <GreenButton
            className='btnNext'
            onClick={nextSlide}
            sx={{
              border: 2,
              borderRadius: 10,
              color: 'black',
              fontSize: 10,
              fontWeight: 'bold',
              px: 2,
              borderColor: 'black',
            }}
            size='small'
            variant='contained'
          >
            Next
          </GreenButton>

          <div className='fullScreenImage'>
            <video  muted controls={false}>
              <source src={artworkImages[slideNumber].url} type='video/mp4' />
            </video>
            <ImageListItemBar subtitle={artworkImages[slideNumber].galleryTitle} />
          </div>
        </div>
      )}

      <AppContainer>
        <ImageList cols={3} sx={{ width: 500, height: 450 }}>
          {artworkImages.map((slide, index) => (
            <ImageListItem sx={{ width: '100%', height: '100%' }} key={slide.id}>
              <div className='single' key={index} onClick={() => handleOpenModal(index)}>
                <video  muted controls={false} style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                  <source src={`${slide.url}`} type='video/mp4' />
                </video>
              </div>

              <Box sx={{ position: 'absolute', color: 'black', fontWeight: 'bold', px: 1, mt: 1 }} size='small' variant='contained'>
                <FavoriteHandler index={index} url={slide.url} />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </AppContainer>
    </div>
  );
};

export default FAVGallery;

const AppContainer = styledd.div`
  .css-uym98a-MuiImageList-root {
    height: 100% !important;
  }
`;
