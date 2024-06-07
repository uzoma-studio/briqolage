import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const getFavourites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        return JSON.parse(storedFavorites);
    } else {
        return [];
    }
};

const FavoriteHandler = ({ index }) => {
    const [isFavorite, setIsFavorite] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        return favorites.some(fav => fav.index === index);
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const addToFavorites = () => {
        setIsFavorite(true);
        setAlertMessage('Added to favorites');
        setAlertOpen(true);
        const storedFavorites = localStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        localStorage.setItem('favorites', JSON.stringify([...favorites, { index }]));
    };

    const removeFromFavorites = () => {
        setIsFavorite(false);
        setAlertMessage('Removed from favorites');
        setAlertOpen(true);
        const storedFavorites = localStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        localStorage.setItem('favorites', JSON.stringify(favorites.filter(fav => fav.index !== index)));
    };

    const handleClose = () => {
        setAlertOpen(false);
    };

    return (
        <>
            <FavoriteIcon
                style={{ fill: isFavorite ? 'red' : 'grey' }}
                onClick={() => {
                    if (isFavorite) {
                        removeFromFavorites();
                    } else {
                        addToFavorites();
                    }
                }}
            />
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default FavoriteHandler;
