const axios = require('axios');
const testi = document.getElementById('info');
//import { weekChanged } from './events';

//Using Axios get data from COVID-19 API.
function getCoronaData() {
    console.log("KSISA");
    axios.get('https://api.covid19api.com/dayone/country/' + window.country + '/status/confirmed')
        .then(function (response) {
            if (response.status = "200") {
                console.log("OK!");
                console.log(response.data);
            }
        })
        .catch(function (error) {
            // handle error

            console.log(error);
            console.log(window.country);
        });
}

function dothis(){
    console.log("WEEK" + window.week);
    window.week++;
}

function test() {

    var newButton = document.createElement("button")
    newButton.innerHTML ="HELO";
    newButton.addEventListener("click", dothis);
    console.log("1111");
    testi.appendChild(newButton);
    console.log("2222");

}

export default () => {
    getCoronaData();
    test();
};