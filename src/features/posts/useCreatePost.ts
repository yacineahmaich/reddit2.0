import { firestore, storage } from "@/firebase/client";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/global";

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
      router.back();
    },
  });
}
