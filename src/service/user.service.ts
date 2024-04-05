
import User, { UserInput } from "../models/user.model"
import { omit } from "lodash"

export async function createUser(data: UserInput) {
    const user = await User.create(data)
    return omit(user.toJSON(), "password")
}


export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found")
    }

    const isValid = await user.comparePasswords(password)

    if (!isValid) {
        throw new Error("Invalid password")
    }

    return user

}