import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";


export default function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization ?? ""
    const jwtToken = accessToken.replace(/^Bearer\s/, "")

    const refreshToken = req.headers["x-refresh"] ?? ""
    console.log(refreshToken)
    
    if (!jwtToken) {
        return next()
    }

    const { decoded, expired, valid } = verifyJwt(jwtToken)
    if (decoded) {
        res.locals.user = decoded
        return next()
    }


    if (expired && refreshToken) {

    }

    return next()
}

