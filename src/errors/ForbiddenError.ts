import { CustomError } from "./CustomError"


export class ForbiddenError extends CustomError {
    constructor(message = "The request is missing rights") {
        super()
        this.status = 403
        this.code = "FORBIDDEN_REQUEST"
        this.message = message
    }
}