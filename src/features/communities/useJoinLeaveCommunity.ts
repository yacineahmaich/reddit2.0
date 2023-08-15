import { firestore } from "@/firebase/client";
import { writeBatch, doc, increment } from "firebase/firestore";
import { Community } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommunitySnippet } from "../user/types";

// Join Community
async function joinCommunuity(community: Community, userId: string) {
  const batch = writeBatch(firestore);

  const newSnippet = {
    communityId: community.id,
    imageURL: community.imageURL || "",
  };
  // update user communitySnippets
  batch.set(
    doc(firestore, `users/${userId}/communitySnippets`, community.id),
    newSnippet
  );
  // update community number of members
  batch.update(doc(firestore, "communities", community.id), {
    numMembers: increment(1),
  });

  await batch.commit();
}

// Leave Community
async function leaveCommunity(community: Community, userId: string) {
  const batch = writeBatch(firestore);

  // update community number of members
  batch.update(doc(firestore, "communities", community.id), {
    numMembers: increment(-1),
  });
  // delete user communitySnippets
  batch.delete(
    doc(firestore, `users/${userId}/communitySnippets`, community.id)
  );
  await batch.commit();
}

type Vars = {
  community: Community;
  userId: string;
  communitySnippets: CommunitySnippet[];
};

// Join Leave Community

async function joinOrLeaveCommunity({
  community,
  userId,
  communitySnippets,
}: Vars) {
  const isJoined = Boolean(
    communitySnippets.find((c) => c.communityId === community.id)
  );

  if (isJoined) {
    await leaveCommunity(community, userId);
  } else {
    await joinCommunuity(community, userId);
  }
}

export function useJoinLeaveCommunity() {
  const queryClient = useQueryClient();

  const { mutate: joinLeaveCommunity, isLoading } = useMutation({
    mutationFn: joinOrLeaveCommunity,
    onSuccess: (_, { userId }) =>
      queryClient.invalidateQueries(["user", userId, "snippets"]),
  });

  return {
    joinLeaveCommunity,
    isLoading,
  };
}
