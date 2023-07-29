import React, { useEffect, useState } from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import '../artworks/img-gallery.css'
import Contentful from '../../utils/contentful'


function Card({item}) {

  const [openModal, setOpenModal] = useState(false)

  const [richTextData, setRichTextData] = useState(null);
  
  const handleOpenModal = (index) => {
    setOpenModal(true)
  }

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    // Extract and store the rich text content in the state
    if (item.blogBody) {
      setRichTextData(item.blogBody);
    }
  }, [item.blogBody]);

  return (
    <div>

      {openModal && 
        <div className='sliderWrap'>
            <Brightness1Icon className='btnClose' sx={{ 
                      cursor: 'pointer',
                      fontSize: 'small',
                      color: '#FF4A92'}} autoFocus onClick={handleCloseModal} />
          
          <div className='fullScreenImage'>
            <img  src={item.galleryImage} alt='' />
            <div className='fullScreenDesc'>
              <h4 className='headingText'>{item.galleryTitle}</h4>
              <p>{item.galleryDescription}</p>
              <div dangerouslySetInnerHTML={{ __html: Contentful.parseRichText(richTextData)}} />
            </div>
          </div>
        </div>
      }


      <ImageListItem  sx={{ width:'100%', height: '100%' }}  key={item.id}>
      <div 
        className='single' 
        key={item.id}
        onClick={ () => handleOpenModal(item.id) }
      >
        <img alt={item.galleryTitle}  src={item.galleryImage}/>
     </div>
        <ImageListItemBar
        subtitle={item.galleryTitle} />
      </ImageListItem>
    </div>
  )
}

export default Card;