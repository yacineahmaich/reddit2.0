import { auth, firestore } from "@/firebase/client";
import { getDocs, collection } from "firebase/firestore";
import { CommunitySnippet } from "./types";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";

async function getUserCommunitySnippets(
  userId: string
): Promise<CommunitySnippet[]> {
  const snippetDocs = await getDocs(
    collection(firestore, `users/${userId}/communitySnippets`)
  );

  const snippets = snippetDocs.docs.map(
    (doc) => ({ ...doc.data() } as CommunitySnippet)
  );

  return snippets;
}

export function useUserSnippets() {
  const [user] = useAuthState(auth);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", "snippets"],
    queryFn: () => getUserCommunitySnippets(user?.uid!),
    enabled: !!user,
  });

  return {
    communitySnippets: data!,
    isLoading,
    isError,
  };
}
