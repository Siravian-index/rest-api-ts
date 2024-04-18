

import z from "zod"

export const jwtSchema = z.object({
    user: z.object({
        id: z.string({
            required_error: "id is required"
        }),
        name: z.string({
            required_error: "name is required"
        }),
        createdAt: z.string({
            required_error: "createdAt is required"
        }),
        updatedAt: z.string({
            required_error: "updatedAt is required"
        }),
        email: z.string({
            required_error: "email is required"
        }).email("A valid email address is required"),
        session: z.string({
            required_error: "session is required"
        }),
        iat: z.number({
            required_error: "iat is required"
        }),
        exp: z.number({
            required_error: "exp is required"
        }),
    }),

})

export type JwtPayload = z.TypeOf<typeof jwtSchema>
