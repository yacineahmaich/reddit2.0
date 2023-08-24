import { firestore } from "@/firebase/client";
import { Community, CommunitySnippet } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, increment, runTransaction } from "firebase/firestore";

type Vars = {
  communityId: string;
  userId: string;
  communitySnippets: CommunitySnippet[];
};

const joinOrLeaveCommunity = async ({ communityId, userId }: Vars) => {
  await runTransaction(firestore, async (transaction) => {
    // get snippet
    const snippetDocRef = doc(
      firestore,
      `/users/${userId}/communitySnippets`,
      communityId
    );
    const snippetDoc = await transaction.get(snippetDocRef);

    // get Community
    const communityDocRef = doc(firestore, "communities", communityId);
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
    onSuccess: () => queryClient.invalidateQueries(["user", "directory"]),
  });
}
