import { Post } from "./types";
import { firestore } from "@/firebase/client";
import { useQuery } from "@tanstack/react-query";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";

export async function getCommunityPosts(id: string): Promise<Post[]> {
  const postsQuery = query(
    collection(firestore, "posts"),
    where("communityId", "==", id),
    orderBy("createdAt", "desc")
  );

  const postDocs = await getDocs(postsQuery);

  const posts = postDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post)
  );

  return posts;
}

export function useCommunityPosts(id: string) {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["community", id, "posts"],
    queryFn: () => getCommunityPosts(id),
    enabled: !!id,
  });

  return {
    posts,
    isLoading,
    isError,
  };
}
