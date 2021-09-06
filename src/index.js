import {createGame} from "./logic.js";

document.addEventListener('readystatechange', event => {
    console.log(event.target.readyState);
    if (event.target.readyState === 'complete') {
        createGame()
    }
})
