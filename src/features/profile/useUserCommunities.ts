import { firestore } from "@/firebase/client";
import { Community, CommunitySnippet } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const getUserCommunities = async (displayName: string) => {
  const userCommunitySnippetsDocs = await getDocs(
    query(collection(firestore, `users/${displayName}/communitySnippets`))
  );
  const userSnippets = userCommunitySnippetsDocs.docs.map(
    (doc) => doc.data() as CommunitySnippet
  );

  const communityIds = userSnippets.map((snippet) => snippet.communityId);

  console.log(communityIds);

  const communityDocs = await getDocs(
    query(
      collection(firestore, "communities"),
      where("id", "in", communityIds),
      orderBy("numOfMembers", "desc"),
      // limit(10)
    )
  );

  console.log(communityDocs);
  const communities = communityDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Community)
  );

  return communities;
};

export const useUserCommunities = (displayName: string) =>
  useQuery({
    queryKey: ["user-communities", displayName],
    queryFn: () => getUserCommunities(displayName),
  });
