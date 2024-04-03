
import { } from "mongoose"
import User, { UserInput } from "../models/user.model"

export async function createUser(data: UserInput) {
    return User.create(data)
}