

import { Router } from "express"
import validate from "../middleware/validateResource"
import { createUserSessionHandler, getUserSessionsHandler } from "../controller/session.controller"
import { createSessionSchema } from "../schema/session.schema"

const router = Router()

router.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler)

router.get("/api/sessions/", getUserSessionsHandler)


export default router
