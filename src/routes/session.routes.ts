import { googleOAuthSchema } from './../schema/googleToken.schema';


import { Router } from "express"
import validate from "../middleware/validateResource"
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler, googleOauthHandler } from "../controller/session.controller"
import { createSessionSchema } from "../schema/session.schema"
import requiredUser from "../middleware/requiredUser"

const BASE_ROUTE = "/api/sessions"
const OAUTH_GOOGLE = "/oauth/google"

const router = Router()

router.post(BASE_ROUTE, validate(createSessionSchema), createUserSessionHandler)

router.get(BASE_ROUTE, requiredUser, getUserSessionsHandler)

router.delete(BASE_ROUTE, requiredUser, deleteUserSessionHandler)

// google oauth handler
router.get(`${BASE_ROUTE}${OAUTH_GOOGLE}`, validate(googleOAuthSchema), googleOauthHandler)

export default router
