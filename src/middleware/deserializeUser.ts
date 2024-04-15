import { NextFunction, Request, Response } from "express";
import { reIssueAccessToken, verifyJwt } from "../utils/jwt";


export default async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization ?? ""
    const jwtToken = accessToken.replace(/^Bearer\s/, "")

    const refreshToken = req.headers["x-refresh"] ?? ""

    if (!jwtToken) {
        return next()
    }

    const { decoded, expired, valid } = verifyJwt(jwtToken)
    if (decoded) {
        res.locals.user = decoded
        return next()
    }


    if (expired && refreshToken) {
        // reissue accessToken
        const accessToken = await reIssueAccessToken(refreshToken.toString())
        if (accessToken) {
            res.setHeader("x-access-token", accessToken)
        }
        const result = verifyJwt(accessToken.toString())
        if (result.decoded) {
            res.locals.user = decoded
            return next()
        }
    }

    return next()
}

