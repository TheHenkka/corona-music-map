import jsonMap from './maps/map.json';
import { geoMercator, geoPath, select, geoBounds, geoCentroid } from 'd3';
import * as topojson from 'topojson-client';

const width = 1200;
const height = 600;

const svg = select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = geoMercator().center([25, 60]).scale(100);
const path = geoPath().projection(projection);

let clickedCountry = [];

//Loading and drawing map. Give countries some attributes to help access them.
const drawMap = (map) => {

    //Load map from JSON
    const countries = topojson.feature(map, map.objects.countries).features;

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
        .attr('d', path);
};

//Click event for selecting country
function selectedCountry() {

    clickedCountry = select(this);
    console.log(clickedCountry);

    //Remove previously clicked country
    select('.selected').classed('selected', false)
    
    //Paint it
    clickedCountry.classed('selected', true)
    
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
};