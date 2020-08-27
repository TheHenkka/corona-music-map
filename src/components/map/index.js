import jsonMap from './maps/map.json';
import { geoMercator, geoPath, select } from 'd3';
import * as topojson from 'topojson-client';

const width = 1920;
const height = 1080;

const svg = select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const projection = geoMercator();
const path = geoPath().projection(projection);

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
        .attr('d', path);
};

export default async () => {
    try {
        drawMap(jsonMap);
    } catch (error) {
        console.error(error);
    }
};