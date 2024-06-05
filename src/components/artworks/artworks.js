import React, { useState, useEffect, useCallback } from 'react'
import '../../styles/screen.css';
import IMGGallery from './IMGGallery.js';
import Contentful from '../../utils/contentful'

import IntroScreen from './intro-screen';
import helpers from '../../utils/helpers';

const  Artworks = () => {
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


  const [ isExploreClicked, setIsExploreClicked ] = useState(false)
  const { getRandomItem } = helpers
 
  useEffect(() => {
    bgImageList && setBgImage(getRandomItem(bgImageList).url);
    return () => {}
  }, [getRandomItem, bgImageList])
 
  return (  
    <>
    {
      isExploreClicked ?
        <div className="Gallery">
            <IMGGallery
              artworkImages={bgImageList}
            />
        </div>
        :
        <IntroScreen
          isExploreClicked={isExploreClicked}
          setIsExploreClicked={setIsExploreClicked} 
          bgImage={bgImage}
        />
    }
    </>
  )
}

export default Artworks