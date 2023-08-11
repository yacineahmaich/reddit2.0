import { User } from "firebase/auth";

export function transformUser(user: User) {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    providerData: user.providerData,
  };
}
