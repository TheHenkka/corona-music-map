const axios = require('axios');
const axios2 = require('axios');
let spotifyData = [];
const spot = document.getElementById('spotify');

//Delete Spotify embed
if (spot.childElementCount != 0) {
    while (spot.firstChild) {
        spot.removeChild(spot.firstChild);
    }
}


//Using Axios get data from Spotify. Goes through proxy server.
axios.get('regional/us/weekly/2019-12-27--2020-01-03/download')
    .then(function (response) {
        //Get country's top songs from the week. Add them to Spotify embed. 
        if (response.status = "200" && response.data != []) {
            console.log("OK!");

            spotifyData = response.data;
            let spotURL = spotifyData.split('\n')[2].split('open.spotify.com/')[1];
            spot.src = "http://open.spotify.com/embed/" + spotURL;

            console.log(spotifyData);
        }

    })
    .catch(function (error) {
        // handle error
        console.log(error);
        console.log("error");
    });

export { axios }

//Using Axios get data from COVID-19 API.
axios2.get('https://api.covid19api.com/dayone/country/south-africa/status/confirmed')
    .then(function (response) {
        if (response.status = "200") {
            console.log("OK!");
            console.log(response.data);
        }
    })
    .catch(function (error) {
        // handle error

        console.log(error);
    });

export { axios2 }
