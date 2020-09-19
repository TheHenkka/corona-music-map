const createEvent = (name) => {
    let event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
};

export const weekChanged = createEvent('weekChanged');
export const pauseSlider = createEvent('pauseSlider');
export const playSlider = createEvent('playSlider');