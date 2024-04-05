import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface UserInput {
    email: string
    name: string
    password: string
}
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date
    updatedAt: Date
    comparePasswords: (password: string) => boolean
}

const schema = new mongoose.Schema<UserDocument>({
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

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
        delete ret.password
    }
});

schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    return next()
})

schema.methods.comparePasswords = async function (password: string) {
    try {
        await bcrypt.compare(password, this.password)
        return true
    } catch (error) {
        return false
    }
}

const User = mongoose.model<UserDocument>("User", schema)

export default User