import { BaseError } from "./base.error";

export class UnknownError extends BaseError {
    
    public constructor(message: string, cause?: Error) {
        super(message, UnknownError, cause);
    }
    
    public static fromCause(cause: Error): UnknownError {
        return new UnknownError(cause.message, cause);
    }
}
