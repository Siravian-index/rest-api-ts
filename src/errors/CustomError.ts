
export interface Params {
    message: string
    code: string
    status: number
}

export abstract class CustomError extends Error {
    protected status: number
    protected code: string


    constructor() {
        super("CustomError message")
        this.status = 500
        this.code = "CustomError's code"
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    serialize(): Record<string, string | number> {
        return {
            message: this.message,
            code: this.code,
            status: this.status,
        }
    }

    getStatus() {
        return this.status
    }
    
}