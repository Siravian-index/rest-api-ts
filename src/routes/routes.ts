
import { Express } from "express"

import userRouter from "./user.routes"
import sessionRouter from "./session.routes"

function routes(app: Express) {
    app.get("/healthcheck", (_, res) => {
        res.sendStatus(200)
    })

    app.use(userRouter)
    app.use(sessionRouter)

}


export default routes