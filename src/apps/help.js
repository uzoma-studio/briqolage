import React from 'react'

import StaticPageComponent from '../components/static-page'

const query = `
{
  helpPageCollection {
    items {
      content
    }
  }
}
`

const HelpAndContactApp = () => {
  return (
    <StaticPageComponent 
        contentfulQuery={query}
        pageTitle='Help'
        isTooltip={false}
        icon={null}
        style={{width: '50vw'}}
    />
  )
}

export default HelpAndContactApp