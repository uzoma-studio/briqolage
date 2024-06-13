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
    <div className='coverAll'>
      { bgImage &&
       

          <video class="backgroundVideo" loop autoplay >
            <source src="https://videos.ctfassets.net/lc8eccgjroyj/1p1hIVmw2DQtz2lhjT02ar/3f662689b95e1b7293d7245f9136e783/MOSHED-2023-7-14-15-10-44.webm" type="video/webm"/>
              <source src="https://videos.ctfassets.net/lc8eccgjroyj/1p1hIVmw2DQtz2lhjT02ar/3f662689b95e1b7293d7245f9136e783/MOSHED-2023-7-14-15-10-44.mp4" type="video/mp4"/>
            
          </video>
      }
      {children && children}
      
    </div>
  )
}

export default Background