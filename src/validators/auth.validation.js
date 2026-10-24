// // validation schemas for authentication

// const { z } = require("zod");

// const registerSchema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   password: z.string().min(6),
//   adminKey: z.string().optional(), // Optional admin registration key
// });

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// module.exports = { registerSchema, loginSchema };
const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),

  role: z
    .enum(["student", "instructor", "admin"])
    .optional()
    .default("student"),

  adminKey: z.string().optional(),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

module.exports = { registerSchema, loginSchema };
