import { getCoronaData } from './index';

export default () => {

    window.addEventListener('weekChanged', () => {
        getCoronaData();

    }, false);

    window.addEventListener('countryChanged', () => {
        getCoronaData();
    }, false);

}