// All functions and operations pertaining to interacting with Contentful
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const Contentful = {

    get: (query) => {
        return window
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
    },

    parseRichText: (richText, links=null) => {
        const options = {
            renderMark: {
                [MARKS.BOLD]: text => `<custom-bold>${text}<custom-bold>`
            },
            renderNode: {
                // I had to write my own function, the one in the original documentation was not working
                [BLOCKS.EMBEDDED_ASSET]: (node) => {
                  const assetId = node.data.target.sys.id
                  const asset = links.assets.block.filter((block) => block.sys.id === assetId)[0]
                  // console.log(asset);
                  return `<img src=${asset.url} alt=${asset.title} width=${250} />`
                }
            }
        }
      
        return links ? documentToHtmlString(richText, options): documentToHtmlString(richText)
      }

}

export default Contentful