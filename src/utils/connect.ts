import mongoose from "mongoose"
import config from "config"
import logger from "./logger"

async function connect() {
    const uri = config.get<string>("dbUri")
    try {
        await mongoose.connect(uri)
        logger.info("Connected to db")
    } catch (error) {
        logger.error("Couldn't connect to db")
        process.exit(1)
    }
}

export default connect