import * as Z from "zod";

export const postSchema = Z.object({
  title: Z.string().min(1, "Invalid title"),
  body: Z.string().optional(),
  // image: Z.string().optional(),
})