import React from 'react';
import Window from '../components/window';
import shopImg from '../files/images/shop.gif'
import styles from '../styles/shop.module.css'


export default function Shop() {
    const isSmallScreen = window.innerWidth < 768; // Define the breakpoint for small screens

  const windowStyle = isSmallScreen ? {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } : {
    top: '25vh',
    left: '5vw',
    width: '35em',
  };

  return (
    <Window title='Briq Shop' icon={{
      id: 'shopId',
      alt: 'shop',
      src: 'https://res.cloudinary.com/nieleche/image/upload/v1689876599/cart_ew9yaz.png'
    }}
    style={windowStyle}
    >
        <div className={styles.container}>
            <p>Briqolage shop coming soon!</p>
            <img src={shopImg} alt="spinning Briq hats" />
            <p>Briqolage shop coming soon!</p>
        </div>
    </Window>
  );
}

