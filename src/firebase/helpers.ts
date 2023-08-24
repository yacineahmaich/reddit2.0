import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export function transformUser(user: User) {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    providerData: user.providerData,
  };
}

export function getUserNameFromUserObj(user: User) {
  return user.displayName || user.email?.split("@")[0] || "Anonymos";
}

export function parseFirebaseTimestamp(timestamp: Timestamp) {
  return new Date(timestamp.toDate());
}
