import { describe, it } from "mocha";
import { expect } from "chai";
import { EntityList } from "../src";

const collection = [1, 2, 3, 4, 5, 6];
const totalCount = 23;

describe("Create object", () => {
    
    it("With all arguments", () => {
        const list = EntityList.of(collection, totalCount);
        expect(list.entities).to.be.eql(collection);
        expect(list.count).to.be.equals(totalCount);
    });
    
    it("Should throw error on null collection", () => {
        expect(() => EntityList.of(null as unknown as any[])).to.throw(ReferenceError);
    });
    
    it("With partial arguments", () => {
        const list = EntityList.of(collection);
        expect(list.entities).to.be.eql(collection);
        expect(list.count).to.be.equals(collection.length);
        expect(list.limit).to.be.undefined;
        expect(list.offset).to.be.undefined;
    });
    
    it("With partial arguments and pagination", () => {
        const list = EntityList.of(collection, 25, 10, 5);
        expect(list.entities).to.be.eql(collection);
        expect(list.count).to.be.equals(25);
        expect(list.limit).to.be.equals(10);
        expect(list.offset).to.be.equals(5);
    });
    
    it("Empty", () => {
        const list = EntityList.empty();
        expect(list.entities).to.be.eql([]);
        expect(list.count).to.be.equals(0);
    });
    
});
