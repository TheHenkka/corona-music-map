import listeners from './listeners';
import { weekChanged } from './events';

function dothis() {
    console.log("WEEK" + window.week);
    window.week++;
    console.log("WEEK" + window.week);
    document.dispatchEvent(weekChanged);
}

/*

export const changeWeek = () => {
    console.log("AAJAJ");
    const testi = document.getElementById('info');
    var newButton = document.createElement("button")
    newButton.innerHTML = "HELO";
    newButton.onclick = dothis;
    testi.appendChild(newButton);
}

*/


export const changeWeek = () => {
    console.log("AAJAJ");
    const slider = document.getElementById('weekSlider');
    const output = document.getElementById("weekNum");
    slider.oninput = function () {
        output.innerHTML = this.value;
        window.week = this.value;
        window.dispatchEvent(weekChanged);
    }
}





export default async () => {
    changeWeek();
    listeners();
};