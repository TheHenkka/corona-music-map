import { getCoronaData, id, updateCoronaData } from './index';

export default () => {

    window.addEventListener('weekChanged', () => {
        clearInterval(id);
        updateCoronaData();

    }, false);

    window.addEventListener('countryChanged', () => {
        clearInterval(id);
        getCoronaData();
        updateCoronaData();
    }, false);

}