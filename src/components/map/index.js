import jsonMap from './maps/map2.json';
import listeners from './listeners';
import { countryChanged } from './events';
import { geoMercator, geoNaturalEarth1, geoPath, select, geoBounds, geoCentroid, mouse } from 'd3';
import * as topojson from 'topojson-client';

const width = 800;//1200;
const height = 800;

const svg = select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var projection = geoMercator()
    .center([17, 52])
    .translate([width / 2, height / 2])
    .scale([width / 1.5]);

const path = geoPath().projection(projection);

var tooltip = select('#map')
    .append('div')
    .attr('class', 'tooltip')


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
        .on('mouseover', showToolTip)
        .on('mouseout', hideToolTip)
        .on('mousemove', moveTooltip)
        .attr('d', path)
        .exit();
};


//Show tooltip when entering element
function showToolTip() {
    tooltip.style('visibility', 'visible')
}


//Hide tooltip when leaving element
function hideToolTip() {
    tooltip.style('visibility', 'hidden')
}


//Move tooltip using mouse position inside the element
function moveTooltip() {
    var xPos = mouse(this)[0];
    var yPos = mouse(this)[1];

    //Map is 25% from the left
    var xPosWin = window.innerWidth / 4 + 20 + xPos;

    tooltip.text(select(this).attr("country-name"))
        .style("left", xPosWin + "px")
        .style("top", yPos + "px")
}


//Click event for selecting country
function selectedCountry() {

    const clickedCountry = select(this);

    //Remove previously clicked country
    select('.selected').classed('selected', false);

    //Paint it
    clickedCountry.classed('selected', true);

    window.country = clickedCountry.attr("country-name");
    window.dispatchEvent(countryChanged);
}


export default async () => {
    try {
        drawMap(jsonMap);
    } catch (error) {
        console.error(error);
    }
    listeners();
};