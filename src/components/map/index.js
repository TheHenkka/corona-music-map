import jsonMap from './maps/map2.json';
import listeners from './listeners';
import { countryChanged } from './events';
import { geoMercator, geoPath, select, mouse } from 'd3';
import * as topojson from 'topojson-client';

export const width = window.innerWidth / 2;      //800;
export const height = window.innerHeight / 1.5;  //800;

export const svg = select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

export const projection = geoMercator()
    .center([25, 57])
    .translate([width / 2, height / 2])
    .scale([width / 1.75]);

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
        .attr('country-pop', (d) => d.properties.pop_est)
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

    let clickedCountry = select(this);

    //Check if anything is selected on init. Select Finland if not
    if (clickedCountry.empty()) {
        clickedCountry = svg.selectAll("path")
            .filter(function () {
                return select(this).attr("country-name") == "Finland";
            })
    }

    //Remove previously clicked country
    select('.selected').classed('selected', false);

    //Paint it
    clickedCountry.classed('selected', true);

    window.country = clickedCountry.attr("country-name");
    window.population = clickedCountry.attr("country-pop");
    window.dispatchEvent(countryChanged);
}


export default async () => {
    try {
        drawMap(jsonMap);
    } catch (error) {
        console.error(error);
    }
    listeners();
    selectedCountry();
};