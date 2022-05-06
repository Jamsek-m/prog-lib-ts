import { describe, it } from "mocha";
import { expect } from "chai";

import {
    daysDiffBetweenDates,
    getDateDaysAfter,
    getDateDaysBefore,
    getDayOfWeek,
    resetTime,
    truncateTime
} from "../src";


const date1 = new Date(2021, 7, 14, 13, 30, 15);
const date2 = new Date(2021, 7, 23, 11, 20, 34);
const mondayDate = new Date(2021, 7, 16, 13, 30, 15);
const sundayDate = new Date(2021, 7, 8, 13, 30, 15);
const stringDate = "2021-08-14T11:30:15.000Z";
const numberDate = 1628940615000;

describe("getDateDaysAfter(date, daysFrom)", () => {
    
    it("With positive numbers", () => {
        const newDate1 = getDateDaysAfter(date1, 4);
        const newDate2 = getDateDaysAfter(date1, 1);
        const newDate3 = getDateDaysAfter(date1, 40);
        
        expect(newDate1.getDate()).to.be.equals(18);
        expect(newDate2.getDate()).to.be.equals(15);
        expect(newDate3.getDate()).to.be.equals(23);
        expect(newDate3.getMonth()).to.be.equals(8);
    });
    
    it("With negative numbers", () => {
        const newDate1 = getDateDaysAfter(date1, -4);
        const newDate2 = getDateDaysAfter(date1, -20);
        
        expect(newDate1.getDate()).to.be.equals(10);
        expect(newDate2.getDate()).to.be.equals(25);
        expect(newDate2.getMonth()).to.be.equals(6);
    });
    
    it("With zero", () => {
        const newDate3 = getDateDaysAfter(date1, 0);
        expect(newDate3.getDate()).to.be.equals(date1.getDate());
    });
    
    it("Should be immutable", () => {
        const oldTime = date1.getTime();
        getDateDaysAfter(date1, 5);
        expect(date1.getTime()).to.be.equals(oldTime);
    });
    
    it("Empty", () => {
        expect(() => getDateDaysAfter(null as unknown as Date, 5)).to.throw(ReferenceError);
    });
    
});

describe("getDateDaysBefore(date, daysBefore)", () => {
    
    it("With positive numbers", () => {
        const newDate1 = getDateDaysBefore(date1, 4);
        const newDate2 = getDateDaysBefore(date1, 1);
        const newDate3 = getDateDaysBefore(date1, 40);
        
        expect(newDate1.getDate()).to.be.equals(10);
        expect(newDate2.getDate()).to.be.equals(13);
        expect(newDate3.getDate()).to.be.equals(5);
        expect(newDate3.getMonth()).to.be.equals(6);
    });
    
    it("With negative numbers", () => {
        const newDate1 = getDateDaysBefore(date1, -4);
        const newDate2 = getDateDaysBefore(date1, -20);
        
        expect(newDate1.getDate()).to.be.equals(18);
        expect(newDate2.getDate()).to.be.equals(3);
        expect(newDate2.getMonth()).to.be.equals(8);
    });
    
    it("With zero", () => {
        const newDate3 = getDateDaysBefore(date1, 0);
        expect(newDate3.getDate()).to.be.equals(date1.getDate());
    });
    
    it("Should be immutable", () => {
        const oldTime = date1.getTime();
        getDateDaysBefore(date1, 5);
        expect(date1.getTime()).to.be.equals(oldTime);
    });
    
    it("Empty", () => {
        expect(() => getDateDaysBefore(null as unknown as Date, 5)).to.throw(ReferenceError);
    });
    
});

describe("getDayOfWeek", () => {
    
    it("Middle of week", () => {
        const day = getDayOfWeek(date1);
        expect(day).to.be.equals(5);
    });
    
    it("Monday", () => {
        const day = getDayOfWeek(mondayDate);
        expect(day).to.be.equals(0);
    });
    
    it("Sunday", () => {
        const day = getDayOfWeek(sundayDate);
        expect(day).to.be.equals(6);
    });
    
    it("Empty", () => {
        expect(() => getDayOfWeek(null as unknown as Date)).to.throw(ReferenceError);
    });
    
});

describe("resetTime", () => {
    
    it("Truncate time from date", () => {
        const truncatedDate = resetTime(date1);
        expect(truncatedDate.getFullYear()).to.be.equals(date1.getFullYear());
        expect(truncatedDate.getMonth()).to.be.equals(date1.getMonth());
        expect(truncatedDate.getDate()).to.be.equals(date1.getDate());
        expect(truncatedDate.getHours()).to.be.equals(0);
        expect(truncatedDate.getMinutes()).to.be.equals(0);
        expect(truncatedDate.getMilliseconds()).to.be.equals(0);
    });
    
    it("Should be immutable", () => {
        const oldTime = date1.getTime();
        resetTime(date1);
        expect(date1.getTime()).to.be.equals(oldTime);
    });
    
    it("Empty", () => {
        expect(() => resetTime(null as unknown as Date)).to.throw(ReferenceError);
    });
    
});

describe("truncateTime", () => {
    
    it("Truncate time from date", () => {
        const truncatedDate = truncateTime(date1);
        expect(truncatedDate.getFullYear()).to.be.equals(date1.getFullYear());
        expect(truncatedDate.getMonth()).to.be.equals(date1.getMonth());
        expect(truncatedDate.getDate()).to.be.equals(date1.getDate());
        expect(truncatedDate.getHours()).to.be.equals(0);
        expect(truncatedDate.getMinutes()).to.be.equals(0);
        expect(truncatedDate.getMilliseconds()).to.be.equals(0);
    });
    
    it("Truncate time from date as string", () => {
        const truncatedDate = truncateTime(stringDate);
        expect(truncatedDate.getFullYear()).to.be.equals(date1.getFullYear());
        expect(truncatedDate.getMonth()).to.be.equals(date1.getMonth());
        expect(truncatedDate.getDate()).to.be.equals(date1.getDate());
        expect(truncatedDate.getHours()).to.be.equals(0);
        expect(truncatedDate.getMinutes()).to.be.equals(0);
        expect(truncatedDate.getMilliseconds()).to.be.equals(0);
    });
    
    it("Truncate time from date as number", () => {
        const truncatedDate = truncateTime(numberDate);
        expect(truncatedDate.getFullYear()).to.be.equals(date1.getFullYear());
        expect(truncatedDate.getMonth()).to.be.equals(date1.getMonth());
        expect(truncatedDate.getDate()).to.be.equals(date1.getDate());
        expect(truncatedDate.getHours()).to.be.equals(0);
        expect(truncatedDate.getMinutes()).to.be.equals(0);
        expect(truncatedDate.getMilliseconds()).to.be.equals(0);
    });
    
    it("Should be immutable", () => {
        const oldTime = date1.getTime();
        truncateTime(date1);
        expect(date1.getTime()).to.be.equals(oldTime);
    });
    
    it("Empty", () => {
        expect(() => truncateTime(null as unknown as Date)).to.throw(ReferenceError);
    });
    
});

describe("daysDiffBetweenDates", () => {
    
    it("Get dates diff", () => {
        expect(daysDiffBetweenDates(date2, date1)).to.be.equals(-9);
        expect(daysDiffBetweenDates(date1, date2)).to.be.equals(9);
    });
    
    it("Empty", () => {
        expect(() => daysDiffBetweenDates(null as unknown as Date, date1)).to.throw(ReferenceError);
        expect(() => daysDiffBetweenDates(date1, null as unknown as Date)).to.throw(ReferenceError);
        expect(() => daysDiffBetweenDates(null as unknown as Date, null as unknown as Date)).to.throw(ReferenceError);
    });
    
});
