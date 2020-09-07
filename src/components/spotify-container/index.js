import codes from '../../../data/nameToCode.json';
const axios = require('axios');
let spotifyData = [];
const spot = document.getElementById('spotify');

//Delete old Spotify embed
if (spot.childElementCount != 0) {
    while (spot.firstChild) {
        spot.removeChild(spot.firstChild);
    }
}


//TODO: Tests and checks
//Finds Spotify data from selected country
function getSpotifyData() {

    //const date = '2019-12-27'
    let firstDay = new Date("2019-12-27");
    firstDay.setDate(firstDay.getDate() + 7 * window.week);

    let lastDay = new Date("2019-12-27");
    lastDay.setDate(lastDay.getDate() + 14 * window.week);

    const date = firstDay.toISOString().split('T')[0] + '--' + lastDay.toISOString().split('T')[0];
    console.log(date);

    let countryCode = "global";
    
    //Find matching country code using country name
    countryCode = codes.find(item => item.country === window.country).abbreviation.toLowerCase();

    //Using Axios get data from Spotify. Goes through proxy server.
    axios.get('regional/' + countryCode + '/weekly/' + date + '/download')
        .then(function (response) {
            //Get country's top songs from the week. Add them to Spotify embed. 
            if (response.status = "200" && response.data != []) {
                console.log("OK!");

                spotifyData = response.data;
                let spotURL = spotifyData.split('\n')[2].split('open.spotify.com/')[1];
                spot.src = "http://open.spotify.com/embed/" + spotURL;

                console.log(spotifyData);
                console.log(window.country);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            console.log("error");
        });
}


export default () => {
    getSpotifyData();
};