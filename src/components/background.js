import React, { useState, useEffect } from 'react'
import '../styles/background.css'
import helpers from '../utils/helpers'

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
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
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