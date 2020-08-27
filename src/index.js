import * as components from './components';
import {test} from './components/index.js';
import {axios} from './components/index.js';
//import {axios2} from './components/test.js';
import './styles/index.scss';

//Initalizing compomonents
async function init() {

    await components.MapComponent();
    
}

init();

console.log(test('Hello'));
console.log(axios);
//console.log(axios2);
