import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod"

function validate(schema: AnyZodObject) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send(error.errors)
            }
            return res.status(500).send("Internal server error")
        }
    }
}

export default validate