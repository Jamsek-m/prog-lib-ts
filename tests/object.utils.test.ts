import { describe, it } from "mocha";
import { expect } from "chai";

import { isUUID } from "../src";

describe("isUUID(value)", () => {
    
    it("Should allow UUIDs", () => {
        expect(isUUID("5a8d963c-3a73-40de-9806-1400f905271b")).to.true;
    });
    
    it("Shouldn't allow UUID as part of string", () => {
        expect(isUUID("test value with uuid 5a8d963c-3a73-40de-9806-1400f905271b")).to.false;
    });
    
    it("Shouldn't allow non UUID strings", () => {
        expect(isUUID("7")).to.false;
        expect(isUUID("")).to.false;
        expect(isUUID("teststring")).to.false;
        expect(isUUID("  ")).to.false;
    });
    
});
