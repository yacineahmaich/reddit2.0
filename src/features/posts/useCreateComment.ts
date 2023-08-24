import { firestore } from "@/firebase/client";
import { Comment, Post } from "@/types/database";
import { getUserNameFromUserObj } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

interface Vars {
  postId: string;
  user?: User | null;
  body: string;
}

const commentOnPost = async ({ user, postId, body }: Vars) => {
  if (!user) throw new Error("Invalid user");
  const batch = writeBatch(firestore);

  // 1)- Save comment document
  batch.set(doc(collection(firestore, "comments")), {
    postId,
    author: {
      id: user.uid,
      name: getUserNameFromUserObj(user),
      profile: user.photoURL || "",
    },
    body,
    createdAt: serverTimestamp() as Timestamp,
  } as Comment);

  // 2)- update post numOfComments
  batch.update(doc(firestore, "posts", postId), {
    numOfComments: increment(1),
  });

  await batch.commit();
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentOnPost,
    async onMutate({ postId, user, body }) {
      // 1)- Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["posts", postId, "comments"],
      });

      // Snapshot the previous comments
      const previousComments =
        queryClient.getQueryData<Post[]>(["posts", postId, "comments"]) ?? [];

      const optimisticComment: Comment = {
        id: Date.now().toString(),
        body,
        postId,
        author: {
          id: user?.uid!,
          name: getUserNameFromUserObj(user!),
          profile: user?.photoURL || "",
        },
        isPending: true,
      };

      // Optimistically update to the post comments cache
      queryClient.setQueryData(
        ["posts", postId, "comments"],
        [optimisticComment, ...previousComments]
      );

      // Return a context object with the previous comments
      // to handle error case
      return { previousComments };
    },
    onError(error, { postId }, context) {
      // In case of error reset the cache
      queryClient.setQueryData(
        ["posts", postId, "comments"],
        context?.previousComments
      );
    },
    onSuccess(_, { postId }) {
      queryClient.invalidateQueries(["posts", postId, "comments"]);
      queryClient.invalidateQueries(["posts", postId]);
    },
  });
};
