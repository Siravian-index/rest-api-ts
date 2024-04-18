import config from 'config'
import jwt, { JwtPayload } from "jsonwebtoken"
import { findOneSessionBy } from '../service/session.service'
import { findUser } from '../service/user.service'
import logger from './logger'
import { jwtSchema } from '../schema/jwt.schema'

const publicKey = config.get<string>("publicKey")
const privateKey = config.get<string>("privateKey")

export function signJwt<T extends Object>(payload: T, options: jwt.SignOptions = {}) {
    const token = jwt.sign(payload, privateKey, {
        ...options,
        algorithm: "RS256",
    })
    return token
}


export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)
        debugger
        console.log({decoded})
        const parsed = jwtSchema.parse(decoded)
        return {
            decoded: parsed,
            valid: true,
            expired: false,
        }
    } catch (e: any) {
        logger.error(e.message)
        return {
            decoded: null,
            valid: false,
            expired: e.message === "jwt expired",
        }
    }
}

// TODO: Make func throw instead of returning false
export async function reIssueAccessToken(refreshToken: string) {
    const { decoded, valid, expired } = verifyJwt(refreshToken)

    if (!decoded || !valid) {
        return false
    }

    const sessionId = decoded.session
    const session = await findOneSessionBy({ _id: sessionId })
    if (!session || !session.valid) {
        return false
    }

    const user = await findUser({ _id: session.user })

    if (!user) {
        return false
    }

    const userJSON = user.toJSON()
    const sessionJSON = session.toJSON()



    const accessToken = signJwt(
        {
            ...userJSON,
            session: sessionJSON.id
        },
        {
            expiresIn: config.get<string>("accessTokenTtl")
        }
    )

    return accessToken
}