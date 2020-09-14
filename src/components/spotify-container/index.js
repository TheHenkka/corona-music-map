import codes from '../../../data/nameToCode.json';
import listeners from './listeners';

const axios = require('axios');

//Find matching country code using country name
//TODO: tests and check only EU codes that match Spotify
function getCountryCode(country) {

    let code = '';

    try {
        code = codes.find(item => item.country === country).abbreviation.toLowerCase();
    } catch (error) {
        code = 'global';
    }

    return code;
}

//Calculate correct ISO dates based on week number 
//https://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
function getDateOfISOWeek(w, y) {

    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

    //Spotify week starts on Friday
    ISOweekStart.setDate(ISOweekStart.getDate() + 4);

    let year = ISOweekStart.getFullYear();
    let month = ISOweekStart.getMonth() + 1;
    let dt = ISOweekStart.getDate();

    //If day or month is single digit, make it double
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    //Spotify week ends next week on Friday
    ISOweekStart.setDate(ISOweekStart.getDate() + 7);

    let yearEnd = ISOweekStart.getFullYear();
    let monthEnd = ISOweekStart.getMonth() + 1;
    let dtEnd = ISOweekStart.getDate();

    //If day or month is single digit, make it double
    if (dtEnd < 10) {
        dtEnd = '0' + dtEnd;
    }
    if (monthEnd < 10) {
        monthEnd = '0' + monthEnd;
    }

    //Returns date in string format 
    return year + '-' + month + '-' + dt + '--' + yearEnd + '-' + monthEnd + '-' + dtEnd;
}

//TODO: Tests and checks
//Get country's top 3 songs of the week. Add them to Spotify embed. 
export const getSpotifyData = () => {

    const date = getDateOfISOWeek(window.week, 2020);
    const countryCode = getCountryCode(window.country);
    const theUrl = 'regional/' + countryCode + '/weekly/' + date + '/download';

    //Using Axios get data from Spotify. Goes through proxy server. BUT only when init. 
    axios.get(theUrl)
        .then(function (response) {

            const spotifyData = response.data;
            //let spotURL = spotifyData.split('\n')[2].split('open.spotify.com/')[1];

            //let a = document.getElementsByClassName("spotify-list");

            const spot1 = document.getElementById('spotify1');
            let spotURL1 = spotifyData.split('\n')[2].split('open.spotify.com/')[1];
            spot1.src = "http://open.spotify.com/embed/" + spotURL1;

            //    const spot2 = document.getElementById('spotify2');
            //    let spotURL2 = spotifyData.split('\n')[3].split('open.spotify.com/')[1];
            //    spot2.src = "http://open.spotify.com/embed/" + spotURL2;
            //    //spot2.style.display = "none";

            //    const spot3 = document.getElementById('spotify3');
            //    let spotURL3 = spotifyData.split('\n')[4].split('open.spotify.com/')[1];
            //    spot3.src = "http://open.spotify.com/embed/" + spotURL3;
            //    //spot3.style.display = "none";


            //console.log(spotifyData);

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