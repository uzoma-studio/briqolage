// All functions and operations pertaining to interacting with Contentful

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
    }
}

export default Contentful