
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose"
import User, { UserDocument, UserInput } from "../models/user.model"
import { InvalidLogicError, ResourceNotFound, InvalidSchemaError, InternalServerError, GenericError } from "../errors"
import { GoogleTokenResponse, googleTokenResponseSchema, googleUserSchema } from "../schema/googleToken.schema"
import config from "config"
import axios from "axios"
import qs from "qs"

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

export async function upsertUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {}) {
    const user = await User.findOneAndUpdate(query, update, options)
    if (!user) {
        throw new ResourceNotFound(`User was not found`)
    }
    return user
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

    const res = await axios.post<GoogleTokenResponse>(url, payload, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    const parsed = googleTokenResponseSchema.parse(res.data)
    return parsed

}

export async function getGoogleUser(idToken: string, accessToken: string) {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
    const parsed = googleUserSchema.parse(res.data)
    return parsed
}