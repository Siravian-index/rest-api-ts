import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { createUserInput } from "../schema/user.schema";

export async function createUserHandler(req: Request<{}, {}, createUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body)
        return user
    } catch (error) {
        logger.error(error)
        if (error instanceof Error) {
            return res.status(409).send(error.message)
        }
        return res.status(500).send("Internal server error")
    }
}