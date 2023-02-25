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
        tabLabel='Help and Contact'
    />
  )
}

export default HelpAndContactApp