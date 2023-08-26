import { auth } from "@/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

type Vars = {
  email: string;
  password: string;
};

const login = async ({ email, password }: Vars) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
