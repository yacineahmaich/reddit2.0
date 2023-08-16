import * as Z from "zod";

export const loginSchema = Z.object({
  email: Z.string().email(),
  password: Z.string().min(1, "Invalid password"),
});

export const signupSchema = Z.object({
  email: Z.string().email(),
  password: Z.string().min(6, "password shoud be at least 6 chars"),
  confirmPassword: Z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});
