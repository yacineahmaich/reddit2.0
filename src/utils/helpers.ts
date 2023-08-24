import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export function getUserNameFromUserObj(user: User) {
  return user.displayName || user.email?.split("@")[0] || "Anonymos";
}

export function parseFirebaseTimestamp(timestamp: Timestamp) {
  return new Date(timestamp.toDate());
}

export function parseObj<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
