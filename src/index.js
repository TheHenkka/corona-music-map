import * as components from './components';
import './styles/index.scss';

//Initalizing components
async function init() {

    await components.MapComponent();
}

init();

console.log('Hello');
