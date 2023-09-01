import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export function transformUser(user: User) {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    providerData: user.providerData,
    photoURL: user.photoURL,
  };
}

export function getUserNameFromUserObj(user: User) {
  return user.displayName || user.email?.split("@")[0] || "Anonymos";
}

export function getStorageDownloadUrl(path: string) {
  const encodedPath = encodeURIComponent(path);
  return `https://firebasestorage.googleapis.com/v0/b/hobbit-96304.appspot.com/o/${encodedPath}?alt=media`;
}

export function parseFirebaseTimestamp(timestamp: Timestamp) {
  return new Date(timestamp.toDate());
}
