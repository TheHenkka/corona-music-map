const assert = require('assert');
const functions = require('../test/functions.js'); 
//const testi = require('../src/components/week-slider/index.js').getWeekNumber; 


const getDateOfISOWeekResult = functions.getDateOfISOWeek(5,2020); //Week, year
const getWeekNumberResult = functions.getWeekNumber();

//CHECK CURRENT WEEK
const currentWeek =42;


describe("Testing week numbers", function() {
    it("5th week should start on '2020-01-27'", function(){
        assert.strictEqual(getDateOfISOWeekResult, '2020-01-27');
    });
});

describe("Testing week numbers", function() {
    it("Should be 42", function(){
        assert.strictEqual(getWeekNumberResult, currentWeek);
    });
});


