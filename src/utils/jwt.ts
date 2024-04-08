import config from 'config'
import jwt from "jsonwebtoken"

const publicKey = config.get<string>("publicKey")
const privateKey = config.get<string>("privateKey")

export function signJwt<T extends Object>(payload: T, options: jwt.SignOptions = {}) {
    const token = jwt.sign(payload, privateKey, {
        ...options,
        algorithm: "RS256",
    })
    return token
}


export async function verifyJwt(token: string) {
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

