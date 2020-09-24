import { svg,  height, projection } from './index';
import { selectAll } from 'd3-selection';
import { geoPath } from 'd3-geo';


export default () => {

    window.addEventListener('countryChanged', async () => {
        try {
            //getSpotifyData();
            //getCoronaData();
        } catch (error) {
            console.error('Country change has caused an error: ', error);
        }
    }, false);

    window.addEventListener('weekChanged', async () => {
        try {
            //getSpotifyData();
            //getCoronaData();
        } catch (error) {
            console.error('Country change has caused an error: ', error);
        }
    }, false);

    
    window.addEventListener('resize', async () => {

        const node = svg.node();
        const newWidth = window.innerWidth / 2;
        const newHeight = window.innerHeight / 1.5;

        node.setAttribute('width', newWidth);
        node.setAttribute('height', newHeight);

        const a = Math.max(newHeight, newWidth)

        projection.translate([newWidth / 2, newHeight / 2])
        .scale(a / 1.75);

        const path = geoPath().projection(projection);

        selectAll('path').attr('d', path);


    });

    
}