
import { FilterQuery } from "mongoose"
import User, { UserDocument, UserInput } from "../models/user.model"

export async function createUser(data: UserInput) {
    const user = await User.create(data)
    return user.toJSON()
}


export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await User.findOne({ email })
    if (!user) {
        return false
    }

    const isValid = await user.comparePasswords(password)
    if (!isValid) {
        return false
    }

    return user.toJSON()
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query)
}