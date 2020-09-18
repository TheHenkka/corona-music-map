
import { countryChanged } from './events';

export default () => {

    window.addEventListener('countryChanged', async () => {
        try {
            console.log("1");
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
}