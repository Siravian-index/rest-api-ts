import { Router } from "express"
import { createUserHandler } from "../controller/user.controller"

const router = Router()

router.post("/users", createUserHandler)


export default router
