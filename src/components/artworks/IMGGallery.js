import React, { useState }  from 'react';

import Brightness1Icon from '@mui/icons-material/Brightness1';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'

import './img-gallery.css'

const IMGGallery = ({galleryImages}) => {

  const [slideNumber, setSlideNumber] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (index) => {
    setSlideNumber(index)
    setOpenModal(true)
  }

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

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0 
    ? setSlideNumber( galleryImages.length -1 ) 
    : setSlideNumber( slideNumber - 1 )
  }

  // Next Image  
  const nextSlide = () => {
    slideNumber + 1 === galleryImages.length 
    ? setSlideNumber(0) 
    : setSlideNumber(slideNumber + 1)
  }

  return (
    <div>

      {openModal && 
        <div className='sliderWrap'>
            <Brightness1Icon className='btnClose' sx={{ 
                      cursor: 'pointer',
                      fontSize: 'small',
                      color: '#FF4A92'}} autoFocus onClick={handleCloseModal} />
          <ColorButton className='btnPrev' onClick={prevSlide} sx={{ border: 2, borderRadius: 10, color: 'black', fontSize: 10, fontWeight: 'bold', px: 2,  borderColor: 'black'}} size="small" variant="contained">
            Prev
          </ColorButton>

          <GreenButton className='btnNext' onClick={nextSlide} sx={{ border: 2, borderRadius: 10, color: 'black', fontSize: 10, fontWeight: 'bold', px: 2,  borderColor: 'black'}} size="small" variant="contained">
            Next
          </GreenButton>
          
          <div className='fullScreenImage'>
            <img src={galleryImages[slideNumber].galleryImage} alt='' />
          </div>
        </div>
      }

      {/* <br />
      Current slide number:  {slideNumber}
      <br />
      Total Slides: {galleryImages.length}
      <br /><br /> */}

      
        <ImageList cols={3}  sx={{ width: 500, height: 450 }}>

            {
              galleryImages && galleryImages.map((slide, index) => {
                const {id, galleryImage, galleryTitle, galleryDescription} = slide
                return(
                  <ImageListItem  sx={{ width:'100%', height: '100%' }}  key={id}>
                  <div 
                    className='single' 
                    key={index}
                    onClick={ () => handleOpenModal(index) }
                  >
                    <img src={`${galleryImage}`} alt='' />
                  </div>
                   <ImageListItemBar
                   subtitle={galleryTitle} />
                   </ImageListItem>
                )
              })
            }

        </ImageList>     

    </div>
  )
}

export default IMGGallery