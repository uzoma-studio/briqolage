import React from 'react';
import Window from '../components/window';
import Artworks from '../components/artworks/artworks';

export default function Gallery() {
  const isSmallScreen = window.innerWidth < 768; // Define the breakpoint for small screens

  const windowStyle = isSmallScreen ? {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } : {
    top: '50vh',
    left: '15vw',
    width: '55em',
  };

  return (
    <Window
      title='Artworks'
      icon={{
        id: 'galleryId',
        alt: 'gallery',
        src: 'https://res.cloudinary.com/nieleche/image/upload/v1676945963/art_s9ina0.png'
      }}
      style={windowStyle}
    >
      <Artworks className="ArtworksCon" />
    </Window>
  );
}
