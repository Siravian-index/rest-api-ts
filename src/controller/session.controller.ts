import { Request, Response } from "express";

import config from "config"
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt";
import logger from "../utils/logger";


export async function createUserSessionHandler(req: Request, res: Response) {
    try {
        // validate password
        const user = await validatePassword(req.body)
        if (!user) {
            return res.status(401).send("Invalid email or password")
        }
        // create session
        const userAgent = req.get("user-agent") ?? ""
        debugger
        const session = await createSession(user.id, userAgent)
        // create access token
        const accessToken = signJwt(
            {
                ...user,
                session: session.id
            },
            {
                expiresIn: config.get<string>("accessTokenTtl")
            }
        )
        // create refresh token
        const refreshToken = signJwt(
            {
                ...user,
                session: session.id
            },
            {
                expiresIn: config.get<string>("refreshTokenTtl")
            }
        )
        // send access & refresh token
        return res.send({ accessToken, refreshToken })

    } catch (error) {
        logger.error(error)
        return res.status(500).send("Something went wrong")
    }
}