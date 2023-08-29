import { auth, firestore } from "@/firebase/client";
import { transformUser } from "@/firebase/helpers";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type Vars = {
  email: string;
  password: string;
};

const signup = async ({ email, password }: Vars) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  const displayName = `u_${userCred.user.email?.split("@")[0]}`;
  await updateProfile(userCred.user, {
    displayName,
  });

  // save created user in users collection
  const user = transformUser(userCred.user);
  const userDocRef = doc(firestore, "users", user.uid);

  await setDoc(userDocRef, user);
};

export const useSignin = () =>
  useMutation({
    mutationFn: signup,
  });
