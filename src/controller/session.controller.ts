import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";


export async function createUserSessionHandler(req: Request, res: Response) {
    try {
        // validate password
        const user = await validatePassword(req.body)
        if (!user) {
            return res.status(401).send("Invalid email or password")
        }
        // create session
        const userAgent = req.get("user-agent") ?? ""
        const session = createSession(user.id, userAgent)
        // create access token

        // create refresh token

        // send access & refresh token

    } catch (error) {

    }
}