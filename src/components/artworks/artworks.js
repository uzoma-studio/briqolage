import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import '../../styles/artworks.css'
import { ImagerDisplay, imagerShow, ImagerImg } from '../../apps/imager/index.js'
import '../../styles/screen.css';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'


const Artworks = () => {
  const [isArtworkLoading, setIsArtworkLeading] = useState(false)
  const [artworkImages, setArtworkImages] = useState([])

  const cleanUpArtworkImages = useCallback((rawData) =>  {
    const cleanArtworks = rawData.map((gallery) => {
      const {sys, fields} = gallery
      const {id} = sys
      const galleryTitle = fields.title
      const galleryDescription = fields.description
      const galleryImage = fields.image.fields.file.url
      const updatedArtworks = {id, galleryTitle, galleryDescription, galleryImage}
      return updatedArtworks

    })

    setArtworkImages(cleanArtworks)
  }, [])

  const getArtworkImages = useCallback(async () => {
    setIsArtworkLeading(true)
      try {
        const response = await client.getEntries({ content_type: 'artworks' })
        const responseData = response.items
        if (responseData) {
          cleanUpArtworkImages(responseData)
        } else {
          setArtworkImages([])
        }
        setIsArtworkLeading(false)
      } catch (error) {
        console.log(error)
        setIsArtworkLeading(false)
      }
    }, [cleanUpArtworkImages])

  useEffect(() => {
    getArtworkImages()
  }, [getArtworkImages])

  console.log(artworkImages)

  return (
    <ImageList cols={3}  sx={{ width: 500, height: 450 }}>
      {artworkImages.map((item) => {
        const {id, galleryImage, galleryTitle, galleryDescription} = item
        return (

              <ImageListItem key={id}>
                          
                    <ImagerDisplay z-index="3000" />
                    <ImagerImg 
                      src={`${galleryImage}`} 
                      srcSet={`${galleryImage}`}
                      alt={galleryTitle}   loading="lazy" />
                    {/*<ImagerImg 
                      src={`${item.img}?w=248&fit=crop&auto=format`} 
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}  loading="lazy" />

                    <ImagerImg 
                      src="imgs/1.jpg" 
                      srcSet="imgs/1.jpg" alt={item.title} images={imgs}  loading="lazy" />*/}

                <ImageListItemBar
                subtitle={galleryTitle}
               />
                <p>{galleryDescription}</p>

            </ImageListItem>
          
        )
      })}
     </ImageList> 

  )
}

export default Artworks