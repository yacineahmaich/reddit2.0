import { firestore, storage } from "@/firebase/client";
import { Post } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";

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

  return useMutation({
    mutationFn: createCommunityPost,
    onSuccess: (_, { post }) => {
      queryClient.invalidateQueries(["community", post.id, "posts"]);
      router.push(`/r/${post.communityId}`);
    },
  });
}
