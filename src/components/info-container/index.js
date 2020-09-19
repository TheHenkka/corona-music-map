import listeners from './listeners';
const axios = require('axios');

//Using Axios get data from COVID-19 API.
export const getCoronaData = () => {
    axios.get('https://api.covid19api.com/total/country/' + window.country)
        .then(function (response) {

            console.log(response.data[0].Date);
            console.log(response.data);

            let i = 0;
            let id;

            id = setInterval(myTimer, 500);

            function myTimer() {
                if (window.week >= 4 && window.pause === false) {
                    document.getElementById("countryName").innerHTML = window.country;
                    document.getElementById("caseNum").innerHTML = "Total Cases: " + response.data[i].Confirmed;
                    document.getElementById("deadNum").innerHTML = "Deaths: " + response.data[i].Deaths;
                    document.getElementById("recovNum").innerHTML = "Recovered: " + response.data[i].Recovered;

                    if (typeof response.data[i + 1] !== 'undefined')
                        i++;
                    else {
                        console.log("YLI");
                        clearInterval(id);
                    }
                }
            }
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