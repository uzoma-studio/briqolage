import React, { useState, useEffect } from 'react'
import './App.css'
import helpers from './utils/helpers'

const App = () => {

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
      .fetch(`https://graphql.contentful.com/content/v1/spaces/lc8eccgjroyj/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer MYs2y3N2wGIn6LTILCGIKWxr31-RKCXTkYbW_qP7Llg",
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
        setBgImage(helpers.getRandomItem(data.assetCollection.items).url);
      });
  }, [query]);
  
  return (
    <div id="background" style={{backgroundImage: `url(${bgImage})`}}></div>
  )
}

export default App