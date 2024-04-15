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
        console.log("On reIssueAccessToken")
        // reissue accessToken
        const newAccessToken = await reIssueAccessToken(refreshToken.toString())
        console.log({newAccessToken})
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken)
        }

        const result = verifyJwt(newAccessToken.toString())
        console.log({result})
        if (result.decoded) {
            res.locals.user = decoded
            return next()
        }
    }

    return next()
}

