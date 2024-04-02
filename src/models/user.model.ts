import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

const schema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
},
    {
        timestamps: true
    }
)


const User = mongoose.model("User", schema)
