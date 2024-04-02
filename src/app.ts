
import express from "express"
import config from "config"

const port = config.get<number>("port")


const app = express()

app.listen(1337, () => {
    console.log("app init")
})

