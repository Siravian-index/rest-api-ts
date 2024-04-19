
import express from "express"
import cors from "cors"
import config from "config"
import connect from "./utils/connect"
import logger from "./utils/logger"
import routes from "./routes/routes"
import deserializeUser from "./middleware/deserializeUser"

const PORT = config.get<number>("port")

async function main() {
    const app = express()
    app.use(express.json())
    app.use(cors({
        origin: config.get("origin"),
        credentials: true,
    }))
    app.use(deserializeUser)

    routes(app)

    await connect()
    
    app.listen(PORT, async () => {
        logger.info(`App is running at ${PORT}`)
    })
}

main()