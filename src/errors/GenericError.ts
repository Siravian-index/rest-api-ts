import { CustomError, Params } from "./CustomError"



export class GenericError extends CustomError {
    constructor(params: Params) {
        super()
        this.code = params.code
        this.message = params.message
        this.status = params.status
    }

}