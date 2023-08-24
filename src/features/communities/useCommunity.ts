import { firestore } from "@/firebase/client";
import useQueryParam from "@/hooks/useQueryParam";
import { Community } from "@/types/database";
import { parseObj } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

async function getCommunity(id: string): Promise<Community | null> {
  const communityDocRef = doc(firestore, "communities", id);

  const communityDoc = await getDoc(communityDocRef);
  const community = {
    id: communityDoc.id,
    ...communityDoc.data(),
  } as Community;

  return communityDoc.exists() ? parseObj<Community>(community) : null;
}

export function useCommunity() {
  const communityId = useQueryParam("communityId")

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["community", communityId],
    queryFn: () => getCommunity(communityId),
    enabled: !!communityId,
  });

  return {
    community: data!,
    isLoading,
    isError,
    refetch,
  };
}
