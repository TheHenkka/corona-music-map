import codes from '../../../data/nameToCode.json';
import listeners from './listeners';

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


//Find matching country code using country name
//TODO: tests
function getCountryCode(country) {
    let code ='';

    try {
        code = codes.find(item => item.country === country).abbreviation.toLowerCase();
    } catch (error) {
        code ='global';
    }
    
    return code;
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

    let countryCode = getCountryCode(window.country);
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
        });
}


export default () => {
    getSpotifyData();
    listeners();
    
};