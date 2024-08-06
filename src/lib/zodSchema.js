import { z } from "zod";

export const schemaRegister = z
  .object({
    username: z.string().trim().min(3).max(20, {
      message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().trim().min(4).max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
    confirm: z.string().trim().min(4).max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({ message: "Please enter a valid email" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirm;
    },
    {
      message: "Passwords don't match",
      path: ["confirm"],
    }
  );

export const schemaSignin = z.object({
  password: z.string().trim().min(1, { message: "Required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
});
