import listeners from './listeners';
const axios = require('axios');

export let id;

let coronaData;
let i = 0;

//Find corona data for selected week
export const updateCoronaData = () => {

    //Find correct date and index
    if (coronaData.findIndex(obj => obj.Date.split("T")[0]===window.date)) {
        i = 5 + 7 * window.week;
        id = setInterval(myTimer, 710);
    }

    //If slider is playing, update info "Total Cases: "
    function myTimer() {

        if (window.pause === false) {
            document.getElementById("caseNum").innerHTML =  coronaData[i].Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("deadNum").innerHTML = coronaData[i].Deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("recovNum").innerHTML = coronaData[i].Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            //Make sure array has values
            if (typeof coronaData[i + 1] !== 'undefined')
                i++;
            else {
                clearInterval(id);
            }
        }
    }
}

//Using Axios get data from COVID-19 API.
export const getCoronaData = () => {
    axios.get('https://api.covid19api.com/total/country/' + window.country)
        .then(function (response) {
            coronaData = response.data;
            document.getElementById("countryName").innerHTML = window.country;
            document.getElementById("population").innerHTML = window.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}


export default () => {
    getCoronaData();
    listeners();
};