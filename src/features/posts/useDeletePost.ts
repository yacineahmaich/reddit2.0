import { firestore, storage } from "@/firebase/client";
import { Post } from "@/types/global";
import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

type Vars = {
  post: Post;
};

const deletePost = async ({ post }: Vars) => {
  try {
    const postDocRef = doc(firestore, "posts", post.id!);

    // delete post image if exists
    if (post.imageURL) {
      const postImageRef = ref(storage, `/posts/${postDocRef.id}/image`);

      await deleteObject(postImageRef);
    }
    await deleteDoc(postDocRef);
  } catch (error) {
    throw error;
  }
};

export function useDeletePost() {

  return useMutation({
    mutationFn: deletePost,
  });
}
