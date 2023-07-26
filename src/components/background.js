import React, { useState, useEffect } from 'react'
import '../styles/background.css'
import helpers from '../utils/helpers'
import Contentful from '../utils/contentful'

const Background = ({ children }) => {

  const { getRandomItem } = helpers

  const [ bgImageList, setBgImageList ] = useState(null)
  const [bgImage, setBgImage] = useState(null)

  const query = `
  query {
    assetCollection {
      items {
        url
        contentfulMetadata {
          tags {
              id
              name
            }
          }
        }
      }
    }
  `

  useEffect(() => {
    Contentful.get(query)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setBgImageList(data.assetCollection.items.filter(
          (asset) => 
            asset.contentfulMetadata.tags[0] && 
            asset.contentfulMetadata.tags[0].id === 'backgroundVideo'
        ))
      });
  }, [query]);

  useEffect(() => {

    bgImageList && setBgImage(getRandomItem(bgImageList).url);
  
    return () => {}

  }, [getRandomItem, bgImageList])
  
  return (
    // <div id="background">
    //   <img src={bg} alt='glitch' style={{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     height: '100vh'
    //   }}/>
    <div>
      { bgImage &&
          <video className='backgroundVideo' loop autoPlay >
            <source src={bgImage} type="video/webm" />
          </video>
      }
      {children && children}
    </div>
  )
}

export default Background