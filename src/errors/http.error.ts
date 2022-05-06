import { BaseError } from "./base.error";

export class HttpError extends BaseError {
    
    protected _status: number;
    
    public constructor(status: number, message: string, cause?: Error) {
        super(message, HttpError, cause);
        this._status = status;
    }
    
    public get status(): number {
        return this._status;
    }
}
