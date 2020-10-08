import listeners from './listeners';

const axios = require('axios');


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
}


//Get country's top 3 songs of the week. 
export const getSpotifyData = () => {

    getDateOfISOWeek(window.week, window.year);

    const data = ['data', window.week, window.country];

    //Using Axios get data from Spotify database.
    axios.get(data) //(theUrl)
        .then(function (response) {
            updateSpotifyData(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}


//Add top 3 songs to Spotify embed list. 
export const updateSpotifyData = (res) => {

    const list = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < list.length; i++) {
        list[i].innerHTML = res[i][0] + ". " + res[i][1] + " - " + res[i][2] + " " + res[i][3];
        document.getElementById('spotify' + i).src = "http://open.spotify.com/embed/" + res[i][4].split('open.spotify.com/')[1];
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