const axios = require('axios');

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

export default () => {
    getCoronaData();
};