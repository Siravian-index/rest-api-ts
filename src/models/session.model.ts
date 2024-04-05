import mongoose from "mongoose"
import { UserDocument } from "./user.model"

export interface SessionInput extends mongoose.Document {
    user: UserDocument["_id"]
    valid: boolean
    userAgent: string
}

const schema = new mongoose.Schema<SessionInput>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    valid: {
        type: Boolean,
        default: true,
    },
    userAgent: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
)

const Session = mongoose.model("Session", schema)

export default Session