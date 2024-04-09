import mongoose from "mongoose"
import { UserDocument } from "./user.model"

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"]
    valid: boolean
    userAgent: string
}

const schema = new mongoose.Schema<SessionDocument>({
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

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

const Session = mongoose.model("Session", schema)

export default Session