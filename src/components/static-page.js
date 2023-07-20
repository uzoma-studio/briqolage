import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography'; 

import '../styles/screen.css';

import Contentful from '../utils/contentful'

import Window from "./window";

export default function StaticPageComponent({ contentfulQuery, pageTitle, icon, style }) {

  const [pageContent, setPageContent] = useState('')

  const pages = {
    'About': { contentfulCollection: 'aboutPageCollection'} ,
    'Help': { contentfulCollection: 'helpPageCollection' }
  }

  const currentPage = pages[pageTitle]

  useEffect(() => {
    Contentful.get(contentfulQuery)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        const contentfulCollection = currentPage.contentfulCollection

        // rerender the entire component with new data
        setPageContent(data[contentfulCollection].items[0].content);
      });
  }, [contentfulQuery, currentPage.contentfulCollection]);

  return (

    <Window title={pageTitle} icon={icon} style={style}>
            
      <Typography className="font-face-nmR" variant="body2" gutterBottom sx={{
          width: '100%',
      }}>
        {pageContent}
      </Typography>

    </Window>
    
  );
}