# corona-music-map

Tool to visualize changes to Spotify listening preferences during COVID-19 pandemic. Using open data from Johns Hopkins University and Spotify.

Currently running on [AWS](http://ec2-34-220-99-209.us-west-2.compute.amazonaws.com/)

## Getting started

### Prerequisites
  
  1. [Node](https://nodejs.org/) - for npm
  2. Clone this repository `git clone https://github.com/TheHenkka/corona-music-map/`

  ### Installation

  1. Go to project directory `cd corona-music-map`.
  2. Run `npm install` to install all dependencies.
  3. Run `npm run build` to build the production version.

  ## Usage

  1. Run `npm start` (or `node app.js` if you are using production version) to run site locally.
  2. Go to `localhost:8080` on your browser to open the site.
  

  ## Used resources

- [Spotify Charts](https://spotifycharts.com/regional)
- [Johns Hopkins University COVID-19 data](https://github.com/CSSEGISandData/COVID-19)
- [API for COVID-19 data from Johns Hopkins CSSE](https://covid19api.com/)

## Author
Hentter Eloranta
