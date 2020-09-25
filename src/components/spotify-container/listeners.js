import { getSpotifyData } from './index';

export default () => {
    window.addEventListener('weekChanged', () => {
        getSpotifyData();
        //updateSpotifyData();
    }, false);

    window.addEventListener('countryChanged', () => {
        getSpotifyData();
        //updateSpotifyData();
    }, false);

};