import * as components from './components';
import './styles/index.scss';
import globals from './globals';

//Initalizing components
async function init() {
    globals();
    await components.MapComponent();
    await components.SpotifyComponent();
    await components.InfoComponent();

}

init();
//document.addEventListener('DOMContentLoaded', init, false);


console.log('Hello');
