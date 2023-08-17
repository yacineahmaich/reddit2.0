import { auth, firestore } from "@/firebase/client";
import { getDocs, collection } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";

type Data = {
  postId: string;
  vote: number;
};

async function getUserPostVotes(userId: string): Promise<Data[]> {
  const snippetDocs = await getDocs(
    collection(firestore, `users/${userId}/votes`)
  );

  const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() } as Data));

  return snippets;
}

export function useUserVotes() {
  const [user] = useAuthState(auth);

  return useQuery({
    queryKey: ["user", "votes"],
    queryFn: () => getUserPostVotes(user?.uid!),
    enabled: !!user,
  });
}
