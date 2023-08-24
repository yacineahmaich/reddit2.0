import { firestore } from "@/firebase/client";
import { Community, CommunitySnippet } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, increment, runTransaction } from "firebase/firestore";

type Vars = {
  community: Community;
  userId: string;
};

const joinOrLeaveCommunity = async ({ community, userId }: Vars) => {
  await runTransaction(firestore, async (transaction) => {
    // get snippet
    const snippetDocRef = doc(
      firestore,
      `/users/${userId}/communitySnippets`,
      community.id
    );
    const snippetDoc = await transaction.get(snippetDocRef);

    // get Community
    const communityDocRef = doc(firestore, "communities", community.id);
    const communityDoc = await transaction.get(communityDocRef);
    const communityData = communityDoc.data() as Community;

    // user Already joined  the community
    if (snippetDoc.exists()) {
      // delete user snippet
      transaction.delete(snippetDocRef);
      // decrement community numMembers
      transaction.update(communityDocRef, {
        numMembers: increment(-1),
      });
    } else {
      // add user snippet
      transaction.set(snippetDocRef, {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      });
      // increment community numMembers
      transaction.update(communityDocRef, {
        numMembers: increment(1),
      });
    }
  });
};

export function useJoinLeaveCommunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinOrLeaveCommunity,
    onMutate({ userId, community }) {
      // 1)- Cancel queries
      queryClient.cancelQueries(["user", "directory"]);

      // current directory snapshot
      const previousDirectory = queryClient.getQueryData<CommunitySnippet[]>([
        "user",
        "directory",
      ]);

      const joinedCommunity = previousDirectory?.find(
        (s) => s.communityId === community.id
      );

      if (joinedCommunity) {
        // Optimisticly update user directory cache
        queryClient.setQueryData<CommunitySnippet[]>(
          ["user", "directory"],
          (snippets = []) =>
            snippets.filter((s) => s.communityId !== community.id)
        );
      } else {
        const optimisticSnippet: CommunitySnippet = {
          communityId: community.id,
          imageURL: community.imageURL,
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
      // Optimisticly update user directory cache
      queryClient.setQueryData<CommunitySnippet[]>(
        ["user", "directory"],
        ctx?.previousDirectory
      );
    },
    onSettled: () => queryClient.invalidateQueries(["user", "directory"]),
  });
}
