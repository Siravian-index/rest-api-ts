
import { Express } from "express"

import userRouter from "./user.routes"


function routes(app: Express) {
    app.get("/healthcheck", (_, res) => {
        res.sendStatus(200)
    })

    app.use(userRouter)

}


export default routes