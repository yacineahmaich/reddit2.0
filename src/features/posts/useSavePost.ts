import { firestore } from "@/firebase/client";
import { SavedPost } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

type Vars = {
  displayName: string;
  postId: string;
};

const savePost = async ({ displayName, postId }: Vars) => {
  const savedDocRef = doc(firestore, `users/${displayName}/saved`, postId);

  const savedDoc = await getDoc(savedDocRef);

  if (savedDoc.exists()) {
    await deleteDoc(savedDocRef);
  } else {
    await setDoc(savedDocRef, {
      postId,
      savedAt: serverTimestamp(),
    });
  }
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savePost,
    onMutate({ postId }) {
      const previousSavedPosts = queryClient.getQueryData<SavedPost[]>([
        "user",
        "saved",
      ]);

      const savedPost = previousSavedPosts?.find((s) => s.postId === postId);

      if (savedPost) {
        queryClient // ;
          .setQueryData<SavedPost[]>(["user", "saved"], (prev) => {
            if (prev && prev.length > 0) {
              return prev.filter((s) => s.postId !== postId);
            }

            return prev;
          });
      } else {
        queryClient // ;
          .setQueryData<SavedPost[]>(["user", "saved"], (prev = []) => [
            ...prev,
            {
              postId,
            },
          ]);
      }

      return {
        previousSavedPosts,
      };
    },
    onError(_err, _vars, ctx) {
      queryClient.setQueriesData(["user", "saved"], ctx?.previousSavedPosts);
    },
  });
};
