import { firestore, storage } from "@/firebase/client";
import { Post } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";

type Vars = {
  post: Post;
  image?: string;
};

export async function createCommunityPost({ post, image }: Vars) {
  const postsRef = collection(firestore, "posts");
  const postRef = doc(postsRef);
  await setDoc(postRef, {
    id: postRef.id,
    ...post,
  });

  if (image) {
    const imageRef = ref(storage, `/posts/${postRef.id}`);
    await uploadString(imageRef, image, "data_url");

    const imageDownloadURL = await getDownloadURL(imageRef);

    await updateDoc(postRef, {
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
