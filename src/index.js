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

document.addEventListener('DOMContentLoaded', init);

//console.log('Hello');
