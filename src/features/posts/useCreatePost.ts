import { firestore, storage } from "@/firebase/client";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { Post } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Vars = {
  post: Post;
  image?: string;
};

export async function createCommunityPost({ post, image }: Vars) {
  const postDocRef = await addDoc(collection(firestore, "posts"), post);

  if (image) {
    const imageRef = ref(storage, `/posts/${postDocRef.id}/image`);
    await uploadString(imageRef, image, "data_url");

    const imageDownloadURL = await getDownloadURL(imageRef);

    await updateDoc(postDocRef, {
      imageURL: imageDownloadURL,
    });
  }
}

export function useCreatePost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: createCommunityPost,
    onSuccess: (_, { post }) => {
      queryClient.invalidateQueries(["community", post.id, "posts"]);
      router.back();
    },
  });

  return { createPost, isLoading, isError };
}
