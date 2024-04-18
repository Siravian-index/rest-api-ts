
import { FilterQuery } from "mongoose"
import User, { UserDocument, UserInput } from "../models/user.model"
import { InvalidLogicError, ResourceNotFound } from "../errors"

export async function createUser(data: UserInput) {
    const user = await User.create(data)
    return user.toJSON()
}


export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await User.findOne({ email })
    if (!user) {
        throw new ResourceNotFound(`User ${email} was not found`)
    }

    const isValid = await user.comparePasswords(password)
    if (!isValid) {
        throw new InvalidLogicError("User passwords do not match")
    }

    return user.toJSON()
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query)
}