import { Router } from "express"
import { createUserHandler } from "../controller/user.controller"
import { createUserSchema } from "../schema/user.schema"
import validate from "../middleware/validateResource"

const router = Router()
const BASE_ROUTE = "/api/users"

router.post(BASE_ROUTE, validate(createUserSchema), createUserHandler)


export default router
