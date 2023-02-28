// File to contain helper functions and utilities needed throughout the project


const helpers = {
    // returns a random item from an array of items
    getRandomItem : (items) => {
        return items[Math.floor(Math.random()*items.length)];
    },

    saveToLocalStorage : (items) => {
        localStorage.setItem('briq-app-favourites', JSON.stringify(items));
    }
}


export default helpers