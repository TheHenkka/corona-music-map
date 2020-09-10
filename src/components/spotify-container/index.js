import codes from '../../../data/nameToCode.json';
import listeners from './listeners';
import { weekChanged } from './events';

const axios = require('axios');
let spotifyData = [];
const spot = document.getElementById('spotify');

//Delete old Spotify embed
if (spot.childElementCount != 0) {
    while (spot.firstChild) {
        console.log("SSSS");
        spot.removeChild(spot.firstChild);
    }
}




function dothis() {
    console.log("WEEK" + window.week);
    window.week++;
    console.log("WEEK" + window.week);
    document.dispatchEvent(weekChanged);
}



/*
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

*/
export const taata = () => {
    const testi = document.getElementById('info');
    var newButton = document.createElement("button")
    newButton.innerHTML = "HELO";
    newButton.onclick = dothis;
    testi.appendChild(newButton);
}


//TODO: Tests and checks
//Finds Spotify data from selected country
export const getSpotifyData = () => {
    //const date = '2019-12-27'
    let firstDay = new Date("2019-12-27");
    firstDay.setDate(firstDay.getDate() + 7 * window.week);

    let lastDay = new Date(firstDay.toISOString().split('T')[0]);
    lastDay.setDate(lastDay.getDate() + 7);

    const date = firstDay.toISOString().split('T')[0] + '--' + lastDay.toISOString().split('T')[0];
    console.log(date);

    let countryCode = "global";

    //Find matching country code using country name
    countryCode = codes.find(item => item.country === window.country).abbreviation.toLowerCase();
    let theUrl = 'regional/' + countryCode + '/weekly/' + date + '/download';


    //Using Axios get data from Spotify. Goes through proxy server. BUT only when init. 
    axios.get(theUrl)
        .then(function (response) {
            //Get country's top songs from the week. Add them to Spotify embed. 
            spotifyData = response.data;
            let spotURL = spotifyData.split('\n')[2].split('open.spotify.com/')[1];
            spot.src = "http://open.spotify.com/embed/" + spotURL;

            console.log(spotifyData);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
            console.log("error");
        });
}


export default async () => {
    getSpotifyData();
    getSpotifyData();
    taata();
    listeners();
    dothis();
    
};