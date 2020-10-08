var path = require('path');
var express = require('express');
const sqlite3 = require('sqlite3').verbose();

var app = express();

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/*', function (req, res) {

    //Get Spotify data from database. 
    if (req.url.startsWith("/data")) {

        const dataList = req.url.split(",");

        getData(dataList[1], dataList[2], function (err, data) {
            if (err) {
                // error handling
                console.log("ERROR : ", err);
            } else {
                res.send(data);
            }
        });
    }
    else
        res.sendFile("index.html", { root: path.join(__dirname, '/dist') });
});


app.listen(8080, function () {
    console.log("App is running at localhost: 80")
});

//Get data from database.
function getData(weekNum, countryName, cb) {

    let name = decodeURI(countryName);
    let a = [];

    let db = new sqlite3.Database('data/spotify.sql', (err) => {
        if (err)
            console.error(err.message);
        else
            console.log('Connected to the database.');
    });

    const sqlCheck = `SELECT 1
                FROM countries
                WHERE country_name = ?`;

    const sql = `SELECT *
           FROM playlist
           WHERE week  = ? AND country = ?`;

    //Check that country exists in database. If not, use Global list.
    db.all(sqlCheck, [name], (err, rows) => {
        if (err)
            return cb(err, null);

        if (rows.length !== 1) 
            name = 'Global';
        
        db.all(sql, [weekNum, name], (err, rows) => {
            if (err)
                return cb(err, null);

            rows.forEach((row) => {
                a.push([row.position, row.artist, row.song, row.streams, row.website]);
            });

            db.close();

            return cb(null, a);
        });
    });
}