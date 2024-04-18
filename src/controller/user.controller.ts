import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { CustomError, InternalServerError } from "../errors";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body)
        return res.json({ data: user })
    } catch (error) {
        logger.error(error)
        if (error instanceof CustomError) {
          return res.status(error.getStatus()).send(error.serialize())
        }
        const e = new InternalServerError()
        return res.status(e.getStatus()).send(e.serialize())
    }
}