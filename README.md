# Prog Utils
[![npm (scoped)](https://img.shields.io/npm/v/@mjamsek/prog-utils)](https://www.npmjs.com/package/@mjamsek/prog-utils)
[![GitHub license](https://img.shields.io/github/license/Jamsek-m/ts-prog-utils)](https://github.com/Jamsek-m/ts-prog-utils/blob/master/LICENSE)
> Utility library providing type definitions.

## Installation

Run command: `npm install --save @mjamsek/prog-utils`

## Documentation

### EntityList

`EntityList` is a wrapper object for lists. It is used to group list with its metadata (size, offset & limit).

Example:

```typescript
import { EntityList } from "@mjamsek/prog-utils";

const objectArray: MyObject[] = [/* ... */];

/*
* Provide list size separately.
* Useful to store information usually retrieved from
* X-Total-Count header, to represent size of larger collection.
*/
const list: EntityList<MyObject> = EntityList.of(objectList, 23);

/*
* If size is not provided, it defaults to size of given array.
*/
const list: EntityList<MyObject> = EntityList.of(objectList);

/*
* Additionally, you can also provide limit and offset values.
*/
const list: EntityList<MyObject> = EntityList.of(objectList, 23, /*limit: */ 10, /*offset: */ 0);

/*
* Creates empty list, with size 0
 */
const list: EntityList<MyObject> = EntityList.empty();
```

*When using Typescript, we can take advantage of generics, to specify type of entities contained in list.*

### Optional

This type is ported from Java SE platform and has the same behaviour. It is used to wrap values that can be null or undefined, to enable easier handling of such values.

Creating optional:
```typescript
import { Optional } from "@mjamsek/prog-utils";

const noValue = Optional.empty();
const stringValue: Optional<string> = Optional.of("value");
const unknownValue = Optional.ofNullable(nullableVariable);
```

Additionally, `Optional<T>` exposes following methods:

* `get(): T` Returns value if present, otherwise throws error.
* `isPresent(): boolean` Returns true if value is present, false otherwise.
* `ifPresent(func: Optional.ConsumerFunction<T>): void` Executes given function if value is present.
* `ifPresentOrElse(func: Optional.ConsumerFunction<T>, emptyFunc: Optional.EmptyFunction): void` Executes first function if value is present, otherwise executes second function.
* `filter(predicate: Optional.PredicateFunction<T>): Optional<T>` Executes filter function. If value matches result, it returns itself, otherwise returns empty Optional.
* `map<U>(func: Optional.MapFunction<T, U>): Optional<U>` Maps value to another type, using given function.
* `or(func: Optional.SupplierFunction<T>): Optional<T>` If value is present, returns itself, otherwise returns new Optional with different value of same type.
* `orElse(other: T): T` If value is present, returns value, otherwise returns specified value. 
* `orElseThrow<E extends Error>(supplier?: Optional.ExceptionSupplierFunction<E>): T` Throws error if value is not present.
* `flatMap(mapper: Optional.MapFunction<T, Optional<T>>): Optional<T>` If value is present, returns result of mapper function, otherwise it returns empty Optional.

### Opt

Sometimes using `Optional` would be impractical, therefore `Opt` is provided, to denote a variable may be of type `T` or `null`.

### Utils

Utility functions that are provided by library:
* `getDayOfWeek` Returns day of week with monday as 0 index
* `resetTime` Trims time from date (sets all parts to 0). **DEPRECATED**: use `truncateTime` instead.
* `truncateTime` Truncates time from date (sets all parts to 0).
* `getDateDaysAfter` Returns date x days after given date
* `getDateDaysBefore` Returns date x days before given date
* `daysDiffBetweenDates` Returns difference between two dates in days
* `stringIsInteger` Checks if string contains integer. **DEPRECATED**: use `isInteger` instead.
* `isNumber` Checks whether given value is a number type
* `isInteger` Checks if number is integer
* `isFloat` Checks if number is float
* `isUUID`: Validates whether given string is of UUID-like format.


### Typescript definitions

Additional definitions for Typescript types:

* `Without<T, U>` Resulting type can only contain properties of type `T`, but not of type `U`.
* `XOR<T, U>` Resulting type can only contain properties of one or the other type, but not both.

And for function types:

* `VoidFunc` Function that doesn't accept nor return any value. 
* `BasicConsumer<T>` Function that consumes value of type `T` and returns nothing.
* `BiConsumer<T1, T2>` Function that consumes two values of type `T1` and `T2` and returns nothing.
* `BasicSupplier<T>` Function that produces (returns) value of type `T`.
* `BasicMutator<T>` Function that maps value of type `T` to another value of type `T`.
* `BasicMapper<O, R>` Function that maps value of type `O` to value of type `R`.

### Errors

Library provides typed error definitions for easier dealing with multiple errors. You can define your own errors, by extending `BaseError` like this:

```typescript
import { BaseError } from "@mjamsek/prog-utils";

export class MyNewError extends BaseError {
    private readonly _myField: number;
    
    constructor(message: string, myField: number, cause?: Error) {
        super(message, MyNewError, cause);
        this._myField = myField;
    }
    
    public get myField(): number {
        return this._myField;
    }
}
```

Additionally, some typed errors are already provided by library:
* `HttpError` Error representing failure during HTTP call.
* `UnknownError` When error cannot be mapped to instance of `BaseError`, you can map to `UnknownError`.

### HTTP Helpers

#### HTTP Headers

Following header constants are provided:

* `X_SERVICE_NAME`: x-service-name
* `X_SERVICE_VERSION`: x-service-version
* `X_SERVICE_ENV`: x-service-env
* `X_REQUEST_ID`: x-request-id
* `X_TOTAL_COUNT`: x-total-count
* `X_LIMIT`: x-limit
* `X_OFFSET`: x-offset
* `CONTENT_DISPOSITION`: content-disposition
* `AUTHORIZATION`: authorization
* `X_POWERED_BY`: x-powered-by

#### HTTP Statuses

Following status constants are provided:

* `OK`: 200,
* `CREATED`: 201,
* `ACCEPTED`: 202,
* `NO_CONTENT`: 204,
* `BAD_REQUEST`: 400,
* `UNAUTHORIZED`: 401,
* `FORBIDDEN`: 403,
* `NOT_FOUND`: 404,
* `METHOD_NOT_ALLOWED`: 405,
* `CONFLICT`: 409,
* `GONE`: 410,
* `UNSUPPORTED_MEDIA_TYPE`: 415,
* `UNPROCESSABLE_ENTITY`: 422,
* `VALIDATION_FAILED`: 422,
* `INTERNAL_SERVER_ERROR`: 500,
* `SERVICE_UNAVAILABLE`: 503,

## Bugs & Features

Any issues, requests for a new feature, etc. can be filled using [GitHub Issues](https://github.com/Jamsek-m/ts-prog-utils/issues).

## License

MIT
