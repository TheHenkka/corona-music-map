const axios = require('axios');
const axios2 = require('axios');

export {default as MapComponent} from './map';

const test = (greeting) => {
  return `${greeting}, world`
}

export { test }

//Using Axios get data from Spotify. Goes through proxy server.
axios.get('regional/gb/weekly/2019-12-27--2020-01-03/download')
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
});

export { axios}

//Using Axios get data from COVID-19 API.
axios2.get('https://api.covid19api.com/dayone/country/south-africa/status/confirmed')
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
});

export { axios2}
