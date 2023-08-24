import { firestore } from "@/firebase/client";
import { Post } from "@/types/database";
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

export const usePost = (id?: string) => {
  const router = useRouter();
  const postId = id || (router.query.postId as string);

  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId!),
    enabled: !!postId,
  });
};
