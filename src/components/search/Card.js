import React, { useState }  from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { styled } from '@mui/material/styles';
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import '../artworks/img-gallery.css'

function Card({artwork}) {

  const [openModal, setOpenModal] = useState(false)

  
  const handleOpenModal = (index) => {
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }


  return (
    <div>

      {openModal && 
        <div className='sliderWrap'>
            <Brightness1Icon className='btnClose' sx={{ 
                      cursor: 'pointer',
                      fontSize: 'small',
                      color: '#FF4A92'}} autoFocus onClick={handleCloseModal} />
          
          <div className='fullScreenImage'>
            <img src={artwork.galleryImage} alt='' />
          </div>
        </div>
      }


      <ImageListItem  sx={{ width:'100%', height: '100%' }}  key={artwork.id}>
      <div 
        className='single' 
        key={artwork.id}
        onClick={ () => handleOpenModal(artwork.id) }
      >
        <img alt={artwork.galleryTitle}  src={artwork.galleryImage}/>
      </div>
        <ImageListItemBar
        subtitle={artwork.galleryTitle} />
      </ImageListItem>
                  

    </div>
  )
}

export default Card;