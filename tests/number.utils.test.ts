import { describe, it } from "mocha";
import { expect } from "chai";

import { isFloat, isInteger, stringIsInteger, isNumber } from "../src";


describe("isFloat(num)", () => {
    
    it("Should accept floats", () => {
        expect(isFloat(2.4)).to.true;
        expect(isFloat(1.3)).to.true;
    });
    
    it("Shouldn't accept integers", () => {
        expect(isFloat(2.0)).to.false;
        expect(isFloat(2)).to.false;
    });
    
    it("Shouldn't accept zero", () => {
        expect(isFloat(0)).to.false;
        expect(isFloat(0.0)).to.false;
    });
});

describe("isInteger(num)", () => {
    
    it("Shouldn't accept floats", () => {
        expect(isInteger(2.4)).to.false;
        expect(isInteger(1.3)).to.false;
    });
    
    it("Should accept integers", () => {
        expect(isInteger(2.0)).to.true;
        expect(isInteger(2)).to.true;
    });
    
    it("Should accept zero", () => {
        expect(isInteger(0)).to.true;
        expect(isInteger(0.0)).to.true;
    });
    
});

describe("stringIsInteger(num)", () => {
    
    it("Shouldn't accept floats", () => {
        expect(stringIsInteger("2.4")).to.false;
        expect(stringIsInteger("1.0")).to.false;
    });
    
    it("Should accept integers", () => {
        expect(stringIsInteger("7")).to.true;
        expect(stringIsInteger("2")).to.true;
    });
    
    it("Shouldn't accept zero", () => {
        expect(stringIsInteger("0")).to.false;
        expect(stringIsInteger("0.0")).to.false;
    });
    
});

describe("isNumber(num)", () => {
    
    it("Should accept floats", () => {
        expect(isNumber("2.4")).to.true;
        expect(isNumber(2.4)).to.true;
        expect(isNumber("1.0")).to.true;
        expect(isNumber(1.0)).to.true;
    });
    
    it("Should accept integers", () => {
        expect(isNumber("7")).to.true;
        expect(isNumber(7)).to.true;
        expect(isNumber("2")).to.true;
    });
    
    it("Should accept zero", () => {
        expect(isNumber("0")).to.true;
        expect(isNumber(0)).to.true;
        expect(isNumber("0.0")).to.true;
        expect(isNumber(0.0)).to.true;
    });
    
    it("Shouldn't accept boolean", () => {
        expect(isNumber(true)).to.false;
        expect(isNumber(false)).to.false;
    });
    
    it("Shouldn't accept strings", () => {
        expect(isNumber("test")).to.false;
        expect(isNumber("")).to.false;
        expect(isNumber("   ")).to.false;
    });
    
    it("Shouldn't accept objects", () => {
        expect(isNumber({})).to.false;
        expect(isNumber({test: "test"})).to.false;
        expect(isNumber([])).to.false;
        expect(isNumber([1, 2])).to.false;
    });
    
    it("Shouldn't accept functions", () => {
        expect(isNumber(() => 5)).to.false;
        expect(isNumber(() => {})).to.false;
    });
});
