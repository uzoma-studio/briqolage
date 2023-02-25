import React from 'react'

import StaticPageComponent from '../components/static-page'

const query = `
{
  aboutPageCollection {
    items {
      content
    }
  }
}
`

const AboutApp = () => {
  return (
    <StaticPageComponent 
        contentfulQuery={query}
        pageTitle='About'
        isTooltip={true}
        icon={{
            id: 'aboutIcon',
            alt: 'about',
            src: "https://res.cloudinary.com/nieleche/image/upload/v1669859352/aboutbriq_grwbqc.png"
        }}
        tabLabel='About Briqolage'
    />
  )
}

export default AboutApp