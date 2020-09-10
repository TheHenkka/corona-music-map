import { getSpotifyData } from './index';

export default () => {
    window.addEventListener('weekChanged', () => {
        console.log("Week shanvtes");
        getSpotifyData();

    });
};