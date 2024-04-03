import { Router } from "express"
import { createUserHandler } from "../controller/user.controller"
import { createUserSchema } from "../schema/user.schema"
import validate from "../middleware/validateResource"

const router = Router()

router.post("/users", validate(createUserSchema), createUserHandler)


export default router
