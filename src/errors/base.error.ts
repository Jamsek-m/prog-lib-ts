interface Type {
    prototype: BaseError;
}

export abstract class BaseError extends Error {
    protected _type: Type;
    
    protected _cause: Error | null;
    
    protected constructor(message: string, type: Type, cause?: Error) {
        super(message);
        this._type = type;
        this._cause = null;
        if (cause) {
            this._cause = cause;
        }
        Object.setPrototypeOf(this, type.prototype);
        
    }
    
    public get type(): Type {
        return this._type;
    }
    
    public get cause(): Error | null {
        return this._cause;
    }
}
