import jsonMap from './maps/map2.json';
import listeners from './listeners';
import { countryChanged } from './events';
import { geoMercator, geoNaturalEarth1, geoPath, select, geoBounds, geoCentroid } from 'd3';
import * as topojson from 'topojson-client';

const width = 800;//1200;
const height = 800;

const svg = select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

//const projection = geoNaturalEarth1().center([50, 60]).scale(600);

var projection = geoMercator() 
								   .center([ 17, 52 ]) 
								   .translate([ width/2, height/2 ])
								   .scale([ width/1.5 ]);
const path = geoPath().projection(projection);


//Loading and drawing map. Give countries some attributes to help access them.
const drawMap = (map) => {

    //Load map from JSON
    const countries = topojson.feature(map, map.objects.custom).features;

    //Draw it
    const paths = svg.selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('id', (d) => d.properties.id)
        .attr('country-name', (d) => d.properties.name)
        .attr('class', 'countries')
        .on('click', selectedCountry)
        //.on('mouseover', showToolTip)
        .attr('d', path)
        .exit();
};


//Click event for selecting country
function selectedCountry() {

    let clickedCountry = select(this);
    console.log(clickedCountry.attr("country-name"));

    //Remove previously clicked country
    select('.selected').classed('selected', false);
    
    //Paint it
    clickedCountry.classed('selected', true);

    window.country = clickedCountry.attr("country-name");
    window.dispatchEvent(countryChanged);
}


//TODO::Hovering shows tooltip
function showToolTip() {
    
}

export default async () => {
    try {
        drawMap(jsonMap);
    } catch (error) {
        console.error(error);
    }
    listeners();
};