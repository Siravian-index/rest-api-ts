
interface Params {
    message: string
    code: string
    detail: string
    status: number
}

abstract class CustomError extends Error {
    protected status: number
    protected code: string
    protected detail: string

    constructor({ message, code, detail, status }: Params) {
        super(message)
        this.code = code
        this.detail = detail
        this.status = status
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    abstract serialize(): string
    abstract stringify(): string
}