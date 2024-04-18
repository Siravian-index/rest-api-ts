import { NextFunction, Request, Response } from "express";
import { jwtSchema } from "../schema/jwt.schema";


export default function requiredUser(req: Request, res: Response, next: NextFunction) {

    const user = res.locals.user
    const parsed = jwtSchema.safeParse({ user })
    if (!parsed.success) {
        return res.sendStatus(403)
    }

    return next()
}