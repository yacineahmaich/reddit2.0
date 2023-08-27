import { firestore, storage } from "@/firebase/client";
import { Post } from "@/types/database";
import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";

type Vars = {
  post: Post;
};

const deletePost = async ({ post }: Vars) => {
  const postDocRef = doc(firestore, "posts", post.id!);

  // delete post image if exists
  if (post.imageURL) {
    const postImageRef = ref(storage, `/posts/${postDocRef.id}/image`);

    await deleteObject(postImageRef);
  }
  await deleteDoc(postDocRef);
};

export function useDeletePost() {
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, { post }) => router.push(`/r/${post.communityId}`),
  });
}
