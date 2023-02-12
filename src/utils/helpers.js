// File to contain helper functions and utilities needed throughout the project


const helpers = {
    // returns a random item from an array of items
    getRandomItem : (items) => {
        return items[Math.floor(Math.random()*items.length)];
    }
}


export default helpers