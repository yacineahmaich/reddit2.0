import { firestore } from "@/firebase/client";
import { Post } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export const getPost = async (postId: string): Promise<Post> => {
  const postDoc = await getDoc(doc(firestore, "posts", postId));

  if (!postDoc.exists()) {
    throw new Error("Post not found");
  }

  const post = {
    id: postDoc.id,
    ...postDoc.data(),
  } as Post;

  return post;
};

export const usePost = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const communityId = router.query.communityId as string;

  return useQuery({
    queryKey: ["community", communityId, "posts", postId],
    queryFn: () => getPost(postId),
  });
};
