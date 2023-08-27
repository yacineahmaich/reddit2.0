import { auth } from "@/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";

const resetPassword = async ({ email }: { email: string }) => {
  await sendPasswordResetEmail(auth, email);
};

export const useResetPassword = () =>
  useMutation({
    mutationFn: resetPassword,
  });
