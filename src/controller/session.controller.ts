import { Request, Response } from "express";

import config from "config"
import { getGoogleOAuthTokens, getGoogleUser, upsertUser, validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { signJwt } from "../utils/jwt";
import logger from "../utils/logger";
import { CustomError, GenericError, InternalServerError, InvalidSchemaError } from "../errors";
import { JwtPayload } from "../schema/jwt.schema";
import { GoogleOAuth } from "../schema/googleToken.schema";
import { ZodError } from "zod";
import { AxiosError } from "axios";


export async function createUserSessionHandler(req: Request, res: Response) {
    try {
        // validate password
        const user = await validatePassword(req.body)
        // create session
        const userAgent = req.get("user-agent") ?? ""
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
        // const data = { accessToken, refreshToken, user }
        return res.send({ accessToken, refreshToken, user })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.getStatus()).send(error.serialize())
        }
        logger.error(error)
        const e = new InternalServerError()
        return res.status(e.getStatus()).send(e.serialize())
    }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id
        const sessions = await findSessions({ user: userId, valid: true })

        return res.send({ data: sessions })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.getStatus()).send(error.serialize())
        }
        logger.error(error)
        const e = new InternalServerError()
        return res.status(e.getStatus()).send(e.serialize())
    }

}


export async function deleteUserSessionHandler(req: Request, res: Response<{}, JwtPayload>) {
    const sessionId = res.locals.user.session
    try {
        // TODO: improve this logic
        // make it so it cannot repeat the same session
        // return something else
        await updateSession({ _id: sessionId }, { valid: false })
        return res.send({
            accessToken: null,
            refreshToken: null,
        })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.getStatus()).send(error.serialize())
        }
        logger.error(error)
        const e = new InternalServerError()
        return res.status(e.getStatus()).send(e.serialize())
    }
}


export async function googleOauthHandler(req: Request<{}, {}, {}, GoogleOAuth["query"]>, res: Response) {
    try {
        // get code from query string
        const code = req.query.code
        // get id and access token with the code
        const values = await getGoogleOAuthTokens(code)
        // get user with tokens
        const googleUser = await getGoogleUser(values.id_token, values.access_token)
        // upsert user
        const userDoc = await upsertUser({
            email: googleUser.email
        },
            {
                email: googleUser.email,
                name: googleUser.name,
            },
            { upsert: true, new: true }
        )
        const user = userDoc.toJSON()
        // create session
        const userAgent = req.get("user-agent") ?? ""
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

        // back to client
        return res.send({ accessToken, refreshToken, user })
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.getStatus()).send(error.serialize())
        }
        if (error instanceof ZodError) {
            throw new InvalidSchemaError()
        }
        if (error instanceof AxiosError) {
            const err = error.response?.data.error
            console.log(err)
            throw new GenericError({ code: err.status, message: err.message, status: err.code })
        }
        logger.error(error)
        const e = new InternalServerError()
        return res.status(e.getStatus()).send(e.serialize())
    }
}