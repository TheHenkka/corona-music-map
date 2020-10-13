import listeners from './listeners';
import { weekChanged } from './events';

//Changes the symbol on the button
export const updateButton = () => {
    if (window.pause === false)
        document.getElementById("buttonClass").className = "fa fa-pause";
    else
        document.getElementById("buttonClass").className = "fa fa-play";
};

//Get current week number for the slider max value
//https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
function getWeekNumber() {
    var newDate = new Date();
    var d = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

//Initialize slider
export const sliderInit = async () => {

    const slider = document.getElementById('weekSlider');
    const output = document.getElementById("weekNum");

    window.week = 1;
    slider.value = 1;
    slider.max = getWeekNumber();
    output.innerHTML = "Week: " + 1;
    window.dispatchEvent(weekChanged);
};


export default async () => {
    await sliderInit();
    listeners();
};