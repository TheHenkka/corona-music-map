import listeners from './listeners';
import { weekChanged } from './events';

export const changeWeek = () => {
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