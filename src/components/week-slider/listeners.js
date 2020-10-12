import { pauseSlider } from './events';
import { playSlider } from './events';
import { weekChanged } from './events';
import { updateButton } from './index';


export default () => {

    let sliderId;
    const slider = document.getElementById("weekSlider");
    const sliderNum = document.getElementById("weekNum");
    const pauseBut = document.getElementById("pause");


    slider.addEventListener('click', () => {
        const roundWeek = Math.round(slider.value);
        slider.value = roundWeek;
        sliderNum.value =  "Week: " + roundWeek;
        window.week = roundWeek;
        window.dispatchEvent(weekChanged);
    });

    
    pauseBut.addEventListener('click', () => {
        window.pause = !window.pause;
        if (window.pause === true)
            window.dispatchEvent(pauseSlider);
        else
            window.dispatchEvent(playSlider);

        updateButton();
    });


    window.addEventListener('pauseSlider', () => {
        clearInterval(sliderId);
    });


    window.addEventListener('playSlider', () => {

        sliderId = setInterval(myTimer, 50);

        function myTimer() {
            slider.value = parseFloat(slider.value) + 0.01;
            if (slider.value % 1 === 0) {
                sliderNum.value =  "Week: " + slider.value;
                if (slider.max == window.week) {
                    window.pause = !window.pause;
                    updateButton();
                    window.dispatchEvent(pauseSlider);
                } else {
                    window.week = slider.value;
                }
                window.dispatchEvent(weekChanged);
            }
        }
    });
};