import mongoose from "mongoose"
import config from "config"

async function connect() {
    const uri = config.get<string>("dbUri")
    try {
        await mongoose.connect(uri)
        console.log("connected to db")
    } catch (error) {
        console.error("Couldn't connect to db")
        process.exit(1)
    }
}

export {
    connect
}