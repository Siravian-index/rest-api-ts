
import z from "zod"


export const googleOAuthSchema = z.object({
  query: z.object({
    code: z.string()
  })
})


// response from googleapis
export const googleTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
  id_token: z.string(),
})


// response from googleapis userinfo
export const googleUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  verified_email: z.boolean(),
  name: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string(),
  locale: z.string(),
})




export type GoogleOAuth = z.TypeOf<typeof googleOAuthSchema>
export type GoogleTokenResponse = z.TypeOf<typeof googleTokenResponseSchema>
export type GoogleUserSchema = z.TypeOf<typeof googleUserSchema>

