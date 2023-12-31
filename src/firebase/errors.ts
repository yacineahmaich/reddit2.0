export const FIREBASE_ERRORS: { [key: string]: string } = {
  "Firebase: Error (auth/email-already-in-use).":
    "A user with that email already exists",

  "Firebase: Error (auth/user-not-found).": "Invalid email or password",
  "Firebase: Error (auth/wrong-password).": "Invalid email or password",
  "FirebaseError: Firebase: Error (auth/user-not-found).": "Provided email doesn't exist"
};

export const getFirebaseError = (firebaseErrorMessage: string) =>
  FIREBASE_ERRORS[firebaseErrorMessage] ?? "Something went wrong ! try again";
