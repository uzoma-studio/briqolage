import React, { useState, useEffect } from 'react'
import '../styles/background.css'
import helpers from '../utils/helpers'
import Contentful from '../utils/contentful'

const Background = () => {

    const { getRandomItem } = helpers

  const [bgImage, setBgImage] = useState(null)

  const query = `
    query {
      assetCollection {
        items {
          url
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

        // rerender the entire component with new data
        setBgImage(getRandomItem(data.assetCollection.items).url);
      });
  }, [query, getRandomItem]);
  
  return (
    <div id="background" style={{backgroundImage: `url(${bgImage})`}}></div>
  )
}

export default Background