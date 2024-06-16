import React, { useState, useEffect, useCallback } from 'react'
import '../../styles/screen.css';
import IMGGallery from './IMGGallery.js';
import Contentful from '../../utils/contentful'

import IntroScreen from './intro-screen';
import helpers from '../../utils/helpers';

const  Artworks = () => {
  const [ bgImageList, setBgImageList ] = useState(null)
  const [bgImage, setBgImage] = useState(null)
  const [bgVideo, setBgVideo] = useState(null);

  const query = `
  query {
    artworksCollection {
      items {
        title
        image {
          url
        }
        video {
          url
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

        const filteredItems = data.artworksCollection.items.filter(
          (asset) => asset.image && asset.video // Ensure both image and video exist
        );

        setBgImageList(filteredItems);
      });
  }, [query]);


  const [ isExploreClicked, setIsExploreClicked ] = useState(false)
  const { getRandomItem } = helpers
 
  useEffect(() => {
    if (bgImageList) {
      const randomItem = getRandomItem(bgImageList);
      setBgImage(randomItem.image.url);
      setBgVideo(randomItem.video.url);
    }
    return () => {};
  }, [getRandomItem, bgImageList]);
 
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
          bgVideo={bgVideo}
        />
    }
    </>
  )
}

export default Artworks