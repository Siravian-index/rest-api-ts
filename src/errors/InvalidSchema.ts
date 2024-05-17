import { CustomError } from "./CustomError"


export class InvalidSchemaError extends CustomError {
    constructor(message = "The supplied data does not comply with the required data schema") {
        super()
        this.status = 400
        this.code = "INVALID_DATA_FORMAT"
        this.message = message
    }
}