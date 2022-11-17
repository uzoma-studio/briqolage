// File to contain helper functions and utilities needed throughout the project

const helpers = {
    getRandomItem : (items) => {
        return items[Math.floor(Math.random()*items.length)];
    }
}


export default helpers