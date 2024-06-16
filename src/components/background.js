import React, { useState, useEffect } from 'react';
import '../styles/background.css';
import helpers from '../utils/helpers';
import Contentful from '../utils/contentful';

const Background = ({ children }) => {
  const { getRandomItem } = helpers;

  const [bgImageList, setBgImageList] = useState(null);
  const [bgImage, setBgImage] = useState(null);
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
  `;

  useEffect(() => {
    Contentful.get(query)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        const filteredItems = data.artworksCollection.items.filter(
          (asset) => 
            asset.image && asset.video //Taking both image and video 
        );

        setBgImageList(filteredItems);
      });
  }, [query]);

  useEffect(() => {
    if (bgImageList) {
      const randomItem = getRandomItem(bgImageList);
      setBgImage(randomItem.image.url);
      setBgVideo(randomItem.video.url);
    }

    return () => {}
  }, [getRandomItem, bgImageList]);

  return (
    <div className='coverAll'>
      {bgImage && (
        <>
          <img
            className='backgroundImage'
            src={bgImage}
            alt='background'
          />
          {bgVideo && (
            <video
              className='backgroundVideo'
              loop
              autoPlay
              muted
              controls={false}
              onError={(e) => console.error('Error loading video:', e)}
            >
              <source src={bgVideo} type='video/mp4' />
            </video>
          )}
        </>
      )}
      {children && children}
    </div>
  );
}

export default Background;
