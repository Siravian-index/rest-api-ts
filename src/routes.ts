
import { Express } from "express"

function routes(app: Express) {
    app.get("/healthcheck", (_, res) => {
        res.sendStatus(200)
    })
}


export default routes