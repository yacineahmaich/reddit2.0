import { auth, firestore } from "@/firebase/client";
import { getDocs, collection } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { CommunitySnippet } from "@/types/database";
import { User } from "firebase/auth";

export async function getUserDirectory(
  user: User
): Promise<CommunitySnippet[]> {
  const snippetDocs = await getDocs(
    collection(firestore, `users/${user.displayName}/communitySnippets`)
  );

  const snippets = snippetDocs.docs.map(
    (doc) => ({ ...doc.data() } as CommunitySnippet)
  );

  return snippets;
}

export function useDirectory(user?: User) {
  return useQuery({
    queryKey: ["user", "directory"],
    queryFn: () => getUserDirectory(user!),
    enabled: !!user,
  });
}
