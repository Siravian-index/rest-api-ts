
import { Express } from "express"

import userRouter from "./user.routes"
import sessionRouter from "./session.routes"
import productRouter from "./product.routes"

function routes(app: Express) {
    app.get("/healthcheck", (_, res) => {
        res.sendStatus(200)
    })

    app.use(userRouter)
    app.use(sessionRouter)
    app.use(productRouter)

}


export default routes