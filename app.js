var proxy = require('express-http-proxy');
var path = require('path');
var express = require('express');
var app = require('express')();
 
app.use('/regional', proxy('https://spotifycharts.com'));

app.use(express.static(path.join(__dirname, '/dist')));


app.get('/*', function(req, res){
  res.sendFile("index.html", {root: path.join(__dirname, '/dist')});
});

app.listen(8080, function() {
  console.log("App is running at localhost: 80")
});

/*

var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://www.google.com' });
}).listen(8080);




/*

var express = require('express');


//var httpProxy = require('http-proxy');
//var apiProxy = httpProxy.createProxyServer();

var app = express();

app.use(express.static(path.join(__dirname, '/dist')));



app.get('/*', function(req, res){
  res.sendFile("index.html", {root: path.join(__dirname, '/dist')});
});


app.listen(8080, function() {
  console.log("App is running at localhost: 80")
});


/*
// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;
 
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

*/