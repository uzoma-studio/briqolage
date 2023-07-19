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

const AboutApp = ({icon}) => {

  const pageIcon = icon ? {
    id: 'aboutIcon',
    alt: 'about',
    src: "https://res.cloudinary.com/nieleche/image/upload/v1669859352/aboutbriq_grwbqc.png"
} : null

  return (
    <StaticPageComponent 
        contentfulQuery={query}
        pageTitle='About'
        isTooltip={true}
        icon={pageIcon}
        style={{ width: '45vw' }}
    />
  )
}

export default AboutApp