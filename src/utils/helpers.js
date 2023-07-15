// File to contain helper functions and utilities needed throughout the project
import { format } from 'date-fns'

const helpers = {
    // returns a random item from an array of items
    getRandomItem : (items) => {
        return items[Math.floor(Math.random()*items.length)];
    },

    saveToLocalStorage : (items) => {
        localStorage.setItem('briq-app-favourites', JSON.stringify(items));
    },
    
    formatDate : (date) => {
        return format(date, 'd/L/y HH:mm')
    }
}


export default helpers