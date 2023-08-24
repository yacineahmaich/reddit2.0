import { firestore } from "@/firebase/client";
import { Post } from "@/types/database";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";

const getCommunityPosts = async (id: string) => {
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
  const queryClient = useQueryClient();

  const communityId = router.query.communityId as string;

  return useQuery({
    queryKey: ["community", communityId, "posts"],
    queryFn: () => getCommunityPosts(communityId),
    onSuccess: (posts) => {
      // add post to single single doc cache
      posts.forEach((post) =>
        queryClient.setQueryData(["posts", post.id], post)
      );
    },
    enabled: !!communityId,
  });
};
