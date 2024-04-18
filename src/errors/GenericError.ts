import { CustomError, Params } from "./CustomError"



export class GenericError extends CustomError {
    constructor(params: Params) {
        super()
        this.code = ""
        this.detail = ""
        this.message = ""
        this.status = 500
    }

}