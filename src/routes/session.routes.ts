

import { Router } from "express"
import validate from "../middleware/validateResource"
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from "../controller/session.controller"
import { createSessionSchema } from "../schema/session.schema"
import requiredUser from "../middleware/requiredUser"

const BASE_ROUTE = "/api/sessions"
const router = Router()

router.post(BASE_ROUTE, validate(createSessionSchema), createUserSessionHandler)

router.get(BASE_ROUTE, requiredUser, getUserSessionsHandler)

router.delete(BASE_ROUTE, requiredUser, deleteUserSessionHandler)


export default router
