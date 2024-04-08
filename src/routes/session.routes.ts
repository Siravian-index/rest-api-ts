

import { Router } from "express"
import validate from "../middleware/validateResource"
import { createUserSessionHandler } from "../controller/session.controller"
import { createSessionSchema } from "../schema/session.schema"

const router = Router()

router.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler)



export default router
