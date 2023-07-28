
import React, { useState } from 'react';
import SearchList from './SearchList';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';

function SearchPage({ artworkImages, blogPosts }) {

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false); 

  const combinedData = [...artworkImages, ...blogPosts];
  



  const filteredPersons = combinedData.filter((item) => {
    return item.galleryTitle.toLowerCase().includes(searchField.toLowerCase());
  });


  const handleChange = e => {
    setSearchField(e.target.value);
    if(e.target.value===""){
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };
 
  function searchList() {
    if (searchShow) {
      return (
          <SearchList filteredPersons={filteredPersons} />
      );
    }
  }

  return (
    <>
  <section className="garamond">
    <Box  sx={{ borderColor: 'black', display: 'flex', justifyContent: 'space-between', p: 2}}>    
      <SearchIcon sx={{ pr: 2, pt: 1, fontSize: 20 }} />
      <Input
            placeholder="Search…"
            onChange = {handleChange}
            type="search"
          />
    </Box>
      {searchList()}
    </section>

    </>
  );
}

export default SearchPage;