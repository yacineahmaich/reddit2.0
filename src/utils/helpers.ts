import { Timestamp } from "firebase/firestore";

export function parseFirebaseTimestamp(timestamp: Timestamp) {
  return new Date(timestamp.toDate());
}

export function parseObj(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
