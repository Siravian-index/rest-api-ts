import { CustomError, Params } from "./CustomError"


// default values
// status
// code
export class ResourceNotFound extends CustomError {
    constructor(message = "", detail = "") {
        super()
        this.status = 404
        this.code = "RESOURCE_NOT_FOUND"
        this.message = message
        this.detail = detail
    }

    serialize() {
        return {
            message: this.message,
            code: this.code,
            detail: this.detail,
            status: this.status,
        }
    }

}