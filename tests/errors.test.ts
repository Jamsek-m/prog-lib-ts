import { describe, it } from "mocha";
import { expect } from "chai";
import { BaseError, HttpError, UnknownError } from "../src";

describe("Create error", () => {
    it("Create http error", () => {
        const err = new HttpError(500, "server_error");
        
        expect(err.status).to.be.equals(500);
        expect(err instanceof BaseError).to.be.true;
        expect(err.message).to.be.equals("server_error");
        expect(err.type).to.be.equals(HttpError);
    });
    
    it("Create http error from cause", () => {
        const prevErr = new ReferenceError("Http return empty!");
        const err = new HttpError(500, "server_error", prevErr);
        expect(err.cause).to.be.equals(prevErr);
    });
    
    it("Create unknown error", () => {
        const errorMessage = "Unexpected error!";
        const prevErr = new TypeError(errorMessage);
        const fromCause = UnknownError.fromCause(prevErr);
        const withConstructor = new UnknownError(errorMessage, prevErr);
        
        expect(fromCause.cause).to.be.equals(prevErr);
        expect(withConstructor.cause).to.be.equals(prevErr);
    
        expect(fromCause.message).to.be.equals(errorMessage);
        expect(withConstructor.message).to.be.equals(errorMessage);
    });
    
    it("Extend Http error", () => {
        
        class TestError extends HttpError {
            constructor(message: string, cause?: Error) {
                super(500, message, cause);
            }
        }
        
        const errMessage = "Test error!";
        const testErr = new TestError(errMessage);
        expect(testErr.message).to.be.equals(errMessage);
        expect(testErr.status).to.be.equals(500);
        expect(testErr.cause).to.be.null;
        
        const prevErr = new Error(errMessage);
        const newTestErr = new TestError(errMessage, prevErr);
        expect(newTestErr.cause).to.be.equals(prevErr);
    });
});
