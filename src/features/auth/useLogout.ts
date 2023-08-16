import { auth } from "@/firebase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const logout = async () => {
  await signOut(auth);
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess() {
      queryClient.removeQueries();
      router.push("/");
    },
  });
};
