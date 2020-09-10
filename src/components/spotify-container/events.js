/*
export const weekChanged = function () {

    let weekChanged = new CustomEvent("weekChanged", {bubbles: true, cancelable: true});
    window.dispatchEvent(weekChanged);
};

*/

const createEvent = (name) => {
    let event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
};

export const weekChanged = createEvent('weekChanged');