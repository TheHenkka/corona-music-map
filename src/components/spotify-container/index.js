import listeners from './listeners';

const axios = require('axios');


//Get country's top 3 songs of the week. 
export const getSpotifyData = () => {

    let data;

    //TODO: clean this
    if (window.year == 2020) 
        data = ['data', window.week, window.country];
    if (window.year == 2021)
        data = ['data', window.week +52, window.country];
    

    //Using Axios get data from Spotify database.
    axios.get(data)
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
        list[i].innerHTML = res[i][0] + ". " + res[i][1] + " - " + res[i][2] + " - " + res[i][3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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