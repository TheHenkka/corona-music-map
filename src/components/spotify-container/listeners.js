import { getSpotifyData } from './index';

export default () => {
    window.addEventListener('weekChanged', () => {
        getSpotifyData();
    }, false);

    window.addEventListener('countryChanged', () => {
        getSpotifyData();
    }, false);
};