import listeners from './listeners';
const axios = require('axios');
//import { weekChanged } from './events';

//Using Axios get data from COVID-19 API.
export const getCoronaData = () => {

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
        });
}


export default () => {
    //getCoronaData();
    listeners();
};