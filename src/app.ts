
import express from "express"
import config from "config"
import connect from "./utils/connect"
import logger from "./utils/logger"

const PORT = config.get<number>("port")


const app = express()

app.listen(PORT, async () => {
    logger.info(`App is running at ${PORT}`)
    await connect()
})

