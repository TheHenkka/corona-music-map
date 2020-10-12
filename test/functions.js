///////////////////////////////////////////
// This is stupid way of doing tests. :( //
// But there isn't much to test.         //
//////////////////////////////////////////


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


//Calculate correct ISO dates based on week number 
//https://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
function getDateOfISOWeek(w, y) {

    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

    let year = ISOweekStart.getFullYear();
    let month = ISOweekStart.getMonth() + 1;
    let dt = ISOweekStart.getDate();

    //If day or month is single digit, make it double
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    //Start day of the week, Monday, needed for corona data
    return year + '-' + month + '-' + dt;
}


module.exports = {
    getWeekNumber: getWeekNumber,
    getDateOfISOWeek: getDateOfISOWeek
  };