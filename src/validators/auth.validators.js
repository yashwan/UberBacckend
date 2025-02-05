const { z } = require("zod")

const authValidator = z.object({
    name: z.string().min(1, { message: "Name is required" }).toLowerCase(),
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Password must be greater than or equal to 6 characters" }),
    role: z.enum(["passenger", "driver"]).optional().default("passenger"),
    location: z.object({
        type: z.enum(["Point"]).default("Point").optional(),
        coordinates: z.tuple([z.number(), z.number()]).default([17.22, 78.33])
    })
})

module.exports = {
    authValidator
}