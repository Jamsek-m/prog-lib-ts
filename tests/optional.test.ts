import { describe, it } from "mocha";
import { expect } from "chai";

import { Optional } from "../src";
import PredicateFunction = Optional.PredicateFunction;
import ConsumerFunction = Optional.ConsumerFunction;
import EmptyFunction = Optional.EmptyFunction;
import MapFunction = Optional.MapFunction;
import SupplierFunction = Optional.SupplierFunction;
import ExceptionSupplierFunction = Optional.ExceptionSupplierFunction;


describe("Create object", () => {
    
    it("Construct empty optional", () => {
        const empty = Optional.empty();
        expect(empty.isEmpty()).to.be.true;
    });
    
    it("Construct optional from non-null value", () => {
        const opt = Optional.of(123);
        expect(opt.isPresent()).to.be.true;
        expect(() => Optional.of(null as unknown)).to.throw(ReferenceError);
    });
    
    it("Construct optional from nullable value", () => {
        const opt = Optional.ofNullable(123);
        const emptyOpt = Optional.ofNullable(undefined);
        
        expect(opt.isPresent()).to.be.true;
        expect(emptyOpt.isPresent()).to.be.false;
    });
    
    it("Get value", () => {
        const opt = Optional.ofNullable(123);
        const emptyOpt = Optional.ofNullable(undefined);
        
        expect(opt.get()).to.be.equals(123);
        expect(() => emptyOpt.get()).to.throw(ReferenceError);
    });
    
    it("Check if present", done => {
        const opt = Optional.ofNullable(123);
        const emptyOpt = Optional.empty<number>();
        
        expect(opt.isPresent()).to.be.true;
        expect(opt.isEmpty()).to.be.false;
        expect(emptyOpt.isPresent()).to.be.false;
        expect(emptyOpt.isEmpty()).to.be.true;
    
        const onPresent = () => {
            done();
        };
        const neverInvoked = () => {
            done(new Error("Should not be invoked!"));
        };
        
        expect(() => opt.ifPresent(null as unknown as ConsumerFunction<number>)).to.throw(ReferenceError);
        expect(() => opt.ifPresentOrElse(null as unknown as ConsumerFunction<number>, neverInvoked)).to.throw(ReferenceError);
        expect(() => opt.ifPresentOrElse(onPresent, null as unknown as EmptyFunction)).to.throw(ReferenceError);
        expect(() => opt.ifPresentOrElse(null as unknown as ConsumerFunction<number>, null as unknown as EmptyFunction)).to.throw(ReferenceError);
        
        expect(() => emptyOpt.ifPresent(null as unknown as ConsumerFunction<number>)).to.throw(ReferenceError);
        expect(() => emptyOpt.ifPresentOrElse(null as unknown as ConsumerFunction<number>, neverInvoked)).to.throw(ReferenceError);
        expect(() => emptyOpt.ifPresentOrElse(onPresent, null as unknown as EmptyFunction)).to.throw(ReferenceError);
        expect(() => emptyOpt.ifPresentOrElse(null as unknown as ConsumerFunction<number>, null as unknown as EmptyFunction)).to.throw(ReferenceError);
    });
    
    it("Check if successful callback", done => {
        const onPresent = () => {
            done();
        };
        Optional.of(123).ifPresent(onPresent);
    });
    
    it("Check if successful callback", done => {
        const onPresent = () => {
            done();
        };
        const neverInvoked = () => {
            done(new Error("Should not be invoked!"));
        };
        Optional.of(123).ifPresentOrElse(onPresent, neverInvoked)
    });
    
    it("Check if errored callback", done => {
        const onPresent = () => {
            done();
        };
        const neverInvoked = () => {
            done(new Error("Should not be invoked!"));
        };
        Optional.empty<number>().ifPresentOrElse(neverInvoked, onPresent);
    });
    
    it("Check if errored callback", done => {
        const neverInvoked = () => {
            done(new Error("Should not be invoked!"));
        };
        Optional.empty<number>().ifPresent(neverInvoked);
        done();
    });
    
    it("Filter by value", () => {
        const opt = Optional.of(123).filter(val => {
            return val > 100;
        });
        const emptyOpt = Optional.of(123).filter(val => {
            return val <= 100;
        });
        
        expect(opt.isPresent()).to.be.true;
        expect(emptyOpt.isPresent()).to.be.false;
        expect(() => Optional.of(123).filter(null as unknown as PredicateFunction<number>)).to.throw(ReferenceError);
        
        const immutableOpt = Optional.empty();
        expect(immutableOpt.filter(() => true)).to.be.equals(immutableOpt);
    });
    
    it("Map value", () => {
        const opt1 = Optional.of(123).map(val => {
            return val + 100;
        });
        expect(opt1.get()).to.be.equals(223);
        
        const opt2 = Optional.of(123).map(val => {
            return val.toString(10);
        });
        expect(opt2.get()).to.be.equals("123");
        
        const opt3 = Optional.empty<number>().map(val => {
            return val + 100;
        });
        expect(opt3.isEmpty()).to.be.true;
        
        expect(() => Optional.of(123).map(null as unknown as MapFunction<number, number>)).to.throw(ReferenceError);
    });
    
    it("Alternative supplier", () => {
        const opt1 = Optional.empty().or(() => {
            return Optional.of(444);
        });
        expect(opt1.get()).to.be.equals(444);
        
        const opt2 = Optional.of(123).or(() => {
            return Optional.of(444);
        });
        expect(opt2.get()).to.be.equals(123);
        
        expect(() => Optional.empty().or(null as unknown as SupplierFunction<number>)).to.throw(ReferenceError);
        
        const emptySupplier = () => {
            return undefined;
        };
        expect(() => {
            Optional.empty().or(emptySupplier as unknown as SupplierFunction<number>).get();
        }).to.throw(ReferenceError);
    });
    
    it("Alternative value", () => {
        const opt1 = Optional.empty<number>().orElse(444);
        expect(opt1).to.be.equals(444);
        
        const opt2 = Optional.of(123).orElse(444);
        expect(opt2).to.be.equals(123);
    });
    
    it("Fail on missing value", () => {
        const errorSupplier = () => {
            return new RangeError("Error!");
        };
        const nullErrorSupplier = () => {
            return undefined;
        };
        
        const okOpt = Optional.of(123);
        expect(() => okOpt.orElseThrow(errorSupplier)).to.not.throw(ReferenceError);
        
        const errOpt = Optional.empty<number>();
        expect(() => errOpt.orElseThrow(errorSupplier)).to.throw(RangeError);
        
        expect(() => errOpt.orElseThrow(nullErrorSupplier as unknown as ExceptionSupplierFunction<RangeError>)).to.throw(ReferenceError);
        expect(() => errOpt.orElseThrow(undefined as unknown as ExceptionSupplierFunction<RangeError>)).to.throw(ReferenceError);
    });
    
    it("Map to new Optional", () => {
        const okOpt = Optional.of(123).flatMap(val => {
            return Optional.of(val + 100);
        });
        expect(okOpt.get()).to.equals(223);
        
        const errOpt = Optional.empty<number>().flatMap(val => {
            return Optional.of(val + 100);
        });
        expect(errOpt.isEmpty()).to.be.true;
        
        expect(() => Optional.of(123).flatMap(null as unknown as MapFunction<number, Optional<number>>)).to.throw(ReferenceError);
        
        const nullSupplier = () => {
            return undefined;
        };
        expect(() => Optional.of(123).flatMap(nullSupplier as unknown as MapFunction<number, Optional<number>>)).to.throw(ReferenceError);
    });
});
