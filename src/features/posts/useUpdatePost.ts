import { firestore, storage } from "@/firebase/client";
import { Post } from "@/types/global";
import { useMutation } from "@tanstack/react-query";
import { doc, writeBatch } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useRouter } from "next/router";
import { useResetRecoilState } from "recoil";

type Vars = {
  post: Post;
  title: string;
  body: string;
  image?: string;
};

const updatePost = async ({ post, title, body, image }: Vars) => {
  try {
    const batch = writeBatch(firestore);

    const postDocRef = doc(firestore, "posts", post.id!);

    // update post data
    batch.update(postDocRef, {
      title,
      body,
    });

    if (image) {
      console.log("image", image);
      // delete old image
      const imageRef = ref(storage, `/posts/${post.id!}/image`);

      if (post.imageURL) {
        // const imageURL = await getDownloadURL(imageRef);
        // create new image
        await deleteObject(imageRef);
      }

      await uploadString(imageRef, image, "data_url");

      const imageDownloadURL = await getDownloadURL(imageRef);

      batch.update(postDocRef, {
        imageURL: imageDownloadURL,
      });
    }

    await batch.commit();
  } catch (error) {
    throw error;
  }
};

export function useUpdatePost() {
  const router = useRouter();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (_, { post }) => {
      router.push(`/r/${post.communityId}/${post.id}`);
    },
  });
}
