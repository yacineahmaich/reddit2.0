import { auth, firestore } from "@/firebase/client";
import { SavedPost } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export async function getSaved(user: User): Promise<SavedPost[]> {
  const snippetDocs = await getDocs(
    collection(firestore, `users/${user.displayName}/saved`)
  );

  const snippets = snippetDocs.docs.map(
    (doc) => ({ ...doc.data() } as SavedPost)
  );

  return snippets;
}

export function useSaved() {
  const [user] = useAuthState(auth);

  return useQuery({
    queryKey: ["user", "saved"],
    queryFn: () => getSaved(user!),
    enabled: !!user,
  });
}
