const axios = require('axios');
const axios2 = require('axios');

const test = (greeting) => {
  return `${greeting}, world`
}

export { test }

//Using Axios get data from COVID-19 API.
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


/*
//Using Axios get data from Spotify. Spotify doesn't allow CORS so "cors-anywhere.herokuapp" is needed as proxy server.
axios.post('https://localhost:8080/?url=http://spotifycharts.com/regional/gb/weekly/2019-12-27--2020-01-03/', {
  headers: {
    mode: 'cors',
    credentials: 'include'
  }

})
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

export { axios }






*/



//https://api.covid19api.com/dayone/country/south-africa/status/confirmed
//https://api.covid19api.com/countries
//https://spotifycharts.com/regional/us/weekly/2019-12-27--2020-01-03
//'https://api.github.com/users/thehenkka')


/*
const express = require('express');
const router = express.Router();

const app = express()
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})


app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})


router.get('/', function(req, res, next){
axios.get('https://spotifycharts.com/regional/us/weekly/2019-12-27--2020-01-03')
then(response => {
  res.send(response.data.result);

}).catch(error => {
  res.send(error.message);
})
});


axios2.get( 'https://api.github.com/users/thehenkka') //'https://api.github.com/users/thehenkka')
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
})

async function getData() {
try {
   let res = await axios({
        url: 'https://cors-anywhere.herokuapp.com/http://spotifycharts.com/regional/us/weekly/2019-12-27--2020-01-03/download',
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if(res.status == 200){
        // test for status you want, etc
        console.log(res.status)
    }
    // Don't forget to return something
    return res.data
}
catch (err) {
    console.error(err);
}
}

getData()
.then(res => console.log(res))
*/