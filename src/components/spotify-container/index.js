import codes from '../../../data/nameToCode.json';
import countries from '../../../data/spotifyCountries.json';
//import fakeData from '../../../data/fakeSpotData.csv';
import listeners from './listeners';

const axios = require('axios');
let spotifyData;

//Find matching country code using country name
function getCountryCode(country) {

    let code = '';

    //Try to find country code for selected country if country has Spotify 
    try {
        for (let i in countries.countries) {
            if (countries.countries[i] === country) {
                code = codes.find(item => item.country === country).abbreviation.toLowerCase();
            }
        }
    } catch (error) {
        console.log("Country code not found! " + error);
        code = 'global';
    }

    //Some countries don't have Spotify or Spotify charts start in the middle of the year
    if (code === "ru" ||code === "ua" || code === '') 
        code = 'global';
    
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

    //Start day of the week, Monday, needed for corona data
    window.date = year + '-' + month + '-' + dt;

    //Spotify week starts on Friday
    ISOweekStart.setDate(ISOweekStart.getDate() + 4);

    year = ISOweekStart.getFullYear();
    month = ISOweekStart.getMonth() + 1;
    dt = ISOweekStart.getDate();

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
//Get country's top 3 songs of the week. 
export const getSpotifyData = () => {

    const date = getDateOfISOWeek(window.week, window.year);
    const countryCode = getCountryCode(window.country);
    const theUrl = 'regional/' + countryCode + '/weekly/' + date + '/download';

    //Using Axios get data from Spotify. Goes through proxy server.
    axios.get(theUrl)
        .then(function (response) {
            //spotifyData = response.data;
            updateSpotifyData(response.data);
        })
        .catch(function (error) {
            // handle error
            //spotifyData = fakeData;
            console.log(error);
        });
}


//Add top 3 songs to Spotify embed list. 
export const updateSpotifyData = (res) => {

    const list = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < list.length; i++) {

        let spot = res.split('\n')[2 + i];
        let spotNum = spot.split(',')[0];
        let spotSong = spot.split(',')[1].replace(/"/gi, '');
        let spotArt = spot.split(',')[2].replace(/"/gi, '');
        let spotStreams = spot.split(',')[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        list[i].innerHTML = spotNum + ". " + spotArt + " - " + spotSong + " " + spotStreams;
        document.getElementById('spotify' + i).src = "http://open.spotify.com/embed/" + spot.split('open.spotify.com/')[1];

    }
}


//Clicking the list opens element
function initSpotList() {

    const list = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < list.length; i++) {
        list[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}


export default () => {
    initSpotList();
    getSpotifyData();
    listeners();
};