const test = (greeting) => {
  return `${greeting}, world`
}

/*
// Send a POST request
const axios = require('axios');
axios({
  method: 'post',
  url: 'https://data.europa.eu/euodp/data/apiodp/package_show',
  headers: {
    'access-control-allow-headers': 'X-CKAN-API-KEYAuthorizationContent-Type',
    'access-control-allow-methods': 'POSTPUTGETDELETEOPTIONS',
    'access-control-allow-origin': '*',
    'Content-Type': 'application/json'
  },
  data: {
    id: 'covid-19-coronavirus-data'
  }
});

*/

const axios = require('axios');
axios.get( 'https://api.covid19api.com/countries') //'https://api.github.com/users/thehenkka')
  .then(function (response) {
    // handle success
    console.log(response.data[0]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

export { test }
export { axios}