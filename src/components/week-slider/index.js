import listeners from './listeners';
import { weekChanged } from './events';


export const updateButton = () => {
    if (window.pause === false)
        document.getElementById("buttonClass").className = "fa fa-pause";
    else
        document.getElementById("buttonClass").className = "fa fa-play";
};


export const sliderInit = async () => {

    const slider = document.getElementById('weekSlider');
    const output = document.getElementById("weekNum");

    window.week = 0;
    slider.value = 0;
    output.innerHTML = "Week: " + 0;
    window.dispatchEvent(weekChanged);
};


export default async () => {
    await sliderInit();
    listeners();
};