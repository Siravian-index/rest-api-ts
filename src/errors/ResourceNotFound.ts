import { CustomError } from "./CustomError"


export class ResourceNotFound extends CustomError {
    constructor(message = "The resource was not found, check search param") {
        super()
        this.status = 404
        this.code = "RESOURCE_NOT_FOUND"
        this.message = message
    }
}