import config from 'config'
import jwt from "jsonwebtoken"
import { findOneBy } from '../service/session.service'
import { findUser } from '../service/user.service'

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
        return {
            decoded,
            valid: true,
            expired: false,
        }
    } catch (e: any) {
        return {
            decoded: null,
            valid: false,
            expired: e.message === "jwt expired",
        }
    }
}

export async function reIssueAccessToken(refreshToken: string) {
    const { decoded, valid, expired } = verifyJwt(refreshToken)

    if (!decoded || !valid) {
        return false
    }

    //@ts-ignore
    const sessionId = decoded.session

    const session = await findOneBy({ id: sessionId })
    if (!session || !session.valid) {
        return false
    }

    const user = await findUser({ id: session.user })

    if (!user) {
        return false
    }

    const accessToken = signJwt(
        {
            ...user,
            session: session.id
        },
        {
            expiresIn: config.get<string>("accessTokenTtl")
        }
    )

    return accessToken
}