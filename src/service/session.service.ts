import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { verifyJwt } from "../utils/jwt";


export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent })
    return session.toJSON()
}


export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean()
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return Session.updateOne(query, update)
}

export async function findOneBy(query: FilterQuery<SessionDocument>) {
    return await Session.findOne(query)
}

// TODO: Ask how to organize this situation i.e. service calling serve or utility calling services
// export async function reIssueAccessToken(refreshToken: string) {
//     const { decoded, valid, expired } = verifyJwt(refreshToken)

//     if (!decoded || !valid) {
//         return false
//     }

//     //@ts-ignore
//     const sessionId = decoded.session

//     const session = await findOneBy({ id: sessionId })
//     if (!session || !session.valid) {
//         return false
//     }

//     const user = await findUser({ id: session.user })

//     if (!user) {
//         return false
//     }

//     const accessToken = signJwt(
//         {
//             ...user,
//             session: session.id
//         },
//         {
//             expiresIn: config.get<string>("accessTokenTtl")
//         }
//     )

//     return accessToken
// }