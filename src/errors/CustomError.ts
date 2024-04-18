
export interface Params {
    message: string
    code: string
    detail: string
    status: number
}

export abstract class CustomError extends Error {
    protected status: number
    protected code: string
    protected detail: string


    constructor() {
        super("CustomError")
        this.status = 500
        this.code = "CustomError"
        this.detail = "CustomError"
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    serialize(): Record<string, string | number> {
        return {
            message: this.message,
            code: this.code,
            detail: this.detail,
            status: this.status,
        }
    }
    
}