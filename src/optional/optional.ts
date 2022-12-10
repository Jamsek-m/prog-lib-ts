/*
 *  Licensed under the MIT License (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  https://opensource.org/licenses/MIT
 *
 *  The software is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, express or
 *  implied, including but not limited to the warranties of merchantability,
 *  fitness for a particular purpose and noninfringement. in no event shall the
 *  authors or copyright holders be liable for any claim, damages or other
 *  liability, whether in an action of contract, tort or otherwise, arising from,
 *  out of or in connection with the software or the use or other dealings in the
 *  software. See the License for the specific language governing permissions and
 *  limitations under the License.
 */


/**
 * Java SE 11 Optional implementation in Typescript.
 * @since 0.0.1
 */
export class Optional<T> {
    
    private static readonly EMPTY: Optional<void> = new Optional();
    
    private readonly value: T | null;
    
    private constructor(value?: T) {
        this.value = value ?? null;
    }
    
    /**
     * Returns an empty {@link Optional} instance. No value is present for this Optional.
     * @returns an empty {@link Optional}
     */
    public static empty<T>(): Optional<T> {
        return Optional.EMPTY as unknown as Optional<T>;
    }
    
    /**
     * Returns an {@link Optional} describing the given non-null value.
     * @param value the value to describe, which must be non-null
     * @throws {ReferenceError} if value is null
     * @returns an {@link Optional} with the value present
     */
    public static of<T>(value: T): Optional<T> {
        if (value !== undefined && value !== null) {
            return new Optional<T>(value);
        }
        throw new ReferenceError("Value must not be null!");
    }
    
    /**
     * Returns an {@link Optional} describing the given value, if non-null, otherwise returns an empty {@link Optional}.
     * @param value the possibly-null value to describe
     * @returns an {@link Optional} with a present value if the specified value is non-null, otherwise an empty {@link Optional}
     */
    public static ofNullable<T>(value: T | undefined | null): Optional<T> {
        if (value !== undefined && value !== null) {
            return Optional.of(value);
        }
        return Optional.empty();
    }
    
    /**
     * If a value is present, returns the value, otherwise throws {@link ReferenceError}.
     * @returns the non-null value described by this {@link Optional}
     * @throws {ReferenceError} if no value is present
     */
    public get(): T {
        if (this.value !== undefined && this.value !== null) {
            return this.value;
        }
        throw new ReferenceError("No value present!");
    }
    
    /**
     * If a value is present, returns <code>true</code>, otherwise <code>false</code>.
     * @returns <code>true</code> if a value is present, otherwise <code>false</code>
     */
    public isPresent(): boolean {
        return this.value !== undefined && this.value !== null;
    }
    
    /**
     * If a value is not present, returns <code>true</code>, otherwise <code>false</code>.
     * @returns <code>true</code> if a value is not present, otherwise <code>false</code>
     */
    public isEmpty(): boolean {
        return this.value === undefined || this.value === null;
    }
    
    /**
     * If a value is present, performs the given action with the value, otherwise does nothing.
     * @param action the action to be performed, if a value is present
     * @throws {ReferenceError} if value is present and the given action is null
     */
    public ifPresent(action: Optional.ConsumerFunction<T>): void {
        if (this.value !== undefined && this.value !== null) {
            if (action) {
                action(this.value);
            } else {
                throw new ReferenceError("action must not be null!");
            }
        }
    }
    
    /**
     * If a value is present, performs the given action with the value, otherwise performs the given empty-based action.
     * @param action the action to be performed, if a value is present
     * @param emptyAction the empty-based action to be performed, if no value is present
     * @throws {ReferenceError} if a value is present and the given action is null, or no value is present and the given empty-based action is null.
     */
    public ifPresentOrElse(action: Optional.ConsumerFunction<T>, emptyAction: Optional.EmptyFunction): void {
        if (this.value !== undefined && this.value !== null) {
            if (action) {
                action(this.value);
            } else {
                throw new ReferenceError("action must not be null!");
            }
        } else {
            if (emptyAction) {
                emptyAction();
            } else {
                throw new ReferenceError("emptyAction must not be null!");
            }
        }
    }
    
    /**
     * If a value is present, and the value matches the given predicate,
     * returns an {@link Optional} describing the value, otherwise returns an empty {@link Optional}.
     * @param predicate the predicate to apply to a value, if present
     * @returns an {@link Optional} describing the value of this {@link Optional},
     * if a value is present and the value matches the given predicate, otherwise an empty {@link Optional}
     * @throws {ReferenceError} if the predicate is null
     */
    public filter(predicate: Optional.PredicateFunction<T>): Optional<T> {
        if (this.value === undefined || this.value === null) {
            return this;
        }
        if (!predicate) {
            throw new ReferenceError("predicate must not be null!");
        }
        const result = predicate(this.value);
        if (result) {
            return this;
        }
        return Optional.empty();
    }
    
    /**
     * If a value is present, returns an {@link Optional} describing (as if by ofNullable) the result of
     * applying the given mapping function to the value, otherwise returns an empty {@link Optional}.
     * If the mapping function returns a null result then this method returns an empty {@link Optional}.
     * @param mapper the mapping function to apply to a value, if present
     * @returns an {@link Optional} describing the result of applying a mapping function to the value of this {@link Optional}, if a value is present, otherwise an empty {@link Optional}
     * @throws {ReferenceError} if the mapping function is null
     */
    public map<U>(mapper: Optional.MapFunction<T, U>): Optional<U> {
        if (this.value === undefined || this.value === null) {
            return Optional.empty();
        }
        if (!mapper) {
            throw new ReferenceError("mapper must not be null!");
        }
        return Optional.ofNullable(mapper(this.value));
    }
    
    /**
     * If a value is present, returns an {@link Optional} describing the value, otherwise returns an {@link Optional} produced by the supplying function.
     * @param supplier the supplying function that produces an {@link Optional}  to be returned
     * @returns returns an {@link Optional} describing the value of this {@link Optional}, if a value is present, otherwise an {@link Optional} produced by the supplying function.
     * @throws {ReferenceError} if the supplying function is null or produces a null result
     */
    public or(supplier: Optional.SupplierFunction<T>): Optional<T> {
        if (this.value !== undefined && this.value !== null) {
            return this;
        }
        if (!supplier) {
            throw new ReferenceError("supplier must not be null!");
        }
        const result: Optional<T> | null | undefined = supplier();
        if (result) {
            return result;
        } else {
            throw new ReferenceError("supplier must not produce null result!");
        }
    }
    
    /**
     * If a value is present, returns the value, otherwise returns <code>other</code>.
     * @param other the value to be returned, if no value is present. May be <code>null</code>.
     * @returns the value, if present, otherwise <code>other</code>
     */
    public orElse(other: T): T {
        return (this.value !== undefined && this.value !== null) ? this.value : other;
    }
    
    /**
     * If a value is present, returns the value, otherwise throws an exception produced by the exception supplying function.
     * If no supplying function is provided, {@link ReferenceError} is thrown.
     * @param exceptionSupplier the supplying function that produces an exception to be thrown
     * @returns the value, if present
     * @throws {E} if no value is present and supplier produced exception
     * @throws {ReferenceError} if no value is present and the exception supplying function is null
     * @throws {ReferenceError} if no value is present and the exception supplying function returned null exception
     */
    public orElseThrow<E extends Error>(exceptionSupplier?: Optional.ExceptionSupplierFunction<E>): T {
        if (this.value !== undefined && this.value !== null) {
            return this.value;
        }
        if (exceptionSupplier) {
            const exc = exceptionSupplier();
            if (exc) {
                throw exc;
            }
            throw new ReferenceError("exceptionSupplier must return an exception! It returned null instead.");
        } else {
            throw new ReferenceError("value is not present!");
        }
    }
    
    /**
     * If a value is present, returns the result of applying the given
     * {@link Optional}-bearing mapping function to the value, otherwise returns
     * an empty {@link Optional}. This method is similar to {@link map}, but the mapping
     * function is one whose result is already an {@link Optional}, and if
     * invoked, {@link flatMap} does not wrap it within an additional {@link Optional}.
     * @param mapper the mapping function to apply to a value, if present
     * @returns the result of applying an {@link Optional}-bearing mapping function to the value of
     * this {@link Optional}, if a value is present, otherwise an empty {@link Optional}
     * @throws {ReferenceError} if the mapping function is <code>null</code> or returns a <code>null</code> result
     */
    public flatMap(mapper: Optional.MapFunction<T, Optional<T>>): Optional<T> {
        if (this.value === undefined || this.value === null) {
            return Optional.EMPTY as unknown as Optional<T>;
        }
        if (!mapper) {
            throw new ReferenceError("mapper must not be null!");
        }
        const result: Optional<T> = mapper(this.value);
        if (result) {
            return result;
        } else {
            throw new ReferenceError("mapper must not produce null result!");
        }
    }
}

export namespace Optional {
    export type ConsumerFunction<T> = (value: T) => void;
    export type EmptyFunction = () => void;
    export type PredicateFunction<T> = (value: T) => boolean;
    export type MapFunction<T, U> = (value: T) => U;
    export type SupplierFunction<T> = () => Optional<T>;
    export type ExceptionSupplierFunction<E extends Error> = () => E;
}
