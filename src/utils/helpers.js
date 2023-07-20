// File to contain helper functions and utilities needed throughout the project
import { format, parseISO } from 'date-fns'

const helpers = {
    // returns a random item from an array of items
    getRandomItem : (items) => {
        return items[Math.floor(Math.random()*items.length)];
    },

    saveToLocalStorage : (items) => {
        localStorage.setItem('briq-app-favourites', JSON.stringify(items));
    },
    
    formatDate : (date, isParseISO=false, dateFormat='d/L/y HH:mm') => {
        return isParseISO ? format(parseISO(date), dateFormat) : format(date, dateFormat)
    }
}


export default helpers