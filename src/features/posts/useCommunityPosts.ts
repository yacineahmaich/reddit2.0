import { Post } from "./types";
import { firestore } from "@/firebase/client";
import { useQuery } from "@tanstack/react-query";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";

const getCommunityPosts = async (id: string): Promise<Post[]> => {
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
};

export const useCommunityPosts = () => {
  const router = useRouter();
  const communityId = router.query.id as string;

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["community", communityId, "posts"],
    queryFn: () => getCommunityPosts(communityId),
    enabled: !!communityId,
  });

  return {
    posts,
    isLoading,
    isError,
  };
};
