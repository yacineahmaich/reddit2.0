import { firestore } from "@/firebase/client";
import { parseObj } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { Community } from "./types";

async function getCommunity(id: string): Promise<Community> {
  const communityDocRef = doc(firestore, "communities", id);

  const communityDoc = await getDoc(communityDocRef);
  const community = {
    id: communityDoc.id,
    ...communityDoc.data(),
  };

  return communityDoc.exists() ? parseObj(community) : null;
}

export function useCommunity(id: string) {
  const {
    data: community,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["community", id],
    queryFn: () => getCommunity(id),
    enabled: !!id,
  });

  return { community, isLoading, isError };
}
