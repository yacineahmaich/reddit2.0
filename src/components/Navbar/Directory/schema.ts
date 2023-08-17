import * as Z from "zod";

export const createCommunitySchema = Z.object({
  name: Z.string().min(3, "Community name should be at least 3 characters"),
}).superRefine(({ name }, ctx) => {
  const noSpecialCharsRegex = /^[a-zA-Z0-9]*$/;

  if (!noSpecialCharsRegex.test(name)) {
    ctx.addIssue({
      code: "custom",
      message:
        "Community names must be between 3-21 characters, and can only contain letters, numbers",
      path: ["name"],
    });
  }
});
