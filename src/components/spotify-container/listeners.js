import { getSpotifyData } from './index';

export default () => {
    window.addEventListener('weekChanged', () => {
        try {
            getSpotifyData();
        } catch (error) {
            console.error('Week change has caused an error: ', error);
        }
    }, false);

    window.addEventListener('countryChanged', () => {
        try {
            getSpotifyData();
        } catch (error) {
            console.error('Country change has caused an error: ', error);
        }
    }, false);

};