import { Router } from "express"
import { createUserHandler, getCurrentUserHandler } from "../controller/user.controller"
import { createUserSchema } from "../schema/user.schema"
import validate from "../middleware/validateResource"
import requiredUser from "../middleware/requiredUser"

const router = Router()
const BASE_ROUTE = "/api/users"

router.post(BASE_ROUTE, validate(createUserSchema), createUserHandler)

router.get("/api/me", requiredUser, getCurrentUserHandler)

export default router
