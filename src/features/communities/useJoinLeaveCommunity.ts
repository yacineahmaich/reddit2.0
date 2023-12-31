import { firestore } from "@/firebase/client";
import { CommunitySnippet } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { doc, increment, runTransaction } from "firebase/firestore";

type Vars = {
  communityId: string;
  user: User;
};

const joinOrLeaveCommunity = async ({ communityId, user }: Vars) => {
  await runTransaction(firestore, async (transaction) => {
    // get snippet
    const snippetDocRef = doc(
      firestore,
      `/users/${user.displayName}/communitySnippets`,
      communityId
    );
    const snippetDoc = await transaction.get(snippetDocRef);

    const snippet = snippetDoc.data() as CommunitySnippet;

    if (snippet?.isModerator)
      throw new Error("Moderator cannot join or leave their ommunity");

    // get Community
    const communityDocRef = doc(firestore, "communities", communityId);

    // user Already joined  the community
    if (snippetDoc.exists()) {
      // delete user snippet
      transaction.delete(snippetDocRef);
      // decrement community numOfMembers
      transaction.update(communityDocRef, {
        numOfMembers: increment(-1),
      });
    } else {
      // add user snippet
      transaction.set(snippetDocRef, {
        communityId: communityId,
      });
      // increment community numOfMembers
      transaction.update(communityDocRef, {
        numOfMembers: increment(1),
      });
    }
  });
};

export function useJoinLeaveCommunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinOrLeaveCommunity,
    onMutate({ communityId }) {
      // 1)- Cancel queries
      // queryClient.cancelQueries({
      //   queryKey: ["user", "directory"],
      // });

      // current directory snapshot
      const previousDirectory = queryClient.getQueryData<CommunitySnippet[]>([
        "user",
        "directory",
      ]);

      const joinedCommunity = previousDirectory?.find(
        (s) => s.communityId === communityId
      );

      if (joinedCommunity) {
        // Optimisticly update user directory cache
        queryClient.setQueryData<CommunitySnippet[]>(
          ["user", "directory"],
          (snippets = []) =>
            snippets.filter((s) => s.communityId !== communityId)
        );
      } else {
        const optimisticSnippet: CommunitySnippet = {
          communityId: communityId,
        };
        // Optimisticly update user directory cache
        queryClient.setQueryData<CommunitySnippet[]>(
          ["user", "directory"],
          (snippets = []) => [optimisticSnippet, ...snippets]
        );
      }

      return { previousDirectory };
    },
    onError(_err, _vars, ctx) {
      queryClient.setQueryData<CommunitySnippet[]>(
        ["user", "directory"],
        ctx?.previousDirectory
      );
    },
    // onSuccess: () => queryClient.invalidateQueries(["user", "directory"]),
  });
}
