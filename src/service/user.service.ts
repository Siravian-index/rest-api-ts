
import { FilterQuery } from "mongoose"
import User, { UserDocument, UserInput } from "../models/user.model"
import { InvalidLogicError, ResourceNotFound, InvalidSchemaError, InternalServerError, GenericError } from "../errors"
import { GoogleTokenResponse, googleTokenResponseSchema } from "../schema/googleToken.schema"
import config from "config"
import axios, { AxiosError } from "axios"
import logger from "../utils/logger"
import qs from "qs"
import { ZodError } from "zod"

export async function createUser(data: UserInput) {
    const found = await User.findOne({ email: data.email })
    if (found) {
        throw new InvalidLogicError(`User ${data.email} already exist`)
    }
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

export async function getGoogleOAuthTokens(code: string): Promise<GoogleTokenResponse> {
    const url = "https://oauth2.googleapis.com/token"
    const values = {
        code,
        client_id: config.get("googleClientId"),
        client_secret: config.get("googleClientSecret"),
        redirect_uri: config.get("googleOauthRedirect"),
        grant_type: "authorization_code",
    }

    const payload = qs.stringify(values)

    try {
        const res = await axios.post<GoogleTokenResponse>(url, payload, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        const parsed = googleTokenResponseSchema.parse(res.data)
        return parsed
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InvalidSchemaError()
        }
        if (error instanceof AxiosError) {
            const err = error.response?.data.error
            console.log(err)
            throw new GenericError({ code: err.status, message: err.message, status: err.code })
        }
        logger.error(error)
        throw new InternalServerError()
    }
}