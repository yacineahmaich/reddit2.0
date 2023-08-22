import { auth, firestore } from "@/firebase/client";
import { getDocs, collection } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { CommunitySnippet } from "@/types/global";

async function getUserDirectory(userId: string): Promise<CommunitySnippet[]> {
  const snippetDocs = await getDocs(
    collection(firestore, `users/${userId}/communitySnippets`)
  );

  const snippets = snippetDocs.docs.map(
    (doc) => ({ ...doc.data() } as CommunitySnippet)
  );

  return snippets;
}

export function useDirectory() {
  const [user] = useAuthState(auth);

  return useQuery({
    queryKey: ["user", "directory"],
    queryFn: () => getUserDirectory(user?.uid!),
    enabled: !!user,
  });
}
