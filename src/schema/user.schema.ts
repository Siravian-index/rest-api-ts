import z from "zod"

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }).min(2, "Name must be at least 2 characters long"),
        email: z.string({
            required_error: "Email is required"
        }).email("A valid email address is required"),
        password: z.string({
            required_error: "Password is required"
        }).min(6, "Password must be at least 6 characters long"),
        passwordConfirmation: z.string({
            required_error: "PasswordConfirmation is required"
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
})

export type CreateUserInput = z.TypeOf<typeof createUserSchema>


// TODO: create jwt token user schema