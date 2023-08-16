import { Timestamp } from "firebase/firestore";

export function parseFirebaseTimestamp(timestamp: Timestamp) {
  return new Date(timestamp.toDate());
}

export function parseObj<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
