import { changeWeek } from './index';

export default () => {
    document.getElementById("pause").addEventListener('click', () => {
        if (pause == true)
            pauseSlider();
        else
            playSlider();
    });

};