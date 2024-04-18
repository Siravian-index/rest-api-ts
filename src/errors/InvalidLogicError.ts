import { CustomError } from "./CustomError"


export class InvalidLogicError extends CustomError {
    constructor(message = "The supplied information does not pass the business logic checks") {
        super()
        this.status = 409
        this.code = "INVALID_BUSINESS_LOGIC"
        this.message = message
    }
}