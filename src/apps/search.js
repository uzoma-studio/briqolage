import React from 'react';
import styledd from "styled-components";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import '../styles/screen.css';
import SearchResult from '../components/search/search-results';
import Window from "../components/window";



export default function Search() {

  return (

    <Window title='Search' icon={{
      id: 'Search',
      alt: 'search',
      src: 'https://res.cloudinary.com/nieleche/image/upload/v1689951723/1024px-Search_Icon.svg_tvgimc.png'
      }}
      style={{ width: '50em', height: '30em'}}>


    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <SearchResult className="ArtworksCon" />
      </Box>
    </div>
    </Window>
  );
}

const AppContainer = styledd.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;
