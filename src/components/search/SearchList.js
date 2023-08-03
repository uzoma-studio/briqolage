import React from 'react';
import Card from './Card';
import ImageList from '@mui/material/ImageList'


function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(item =>  <Card cols={3} sx={{ width: 500, height: 450 }} key={item.id} item={item} />); 
  return (
    <ImageList cols={3} sx={{ width: 500, height: 450 }}>
      {filtered}
    </ImageList>
  );
}

export default SearchList;