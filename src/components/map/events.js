const createEvent = (name) => {
    let event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
};

export const countryChanged = createEvent('countryChanged');