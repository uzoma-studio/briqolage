import React from 'react';

import Window from '../components/window';
import Artworks from '../components/artworks/artworks'

export default function Gallery() {

  return (
    <Window title='Artworks' icon={{
      id: 'galleryId',
      alt: 'gallery',
      src: 'https://res.cloudinary.com/nieleche/image/upload/v1676945963/art_s9ina0.png'
    }}
      style={{top: '50vh', left: '15vw', width: '40em'}}
    >
      <Artworks className="ArtworksCon" />
    </Window>
  );
}

